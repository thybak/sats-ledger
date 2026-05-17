import type { SatsBalance } from '$lib/model/sats-balance';
import type { SatsBalanceRepository } from './repo/sats-balance-repository';

export class GetSatsBalance {
	constructor(private satsBalanceRepository: SatsBalanceRepository) {}

	async execute(): Promise<SatsBalance> {
		return this.satsBalanceRepository.getBalance();
	}
}
