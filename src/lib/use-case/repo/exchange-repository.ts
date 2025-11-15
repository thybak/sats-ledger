export interface ExchangeRepository {
    getCurrentPricePerSat(currency: string): Promise<number>;
}