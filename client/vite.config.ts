import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default ({mode}) => {

  const env = loadEnv(mode, process.cwd(), "");
  
  return defineConfig({
    define: {
      "process.env": env,

    },
    plugins: [react(), WindiCSS()],
    server: {
      host: true,
      port: 3000,
    },
    resolve: {
      alias: [
        {find: "@", replacement: "/src"}
      ]
    }
  })
}
