export interface SatsSellAllocation {
    buyTransactionId: string;
    sellTransactionId: string;
    satsAllocated: number;
    date: string; // ISO 8601 format
}