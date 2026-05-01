import http from 'http';
import https from 'https';

const TARGET = process.env.TARGET_DOMAIN;

export const config = {
  maxDuration: 75,
  memory: 128,
};

export default async function handler(req, res) {
  if (!TARGET) {
    return res.status(500).end('Service unavailable');
  }

  try {
    const targetUrl = new URL(TARGET);
    const isHttps = targetUrl.protocol === 'https:';

    let targetPath = req.url.replace(/^\/api\/core\/content\/flow\/proc/, '');
    if (!targetPath || targetPath === '') targetPath = '/';

    const options = {
      hostname: targetUrl.hostname,
      port: targetUrl.port || (isHttps ? 443 : 80),
      path: targetPath,
      method: req.method,
      headers: {
        ...req.headers,
        host: targetUrl.host,
      },
    };

    delete options.headers['connection'];
    delete options.headers['upgrade'];
    delete options.headers['keep-alive'];
    delete options.headers['x-forwarded-for'];
    delete options.headers['x-real-ip'];
    delete options.headers['cf-ray'];
    delete options.headers['cf-connecting-ip'];

    if (options.headers['user-agent']) {
      options.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
    }

    const proxyReq = (isHttps ? https : http).request(options, (proxyRes) => {
      const cleanHeaders = { ...proxyRes.headers };
      delete cleanHeaders['server'];
      delete cleanHeaders['x-powered-by'];

      res.writeHead(proxyRes.statusCode || 200, cleanHeaders);
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      if (!res.headersSent) {
        res.status(502).end('Bad Gateway');
      }
    });

    req.pipe(proxyReq);

  } catch (error) {
    if (!res.headersSent) {
      res.status(500).end('Internal error');
    }
  }
}