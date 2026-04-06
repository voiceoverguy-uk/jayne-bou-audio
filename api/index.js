// Vercel serverless entry point (CommonJS-compatible)
// Lazily imports the ESM Express app built by esbuild.
// The `app` singleton is cached across warm invocations so the
// in-memory eBay listing cache is preserved between requests.

let app;

module.exports = async (req, res) => {
  if (!app) {
    const mod = await import('../artifacts/api-server/dist/app.mjs');
    app = mod.default;
  }
  return app(req, res);
};
