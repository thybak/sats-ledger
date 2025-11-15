import type { SatsBuyTransaction } from "$lib/model/sats-buy-transaction";
import { DatabaseConnection } from "../database-connection";

export class SatsBuy {
    private db = DatabaseConnection.getInstance();

    private insertStmt = this.db.prepare(`
        INSERT INTO sats_buy_transactions (id, sats, cost, currency, date, description)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    private getAllStmt = this.db.prepare(`
        SELECT id, sats, cost, currency, date, description
        FROM sats_buy_transactions
        ORDER BY date DESC
    `);

    private getNotFullyAllocatedBuysStmt = this.db.prepare(`
        SELECT 
            b.id as buyTransactionId,
            b.sats - COALESCE(SUM(a.sats), 0) as satsAvailable,
            b.sats,
            b.cost,
            b.currency
        FROM sats_buy_transactions b
        LEFT JOIN sats_sell_allocations a ON b.id = a.buy_transaction_id
        GROUP BY b.id, b.sats, b.cost, b.currency
        HAVING satsAvailable > 0
        ORDER BY b.date ASC
    `);

    async insert(transaction: SatsBuyTransaction): Promise<void> {
        try { 
            this.insertStmt.run(
                transaction.id,
                transaction.sats,
                transaction.cost,
                transaction.currency,
                transaction.date,
                transaction.description
            );
        } catch (error) {
            console.error("Error inserting sats buy transaction:", error);
            throw error;
        }
    }

    async getAll(): Promise<SatsBuyTransaction[]> {
        try {
            return this.getAllStmt.all() as SatsBuyTransaction[];
        } catch (error) {
            console.error("Error fetching all sats buy transactions:", error);
            throw error;
        }
    }

    async getNotFullyAllocatedBuys(): Promise<{ buyTransactionId: string; satsAvailable: number, cost: number, currency: string, sats: number }[]> {
        try {
            return this.getNotFullyAllocatedBuysStmt.all() as { buyTransactionId: string; satsAvailable: number, cost: number, currency: string, sats: number }[];
        } catch (error) {
            console.error("Error fetching not fully allocated buys:", error);
            throw error;
        }
    }
}