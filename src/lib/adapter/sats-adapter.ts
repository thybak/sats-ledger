import type { AvailableSatsBuyTransaction } from "$lib/model/available-sats-buy-transaction";
import type { SatsBuyTransaction } from "$lib/model/sats-buy-transaction";
import type { SatsSellTransaction } from "$lib/model/sats-sell-transaction";
import type { SatsRepository } from "$lib/use-case/repo/sats-repository";
import { SatsBuy } from "./database/entities/sats-buy";
import { SatsSell } from "./database/entities/sats-sell";

export class SatsAdapter implements SatsRepository {
    private satsBuyEntity = new SatsBuy();
    private satsSellEntity = new SatsSell();

    async addSatsBuy(transaction: SatsBuyTransaction): Promise<void> {
        await this.satsBuyEntity.insert(transaction);
    }

    async getListofSatsBuys(): Promise<SatsBuyTransaction[]> {
        return this.satsBuyEntity.getAll();
    }

    async addSatsSell(sell: SatsSellTransaction): Promise<void> {
        await this.satsSellEntity.insert(sell);
    }

    async getListofSatsSells(): Promise<SatsSellTransaction[]> {
        return this.satsSellEntity.getAll();
    }

    async getTotalSatsBalance(): Promise<number> {
        return this.satsSellEntity.getTotalSatsBalance();
    }

    async getNotFullyAllocatedBuys(): Promise<AvailableSatsBuyTransaction[]> {
        return this.satsBuyEntity.getNotFullyAllocatedBuys();
    }
}