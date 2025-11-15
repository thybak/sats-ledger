import type { ExchangeRepository } from "$lib/use-case/repo/exchange-repository";

export class ExchangeAdapter implements ExchangeRepository {
    getCurrentPricePerSat(currency: string): Promise<number> {
        // Mock implementation - in real scenario, fetch from an API
        const mockPrices: { [key: string]: number } = {
            EUR: 0.0008
        };
        return Promise.resolve(mockPrices[currency] || 0.0008);
    }
}