import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// 1. Get API Key from .env.local
const envPath = path.join(process.cwd(), ".env.local");
let apiKey = "";

try {
    const envContent = fs.readFileSync(envPath, "utf8");
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    if (match) {
        apiKey = match[1].trim();
    }
} catch (e) {
    console.error("Could not read .env.local");
}

if (!apiKey) {
    console.error("No API Key found in .env.local");
    process.exit(1);
}

console.log("Using API Key: " + apiKey.substring(0, 10) + "...");

// 2. List Models
const genAI = new GoogleGenerativeAI(apiKey);

async function checkModels() {
    try {
        console.log("Fetching available models...");
        // Hack: generic way to access listModels if not exposed directly on client sometimes
        // But the SDK usually exposes it on the manager.
        // GoogleGenerativeAI instance doesn't have listModels? 
        // GenerativeModel doesn't.
        // It's usually a separate call or via model settings.
        // Actually, the SDK might not expose listModels easily in 0.x?
        // Let's try to just invoke a simple prompts on gemini-pro to see specific error or success.

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        // The error message said "Call ListModels". That refers to the REST API.

        // We will try to just run a hello world.
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-pro!");
    } catch (e) {
        console.error("Test Failed:", e.message);
    }
}

// Actually, let's try to hit the REST API directly to list models to be sure.
async function listModelsRest() {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("--- Available Models (REST API) ---");
        if (data.models) {
            data.models.forEach(m => console.log(m.name));
        } else {
            console.log("No models found. Error:", data);
        }
    } catch (e) {
        console.error("REST List Failed:", e);
    }
}

listModelsRest();
