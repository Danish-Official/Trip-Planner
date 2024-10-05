import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',             // Bind to 0.0.0.0 for external access
    port: process.env.PORT || 5173,  // Use the port provided by Render or fallback to 5173
  },
});
