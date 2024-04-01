import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
        REACT_APP_AMBIENTE: "dev",
        REACT_APP_BASE_URL_DEV:"http://localhost:3000/",
        REACT_APP_BASE_URL_PROD: ""
  }},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
