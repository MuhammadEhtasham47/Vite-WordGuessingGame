import express from 'express';
import { createServer as createViteServer } from 'vite';
import { resolve } from 'path';

async function createServer() {
    const app = express();

    // Use Vite only in development mode
    if (process.env.NODE_ENV === 'development') {
        const vite = await createViteServer({
            server: {
                middlewareMode: 'ssr', // or 'html'
            },
        });

        app.use(vite.middlewares);
    } else {
        // In production mode, serve static files from the 'dist' directory
        app.use(express.static(resolve(__dirname, 'dist')));
    }

    // Catch-all route to serve the index.html file
    app.get('*', async (req, res) => {
        try {
            const url = req.originalUrl;

            // Handle SSR or HTML mode here
            const template = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Vite App</title>
          <link rel="stylesheet" href="/@fs/vite.css">
        </head>
        <body>
          <div id="app"></div>
          <script type="module" src="/@fs/main.js"></script>
        </body>
        </html>
      `;

            res.status(200).send(template);
        } catch (e) {
            vite.ssrFixStacktrace(e);
            console.error(e);
            res.status(500).end(e.message);
        }
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

createServer();
