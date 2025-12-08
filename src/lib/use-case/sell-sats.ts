import { Currency } from "$lib/model/enum/currency.enum";
import type { SatsSellAllocation } from "$lib/model/sats-sell-allocation";
import type { ExchangeRepository } from "./repo/exchange-repository";
import type { SatsRepository } from "./repo/sats-repository";

export class SellSats { 
    constructor(private satsRepository: SatsRepository, private exchangeRepository: ExchangeRepository) {
        this.satsRepository = satsRepository;
        this.exchangeRepository = exchangeRepository;
    }

    async execute(sellTransaction: {
        sats: number,
        currency: string,
        description: string
    }): Promise<void> {
        if (!Object.values(Currency).includes(sellTransaction.currency as Currency)) {
            throw new Error(`Invalid currency: ${sellTransaction.currency}`);
        }
        if (sellTransaction.sats > await this.satsRepository.getTotalSatsBalance()) {
            throw new Error(`Insufficient sats to sell: ${sellTransaction.sats}`);
        }

        const sellTransactionId = crypto.randomUUID();
        const allocations = await this.createAllocations(sellTransaction.sats, sellTransactionId);
        
        await this.satsRepository.addSatsSell({
            id: sellTransactionId,
            sats: sellTransaction.sats,
            revenue: allocations.reduce((acc, alloc) => acc + alloc.revenue, 0),
            currency: sellTransaction.currency,
            description: sellTransaction.description,
            allocations: allocations.map((alloc): SatsSellAllocation => ({
                id: crypto.randomUUID(),
                buyTransactionId: alloc.buyTransactionId,
                sellTransactionId: alloc.sellTransactionId,
                sats: alloc.sats
            })),
            date: new Date().toISOString()
        });
    }

    private async createAllocations(satsToSell: number, sellTransactionId: string): Promise<{ buyTransactionId: string; sellTransactionId: string; sats: number; revenue: number }[]> {
        const availableBuys = await this.satsRepository.getNotFullyAllocatedBuys();
        let satsRemaining = satsToSell;
        const allocations: { buyTransactionId: string; sellTransactionId: string; sats: number; revenue: number }[] = [];

        for (const buy of availableBuys) {
            if (satsRemaining <= 0) 
                break;

            const satsToAllocate = Math.min(buy.satsAvailable, satsRemaining);
            const currentCost = await this.exchangeRepository.getCurrentPricePerSat(buy.currency) * buy.sats;
            const costDifference = currentCost - buy.cost;

            allocations.push({
                buyTransactionId: buy.buyTransactionId,
                sellTransactionId: sellTransactionId,
                sats: satsToAllocate,
                revenue: costDifference * (satsToAllocate / buy.sats)
            });

            satsRemaining -= satsToAllocate;
        }

        return allocations;
    }
}