import type { AvailableSatsBuyTransaction } from '$lib/model/available-sats-buy-transaction';
import type { SatsBuyTransaction } from '$lib/model/sats-buy-transaction';

export interface SatsBuyRepository {
	addSatsBuy(transaction: SatsBuyTransaction): Promise<void>;
	getListofSatsBuys(): Promise<SatsBuyTransaction[]>;
	getNotFullyAllocatedBuys(): Promise<AvailableSatsBuyTransaction[]>;
}
