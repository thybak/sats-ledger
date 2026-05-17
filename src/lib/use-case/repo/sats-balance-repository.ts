import type { SatsBalance } from '$lib/model/sats-balance';

export interface SatsBalanceRepository {
	getBalance(): Promise<SatsBalance>;
}
