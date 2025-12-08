import type { SatsSellTransaction } from "$lib/model/sats-sell-transaction";
import type { SatsRepository } from "./repo/sats-repository";

export class ListSatsSells {
    private satsRepository: SatsRepository;

    constructor(satsRepository: SatsRepository) {
        this.satsRepository = satsRepository;
    }

    async execute(): Promise<SatsSellTransaction[]> {
        return this.satsRepository.getListofSatsSells();
    }
}