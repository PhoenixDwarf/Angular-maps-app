/**
 * Environment Setup Script for Angular Maps Application
 * 
 * This script creates environment configuration files for the Angular application
 * by reading environment variables and generating TypeScript environment files.
 * It's typically run during the build process to inject API keys and other
 * sensitive configuration values that shouldn't be committed to version control.
 */

const { writeFileSync, mkdirSync } = require("fs");

// Load environment variables from .env file
require("dotenv").config();

// Define paths for the environment files
const targetPath = "./src/environments/environment.ts";
const targetPathDev = "./src/environments/environment.development.ts";

// Get the Mapbox API key from environment variables
const mapboxKey = process.env["MAPBOX_KEY"];

// Validate that the required environment variable is set
if (!mapboxKey) {
  throw new Error("MAPBOX_KEY is not set in the environment variables.");
}

// Create the content for the environment files
// This will be written as a TypeScript module that exports the configuration
const envFileContent = `
   export const environment = {
    mapboxKey: "${mapboxKey}",
   }
`;

// Ensure the environments directory exists
mkdirSync("./src/environments", { recursive: true });

// Write the environment configuration to both production and development files
writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);
