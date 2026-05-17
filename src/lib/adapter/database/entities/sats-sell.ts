import type { SatsSellTransaction } from '$lib/model/sats-sell-transaction';
import { DatabaseConnection } from '../database-connection';

export class SatsSell {
	private db = DatabaseConnection.getInstance();

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
			console.error('Error inserting sell transaction:', error);
			throw error;
		}
	}

	async getAll(): Promise<SatsSellTransaction[]> {
		try {
			return this.selectAllStmt.all() as SatsSellTransaction[];
		} catch (error) {
			console.error('Error fetching all sats sell transactions:', error);
			throw error;
		}
	}
}
