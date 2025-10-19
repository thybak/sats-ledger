import type { SatsBuyTransaction } from "$lib/model/sats-buy-transaction";
import type { SatsSellTransaction } from "$lib/model/sats-sell-transaction";
import type { SatsRepository } from "$lib/use-case/repo/sats-repository";
import { SatsBuy } from "./database/entities/sats-buy";

export class SatsAdapter implements SatsRepository {
    private satsBuyEntity = new SatsBuy();

    async addSatsBuy(transaction: SatsBuyTransaction): Promise<void> {
        // Implementation for adding a buy transaction
        await this.satsBuyEntity.insert(transaction);
    }

    async getListofSatsBuys(): Promise<SatsBuyTransaction[]> {
        // Implementation for retrieving buy transactions
        return [];
    }

    async addSatsSell(sell: SatsSellTransaction): Promise<void> {
        // Implementation for adding a sell transaction
        throw new Error(`Method not implemented. ${sell.id}`);
    }

    async getListofSatsSells(): Promise<SatsSellTransaction[]> {
        // Implementation for retrieving sell transactions
        return [];
    }
}