import type { SatsBalance } from '$lib/model/sats-balance';
import type { SatsBalanceRepository } from '$lib/use-case/repo/sats-balance-repository';
import { SatsBalance as SatsBalanceEntity } from './database/entities/sats-balance';

export class SatsBalanceAdapter implements SatsBalanceRepository {
	private satsBalanceEntity = new SatsBalanceEntity();

	async getBalance(): Promise<SatsBalance> {
		return this.satsBalanceEntity.getBalance();
	}
}
