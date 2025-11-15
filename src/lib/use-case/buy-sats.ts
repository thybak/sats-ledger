import { Currency } from "$lib/model/enum/currency.enum";
import type { SatsRepository } from "./repo/sats-repository";

export class BuySats {
    constructor(private readonly satsRepository: SatsRepository) {
        this.satsRepository = satsRepository;
    }

    async execute(transaction: {
        sats: number,
        cost: number,
        currency: string,
        description: string
    }): Promise<void> {

        if (!Object.values(Currency).includes(transaction.currency as Currency)) {
            throw new Error(`Invalid currency: ${transaction.currency}`);
        }

        await this.satsRepository.addSatsBuy({
            id: crypto.randomUUID(),
            sats: transaction.sats,
            cost: transaction.cost,
            currency: transaction.currency as Currency,
            description: transaction.description,
            date: new Date().toISOString()
        });
    }
}