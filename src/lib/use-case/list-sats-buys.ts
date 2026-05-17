import type { SatsBuyTransaction } from '$lib/model/sats-buy-transaction';
import type { SatsBuyRepository } from './repo/sats-buy-repository';

export class ListSatsBuys {
	constructor(private satsBuyRepository: SatsBuyRepository) {}

	async execute(): Promise<SatsBuyTransaction[]> {
		return this.satsBuyRepository.getListofSatsBuys();
	}
}
