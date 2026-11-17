// Simple local preview server for TenX Ink (http://localhost:8080)
// Includes /api/works so any photo or video the owner puts in ./works/
// automatically loads into the scalable Full Gallery Scroll Reel!
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
};

const MEDIA_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.webm', '.mov']);

http
  .createServer((req, res) => {
    const cleanUrl = decodeURIComponent(req.url.split('?')[0]);

    // Automatic API endpoint that lists all photos & videos inside ./works
    if (cleanUrl === '/api/works') {
      const worksDir = path.join(__dirname, 'works');
      fs.readdir(worksDir, (err, files) => {
        if (err) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ files: [] }));
          return;
        }
        const mediaFiles = files
          .filter((f) => {
            const ext = path.extname(f).toLowerCase();
            return MEDIA_EXTENSIONS.has(ext) && !f.toLowerCase().includes('inspo');
          })
          .map((f) => {
            const ext = path.extname(f).toLowerCase();
            const isVideo = ext === '.mp4' || ext === '.webm' || ext === '.mov';
            return {
              filename: f,
              src: `works/${f}`,
              type: isVideo ? 'video' : 'image',
            };
          });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ files: mediaFiles }));
      });
      return;
    }

    const relPath = cleanUrl === '/' ? 'index.html' : cleanUrl.replace(/^\/+/, '');
    const filePath = path.join(__dirname, relPath);

    fs.stat(filePath, (statErr, stats) => {
      if (statErr || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      // Support video range requests so tattoo videos scrub smoothly
      const range = req.headers.range;
      if (range && (ext === '.mp4' || ext === '.webm' || ext === '.mov')) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
        const chunksize = end - start + 1;
        const file = fs.createReadStream(filePath, { start, end });
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${stats.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': contentType,
        });
        file.pipe(res);
        return;
      }

      res.writeHead(200, {
        'Content-Length': stats.size,
        'Content-Type': contentType,
      });
      fs.createReadStream(filePath).pipe(res);
    });
  })
  .listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`TenX Ink preview running at ${url}`);
    require('child_process').exec(`start "" "${url}"`);
  });
