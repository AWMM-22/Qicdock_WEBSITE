import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl =
  process.env.VITE_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "https://sqkdwltnkgjbylwykbsb.supabase.co";

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxa2R3bHRua2dqYnlsd3lrYnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkwMzg4MTEsImV4cCI6MjEwNDYxNDgxMX0.8uYJ8KDXN1wikXv2oOwMcgEUI4LcVjRjiVeN2Bxnasc";

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  const filePath = path.join(process.cwd(), "analytics_events.json");
  if (!fs.existsSync(filePath)) {
    console.error("analytics_events.json not found");
    return;
  }
  
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  
  console.log(`Migrating ${data.length} records to Supabase...`);
  
  // Supabase insert might fail if ID already exists, use upsert
  const { error } = await supabase.from("analytics_events").upsert(data);
  
  if (error) {
    console.error("Migration error:", error);
  } else {
    console.log("Migration successful!");
  }
}

migrate();
