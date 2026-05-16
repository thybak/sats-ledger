# sats-ledger

Bitcoin satoshi buy/sell tracking ledger with FIFO-based sell allocation. Built as a Tauri 2 desktop app with SvelteKit 5 and TypeScript.

## Features

- Record BTC satoshi buy transactions with price and currency
- Record sell transactions with automatic FIFO allocation to buy lots
- Track cost basis, gains/losses, and remaining balances per buy lot
- Local-first with SQLite database

## Tech Stack

- **Frontend**: SvelteKit 2+ + Svelte 5+
- **Desktop**: Tauri 2+
- **Database**: SQLite via better-sqlite3 (raw SQL, no ORM)
- **Language**: TypeScript (strict) + Rust
- **Package manager**: pnpm
- **Testing**: Vitest + Playwright

## Architecture

Clean/Hexagonal architecture with containerized dependency injection:

```
routes/ -> di/ -> use-case/ -> use-case/repo/ (interfaces) -> adapter/ -> database/entities/
```

See `AGENTS.md` for detailed architecture and conventions.

## Prerequisites

- Distrobox (or similar container tool)
- Fedora 44 container image

## Getting Started

```sh
# Create and enter a Fedora 44 container
distrobox create --image fedora:44 --name sats-ledger
distrobox enter sats-ledger

# Bootstrap: installs system packages, mise, tool versions, and JS deps
./bootstrap.sh

# Start the Tauri dev app
pnpm tauri dev
```

## Development

```sh
pnpm dev          # Start Vite dev server (SvelteKit HMR)
pnpm tauri dev    # Full Tauri desktop app
pnpm check        # Type-check
pnpm lint         # ESLint + Prettier
pnpm format       # Auto-format
pnpm test         # Run all tests
```

## Project Structure

```
src/
  lib/
    di/              # Dependency Injection container
    model/           # Types and enums
    use-case/        # Business logic
      repo/          # Repository interfaces (ports)
    adapter/         # Concrete implementations
      database/
        entities/    # SQL via better-sqlite3
  routes/            # SvelteKit pages
src-tauri/           # Rust/Tauri shell
```

## Database

SQLite with versioned migrations. Current schema version: 2.

Tables: `sats_buy_transactions`, `sats_sell_transactions`, `sats_sell_allocations`

## License

MIT
