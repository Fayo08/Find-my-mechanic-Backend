import "dotenv/config";

/**
 * Database connection.
 *
 * In production (Render) set DATABASE_URL to the MySQL service URI, e.g. from Aiven:
 *   mysql://avnadmin:PASSWORD@HOST:PORT/defaultdb?ssl-mode=REQUIRED
 * Locally, the DB_* variables in .env are used instead.
 *
 * @type { import("knex").Knex.Config }
 */
function connection() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      charset: "utf8",
    };
  }
  const u = new URL(url);
  const needsSsl = /ssl-mode=(REQUIRED|VERIFY_CA|VERIFY_IDENTITY)/i.test(u.search) || process.env.DB_SSL === "true";
  return {
    host: u.hostname,
    port: Number(u.port) || 3306,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.slice(1),
    charset: "utf8mb4",
    // Aiven gives you a CA certificate; paste it into DB_CA_CERT to verify it.
    ssl: needsSsl ? (process.env.DB_CA_CERT ? { ca: process.env.DB_CA_CERT } : { rejectUnauthorized: false }) : undefined,
  };
}

export default {
  client: "mysql2",
  connection: connection(),
  pool: { min: 0, max: 5 },
  // Its own migrations table, so this app can share one database with other projects
  migrations: { tableName: "knex_migrations_mechanic" },
};
