import type { AvailableSatsBuyTransaction } from '$lib/model/available-sats-buy-transaction';
import type { SatsBuyTransaction } from '$lib/model/sats-buy-transaction';
import type { SatsBuyRepository } from '$lib/use-case/repo/sats-buy-repository';
import { SatsBuy } from './database/entities/sats-buy';

export class SatsBuyAdapter implements SatsBuyRepository {
	private satsBuyEntity = new SatsBuy();

	async addSatsBuy(transaction: SatsBuyTransaction): Promise<void> {
		await this.satsBuyEntity.insert(transaction);
	}

	async getListofSatsBuys(): Promise<SatsBuyTransaction[]> {
		return this.satsBuyEntity.getAll();
	}

	async getNotFullyAllocatedBuys(): Promise<AvailableSatsBuyTransaction[]> {
		return this.satsBuyEntity.getNotFullyAllocatedBuys();
	}
}
