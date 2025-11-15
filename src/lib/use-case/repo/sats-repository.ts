import type { AvailableSatsBuyTransaction } from "$lib/model/available-sats-buy-transaction";
import type { SatsBuyTransaction } from "$lib/model/sats-buy-transaction";
import type { SatsSellTransaction } from "$lib/model/sats-sell-transaction";

export interface SatsRepository {
    addSatsBuy(transaction: SatsBuyTransaction): Promise<void>;
    getListofSatsBuys(): Promise<SatsBuyTransaction[]>;

    addSatsSell(transaction: SatsSellTransaction): Promise<void>;
    getListofSatsSells(): Promise<SatsSellTransaction[]>;

    getTotalSatsBalance(): Promise<number>;
    getNotFullyAllocatedBuys(): Promise<AvailableSatsBuyTransaction[]>;
}