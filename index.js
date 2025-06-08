const express = require('express');
const client = require('prom-client');
const app = express();
const port = process.env.PORT || 3000;

// Prometheus metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get('/', (req, res) => {
  res.send('Hello, DevOps World!');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;