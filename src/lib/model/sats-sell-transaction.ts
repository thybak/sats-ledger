import type { SatsSellAllocation } from "./sats-sell-allocation";

export interface SatsSellTransaction {
    id: string;
    sats: number;
    revenue: number;
    currency: string;
    date: string; // ISO 8601 format
    description: string;
    allocations: SatsSellAllocation[];
}