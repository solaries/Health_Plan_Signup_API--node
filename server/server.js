const express = require('express');

const apiroutes = require('./routes');


    const app = express();
    app.use(express.json());
    app.use("/api", apiroutes);
    app.listen(process.env.PORT || 2244, () => {
          // console.log(`Listening on port: ${process.env.PORT || 2244}`);
        }); 

function createServer() {
    
    return app;
  }  
  module.exports = createServer;
  