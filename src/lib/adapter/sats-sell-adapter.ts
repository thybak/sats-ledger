import type { SatsSellTransaction } from '$lib/model/sats-sell-transaction';
import type { SatsSellRepository } from '$lib/use-case/repo/sats-sell-repository';
import { SatsSell } from './database/entities/sats-sell';

export class SatsSellAdapter implements SatsSellRepository {
	private satsSellEntity = new SatsSell();

	async addSatsSell(sell: SatsSellTransaction): Promise<void> {
		await this.satsSellEntity.insert(sell);
	}

	async getListofSatsSells(): Promise<SatsSellTransaction[]> {
		return this.satsSellEntity.getAll();
	}
}
