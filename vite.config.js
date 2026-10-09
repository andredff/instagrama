import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// No `npm run dev`, serve /api/checagens com a mesma função usada na Vercel.
// A chave vem de GOOGLE_FACTCHECK_API_KEY no ambiente ou em .env.local.
function apiDev() {
  return {
    name: 'instagrama-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/checagens', async (req, res) => {
        try {
          const { default: handler } = await server.ssrLoadModule('/api/checagens.js');
          const response = await handler.fetch(new Request(new URL(req.originalUrl, 'http://localhost')));
          res.statusCode = response.status;
          response.headers.forEach((value, name) => res.setHeader(name, value));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'dev', detail: String(err) }));
        }
      });
    },
  };
}

// `npm run build:single` gera um único index.html com tudo embutido.
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), 'GOOGLE_'));
  return {
    plugins: [react(), apiDev(), ...(mode === 'single' ? [viteSingleFile()] : [])],
    build: { outDir: mode === 'single' ? 'dist-single' : 'dist' },
  };
});
