import { defineConfig} from 'vite';
import express from "express";

// using Express to support default page
const app = express();
app.use((req, res, next) => {
  console.info(`req = ${req.url}`)
  if (req.url === '/') {
    res.redirect('/index.html');
  } else {
    next();
  }
});

function expressPlugin() {
  return {
    name: 'express-plugin',
    configureServer(server) {
      server.middlewares.use(app)
    }
  }
}

export default defineConfig({
  plugins: [expressPlugin()],
  root: '.', // Set the root directory at the project level
  publicDir: 'public', // Explicitly set public directory
  build: {
    rollupOptions: {
      input: 'public/index.html', // Explicitly point to the index.html in the public folder
    }
  },
  server: {
    port: 3000,
  }
});
