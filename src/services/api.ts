// src/services/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "https://affordpill.com/api/auth", // ✅ same base as your Next.js routes
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
