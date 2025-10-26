import type { SatsBuyTransaction } from "$lib/model/sats-buy-transaction";
import type { SatsRepository } from "./repo/sats-repository";

export class ListSatsBuys {
    constructor(private satsRepository: SatsRepository) {}

    async execute(): Promise<SatsBuyTransaction[]> {
        return this.satsRepository.getListofSatsBuys();
    }
}