import type { SatsSellTransaction } from '$lib/model/sats-sell-transaction';
import type { SatsSellRepository } from './repo/sats-sell-repository';

export class ListSatsSells {
	private satsSellRepository: SatsSellRepository;

	constructor(satsSellRepository: SatsSellRepository) {
		this.satsSellRepository = satsSellRepository;
	}

	async execute(): Promise<SatsSellTransaction[]> {
		return this.satsSellRepository.getListofSatsSells();
	}
}
