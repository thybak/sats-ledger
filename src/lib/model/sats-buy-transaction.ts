import type { Currency } from "./enum/currency.enum";

export interface SatsBuyTransaction {
    id: string;
    sats: number;
    cost: number;
    currency: Currency;
    date: string; // ISO 8601 format
    description: string;
}