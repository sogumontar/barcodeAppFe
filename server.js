// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const serveStatic = require('serve-static');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const app = express();

app.use('/', serveStatic(path.join(__dirname, '/dist')));
app.get(/.*/, (req, res) => {
  res.sendfile(`${__dirname}/dist/index.html`);
});

const port = process.env.PORT || 8811;
app.listen(port);

console.log(`Listening on port : ${port}`);
