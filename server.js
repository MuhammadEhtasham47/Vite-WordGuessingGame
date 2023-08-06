import { createServer } from 'http';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const app = express();

// Get the current module's URL
const __filename = fileURLToPath(import.meta.url);

// Get the directory name from the file path
const __dirname = dirname(__filename);

// Serve static files from the 'dist' directory
app.use(express.static(resolve(__dirname, 'dist')));

// Catch-all route to serve the index.html file
app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'dist', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
