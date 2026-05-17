import type { SatsSellTransaction } from '$lib/model/sats-sell-transaction';

export interface SatsSellRepository {
	addSatsSell(transaction: SatsSellTransaction): Promise<void>;
	getListofSatsSells(): Promise<SatsSellTransaction[]>;
}
