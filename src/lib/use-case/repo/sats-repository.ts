import type { SatsBuyTransaction } from "$lib/model/sats-buy-transaction";
import type { SatsSellTransaction } from "$lib/model/sats-sell-transaction";

export interface SatsRepository {
    addSatsBuy(transaction: SatsBuyTransaction): Promise<void>;
    getListofSatsBuys(): Promise<SatsBuyTransaction[]>;

    addSatsSell(transaction: SatsSellTransaction): Promise<void>;
    getListofSatsSells(): Promise<SatsSellTransaction[]>;
}