import { Currency } from '$lib/model/enum/currency.enum';
import type { SatsBuyRepository } from './repo/sats-buy-repository';

export class BuySats {
	constructor(private readonly satsBuyRepository: SatsBuyRepository) {
		this.satsBuyRepository = satsBuyRepository;
	}

	async execute(transaction: {
		sats: number;
		cost: number;
		currency: string;
		description: string;
		date: string;
	}): Promise<void> {
		if (!Object.values(Currency).includes(transaction.currency as Currency)) {
			throw new Error(`Invalid currency: ${transaction.currency}`);
		}

		await this.satsBuyRepository.addSatsBuy({
			id: crypto.randomUUID(),
			sats: transaction.sats,
			cost: transaction.cost,
			currency: transaction.currency as Currency,
			description: transaction.description,
			date: transaction.date
		});
	}
}
