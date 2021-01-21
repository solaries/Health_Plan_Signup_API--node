const serverStatic = require('serve-static');//
const history = require('connect-history-api-fallback');//
const path = require('path');//
const enforce = require('express-sslify');//
const express = require('express');

const apiroutes = require('./routes');

const app = express();
app.use(enforce.HTTPS({ trustProtoHeader: true }));//
app.use(serverStatic(path.resolve(__dirname, '/dist')));//
app.use(history());//
app.use(express.json());
app.use('/api', apiroutes);
app.listen(process.env.PORT || 2244, () => {
  // console.log(`Listening on port: ${process.env.PORT || 2244}`);
});

function createServer() {
  return app;
}
module.exports = createServer;
