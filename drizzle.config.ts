import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "sqlite", // "mysql" | "sqlite" | "postgresql"
  schema: "./db/schema/*",
  out: "./drizzle",
    dbCredentials:{
        url:'./sqlite.db'
    }
});