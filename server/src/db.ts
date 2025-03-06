import postgres from "postgres";
import { DATABASE_URL } from "../config.ts";

export const sql = postgres(DATABASE_URL);
