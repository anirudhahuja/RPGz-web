export interface Env {
    DB: D1Database;
}

interface D1Database {
    prepare: (query: string) => D1PreparedStatement;
    // Add other D1 methods if needed
}

interface D1PreparedStatement {
    bind: (...values: any[]) => D1PreparedStatement;
    run: () => Promise<D1Result>;
}

interface D1Result {
    success: boolean;
    error?: string;
    // Add other result properties if needed
}
