export const SCHEMA_VERSION = 1;

export const SCHEMA_DEFINITION = `
-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

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
`;