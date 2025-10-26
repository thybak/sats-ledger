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
}