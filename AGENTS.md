# Project: sats-ledger

Bitcoin satoshi buy/sell tracking ledger with FIFO-based sell allocation. Tauri 2 desktop app.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Language | TypeScript (strict) + Rust | TS 5.9 / Rust 2021 |
| Frontend | SvelteKit + Svelte 5 | Kit 2.55 / Svelte 5.55 |
| Desktop | Tauri 2 | 2.10 CLI |
| Database | better-sqlite3 (sync SQLite) | 12.8 |
| Package | pnpm | 10.33 |
| Test | Vitest + Playwright | 3.2 |
| Lint | ESLint (flat config) + Prettier | 9.x / 3.8 |
| Dev env | mise + bootstrap.sh (Fedora/Distrobox) | - |

No ORM. Raw SQL via better-sqlite3 prepared statements.

## Project Structure

```
src/
  app.css                  # Global styles (CSS variables, typography)
  app.html                 # Root HTML template
  lib/                     # $lib alias -> src/lib/
    model/                 # Pure TS interfaces & enums - NO logic
      enum/currency.enum.ts
    use-case/              # Business logic classes (one per file)
      repo/                # Repository interfaces (ports)
    adapter/               # Concrete implementations (adapters)
      database/            # SQLite connection + schema + per-table entities
        entities/          # One class per DB table (SatsBuy, SatsSell)
  routes/                  # SvelteKit file-based routing
    +page.server.ts        # load() + actions for / (buy page)
    +page.svelte           # Buy page UI
    sell/
      +page.server.ts      # load() + actions for /sell
      +page.svelte         # Sell page UI
src-tauri/                 # Rust/Tauri desktop shell
  src/lib.rs               # Tauri builder (log plugin)
  tauri.conf.json          # Window, build, bundle config
```

## Architecture (Clean/Hexagonal)

```
routes/ (+page.server.ts)      <- SvelteKit load() & form actions
  |  new UseCase(new Adapter())
  v
use-case/ (BuySats, SellSats)  <- Business logic, validation, UUIDs, FIFO
  |  calls repo method
  v
use-case/repo/ (interfaces)    <- Abstract contracts (ports)
  |  implemented by
  v
adapter/ (SatsAdapter, etc.)   <- Delegates to DB entities
  |
  v
adapter/database/entities/     <- Raw SQL via better-sqlite3
```

**Key patterns:**

- **Manual DI**: Use cases receive dependencies via constructor - no DI framework.
  ```ts
  new BuySats(new SatsAdapter()).execute({ ... })
  ```
- **Singletons**: DB connection is a singleton. Database file: `./db/sats-ledger.db`.
- **Schema migration**: Auto-applied on first DB access. Version tracked in `schema_info` table. Migrations run top-to-bottom sequentially.
- **UUIDs**: Generated in use cases (`crypto.randomUUID()`) not in adapters.
- **FIFO**: `SellSats.createAllocations()` iterates `getNotFullyAllocatedBuys()` ordered by date ascending.

## Conventions

### Naming

| Thing | Convention | Example |
|-------|-----------|---------|
| Files | kebab-case | `buy-sats.ts`, `sats-buy.ts` |
| Classes / Interfaces / Enums | PascalCase | `BuySats`, `SatsRepository`, `Currency` |
| Methods / properties | camelCase | `getNotFullyAllocatedBuys()` |
| Constants | SCREAMING_SNAKE_CASE | `SCHEMA_VERSION` |

### TypeScript

- `strict: true`. All code under `src/` is TypeScript.
- Use `import type` for type-only imports.
- SvelteKit auto-generates `./$types` module - import `PageServerLoad`, `Actions`, `PageData` from it.
- Module resolution: `bundler`. No `.ts` extensions in imports.
- Path alias: `$lib` -> `src/lib/`. Always use it for internal imports.

### Formatting (Prettier)

```jsonc
{ "useTabs": true, "singleQuote": true, "trailingComma": "none", "printWidth": 100 }
```

### ESLint

Flat config. Extends: js recommended, ts recommended, svelte recommended, prettier. `no-undef` is off (TypeScript handles it).

### Files

- One class/interface/enum per file. File name = primary export name (kebab-case).
- No comments unless strictly necessary.
- 1 blank line between imports and code.

## Database

- **Engine:** SQLite via better-sqlite3 (synchronous API but wrapped in Promises for API consistency).
- **File:** `./db/sats-ledger.db` (dev) or `/db/sats-ledger.db` (prod via Tauri).
- **Settings:** WAL journal mode, foreign keys ON.
- **Schema:** Versioned in `schema_info` table. Current: version 2.
- **Tables:** `sats_buy_transactions`, `sats_sell_transactions`, `sats_sell_allocations`.
- **Adding a migration:** Bump `SCHEMA_VERSION`, add `IF NOT EXISTS` DDL block. No down migrations.

## Error Handling

- **Business rules** (use cases): `throw new Error("message")`.
- **DB errors** (entities): `try/catch` -> `console.error()` -> rethrow.
- No custom error classes. No error result types.

## Testing

- **Runner:** Vitest 3. Browser tests use Playwright Chromium.
- **Test locations:** Co-located with source files (`page.svelte.spec.ts` next to `+page.svelte`).
- **Two projects:**
  - `*.svelte.{test,spec}.{js,ts}` -> Vitest browser mode (renders components).
  - Other `*.{test,spec}.{js,ts}` -> Vitest Node mode (unit tests).
- Run: `pnpm test` (single run) or `pnpm test:unit` (watch).

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start Vite dev server (SvelteKit HMR) |
| `pnpm build` | Production build |
| `pnpm check` | Type-check via svelte-check |
| `pnpm lint` | ESLint + Prettier check |
| `pnpm format` | Auto-format with Prettier |
| `pnpm test` | Run all Vitest tests (single run) |
| `pnpm prepare` | Run `svelte-kit sync` (generate types) |
| `pnpm tauri dev` | Full Tauri desktop app (starts Vite + opens native window) |

## Adding a Feature

1. **Define types** in `src/lib/model/` (interface or enum)
2. **Add to repo interface** in `src/lib/use-case/repo/` (new method signature)
3. **Implement DB entity** in `src/lib/adapter/database/entities/` (raw SQL)
4. **Update adapter** in `src/lib/adapter/` (delegate to entity)
5. **Create use case** in `src/lib/use-case/` (validation + logic)
6. **Wire in route** `+page.server.ts` (instantiate and call in load() or actions)

Always run `pnpm check && pnpm lint && pnpm test` after changes.

## Development Setup

- **mise**: Tool version manager. Versions pinned in `mise.toml` (node, pnpm, rust).
- **bootstrap.sh**: Installs system packages, mise, and project deps inside a Fedora container. Run `./bootstrap.sh` after entering the container.
- **Distrobox**: Recommended for isolating dev environment from host OS. Use a Fedora 44 container.
