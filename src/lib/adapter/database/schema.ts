export const SCHEMA_VERSION = 2;

export const SCHEMA_DEFINITION = `
-- Schema version tracking
CREATE TABLE IF NOT EXISTS schema_info (
    version INTEGER PRIMARY KEY,
    applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Sats buy transactions
CREATE TABLE IF NOT EXISTS sats_buy_transactions (
    id UUID PRIMARY KEY,
    sats INTEGER NOT NULL CHECK (sats > 0),
    cost REAL NOT NULL CHECK (cost > 0),
    currency TEXT NOT NULL CHECK (length(currency) = 3),
    date TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_sats_buy_date ON sats_buy_transactions(date);

CREATE TABLE IF NOT EXISTS sats_sell_transactions (
    id UUID PRIMARY KEY,
    sats INTEGER NOT NULL CHECK (sats > 0),
    revenue REAL NOT NULL,
    currency TEXT NOT NULL CHECK (length(currency) = 3),
    date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    description TEXT NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_sats_sell_date ON sats_sell_transactions(date);

CREATE TABLE IF NOT EXISTS sats_sell_allocations (
    id UUID PRIMARY KEY,
    sell_transaction_id UUID NOT NULL,
    buy_transaction_id UUID NOT NULL,
    sats INTEGER NOT NULL CHECK (sats > 0),
    FOREIGN KEY (sell_transaction_id) REFERENCES sats_sell_transactions(id) ON DELETE CASCADE,
    FOREIGN KEY (buy_transaction_id) REFERENCES sats_buy_transactions(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_sats_sell_allocations_sell_id ON sats_sell_allocations(sell_transaction_id);
CREATE INDEX IF NOT EXISTS idx_sats_sell_allocations_buy_id ON sats_sell_allocations(buy_transaction_id);

`