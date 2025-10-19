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
        await this.satsRepository.addSatsBuy({
            id: crypto.randomUUID(),
            sats: transaction.sats,
            cost: transaction.cost,
            currency: transaction.currency,
            description: transaction.description,
            date: new Date().toISOString()
        });
    }
}