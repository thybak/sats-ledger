import type { SatsBalance as SatsBalanceModel } from '$lib/model/sats-balance';
import { DatabaseConnection } from '../database-connection';

export class SatsBalance {
	private db = DatabaseConnection.getInstance();

	private balanceStmt = this.db.prepare(`
		SELECT
			(SELECT COALESCE(SUM(sats), 0) FROM sats_buy_transactions) as total_bought,
			(SELECT COALESCE(SUM(sats), 0) FROM sats_sell_transactions) as total_sold
	`);

	async getBalance(): Promise<SatsBalanceModel> {
		try {
			const row = this.balanceStmt.get() as {
				total_bought: number | null;
				total_sold: number | null;
			};
			const totalBought = row.total_bought ?? 0;
			const totalSold = row.total_sold ?? 0;
			return {
				totalBought,
				totalSold,
				availableSats: totalBought - totalSold
			};
		} catch (error) {
			console.error('Error calculating sats balance:', error);
			throw error;
		}
	}
}
