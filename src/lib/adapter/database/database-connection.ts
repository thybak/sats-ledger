import Database from 'better-sqlite3';
import { SCHEMA_VERSION, SCHEMA_DEFINITION } from './schema';

export class DatabaseConnection {
    private static instance: Database.Database | null = null;

    static getInstance(): Database.Database {
        if (!DatabaseConnection.instance) {
            // In development, use a file-based database
            // In production/Tauri, use app data directory
            const dbPath = process.env.NODE_ENV === 'development'
                ? './db/sats-ledger.db'
                : '/db/sats-ledger.db';

            DatabaseConnection.instance = new Database(dbPath);
            DatabaseConnection.instance.pragma('journal_mode = WAL');
            DatabaseConnection.instance.pragma('foreign_keys = ON');

            DatabaseConnection.initializeSchema();
        }
        return DatabaseConnection.instance;
    }

    private static initializeSchema(): void {
        const db = DatabaseConnection.instance!;

        // Run schema creation
        db.exec(SCHEMA_DEFINITION);

        // Check/update schema version
        const currentVersion = db.prepare('SELECT version FROM schema_info ORDER BY version DESC LIMIT 1').get() as { version: number } | undefined;

        if (!currentVersion || currentVersion.version < SCHEMA_VERSION) {
            db.prepare('INSERT OR REPLACE INTO schema_info (version) VALUES (?)').run(SCHEMA_VERSION);
        }
    }

    static close(): void {
        if (DatabaseConnection.instance) {
            DatabaseConnection.instance.close();
            DatabaseConnection.instance = null;
        }
    }
}