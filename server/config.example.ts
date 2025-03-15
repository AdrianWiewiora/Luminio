let config;

if (Deno.env.get("IS_DOCKER")) {
    config = {
        MIGRATIONS_DIR: "../../migrations/",
        DATABASE_URL: "postgres://postgres:1234@postgres/luminio",
        HOSTNAME: "0.0.0.0",
        PORT: 8000,
    };
} 
else {
    config = {
        MIGRATIONS_DIR: "../../migrations/",
        DATABASE_URL: "postgres://username:password@127.0.0.1/luminio",
        HOSTNAME: "127.0.0.1",
        PORT: 8000,
    };
}

export const MIGRATIONS_DIR = config.MIGRATIONS_DIR;
export const DATABASE_URL = config.DATABASE_URL;
export const HOSTNAME = config.HOSTNAME;
export const PORT = config.PORT;

