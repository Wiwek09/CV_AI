// scripts/copyPdfWorker.js

import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { createRequire } from "module";

// Create a require function since we are in an ES module
const require = createRequire(import.meta.url);

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamically resolve the path to the 'pdfjs-dist' package
const pdfjsDistPath = path.dirname(require.resolve("pdfjs-dist/package.json"));
const pdfWorkerPath = path.join(pdfjsDistPath, "build", "pdf.worker.mjs");

// Destination where you want to copy the worker file
const destinationPath = path.join(__dirname, "../public/pdf.worker.mjs");

// Ensure the public directory exists
fs.mkdirSync(path.dirname(destinationPath), { recursive: true });

// Copy the worker file
fs.copyFileSync(pdfWorkerPath, destinationPath);

console.log(`Copied pdf.worker.mjs to ${destinationPath}`);
