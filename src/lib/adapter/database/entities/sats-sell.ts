import type { SatsSellTransaction } from "$lib/model/sats-sell-transaction";
import { DatabaseConnection } from "../database-connection";

export class SatsSell {
    private db = DatabaseConnection.getInstance();

    private totalSatsBalance = this.db.prepare(`
        WITH totals AS (
            SELECT 
                COALESCE(SUM(sats), 0) as total_bought,
                0 as total_sold
            FROM sats_buy_transactions
            UNION ALL
            SELECT 
                0 as total_bought,
                COALESCE(SUM(sats), 0) as total_sold
            FROM sats_sell_transactions
        )
        SELECT 
            SUM(total_bought) - SUM(total_sold) as available_sats
        FROM totals
    `);

    private insertSellStmt = this.db.prepare(`
        INSERT INTO sats_sell_transactions (id, sats, revenue, currency, date, description)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    private insertSellAllocationStmt = this.db.prepare(`
        INSERT INTO sats_sell_allocations (id, sell_transaction_id, buy_transaction_id, sats)
        VALUES (?, ?, ?, ?)
    `);

    private selectAllStmt = this.db.prepare(`
        SELECT id, sats, revenue, currency, date, description
        FROM sats_sell_transactions
        ORDER BY date DESC
    `);

    async getTotalSatsBalance(): Promise<number> {
        try {
            const row = this.totalSatsBalance.get() as { available_sats: number | null };
            return row.available_sats ?? 0;
        } catch (error) {
            console.error("Error calculating total sats balance:", error);
            throw error;
        }
    }

    async insert(sell: SatsSellTransaction): Promise<void> {
        const insertSellTransaction = this.db.transaction(() => {
            this.insertSellStmt.run(
                sell.id,
                sell.sats,
                sell.revenue,
                sell.currency,
                sell.date,
                sell.description
            );
            for (const alloc of sell.allocations) {
                this.insertSellAllocationStmt.run(
                    alloc.id,
                    alloc.sellTransactionId,
                    alloc.buyTransactionId,
                    alloc.sats
                );
            }
        });

        try { 
            insertSellTransaction();
        } catch (error) {
            console.error("Error inserting sell transaction:", error);
            throw error;
        }
    }

    async getAll(): Promise<SatsSellTransaction[]> {
        try {
            return this.selectAllStmt.all() as SatsSellTransaction[];
        } catch (error) {
            console.error("Error fetching all sats sell transactions:", error);
            throw error;
        }
    }
}