export interface SatsBuyTransaction {
    id: string;
    sats: number;
    cost: number;
    currency: string;
    date: string; // ISO 8601 format
    description: string;
}