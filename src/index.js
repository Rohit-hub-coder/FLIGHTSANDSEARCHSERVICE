const express = require('express');
const bodyParser = require('body-parser');
require('./config/serverConfig');
const setupAndStartServer = async () => {
  const app = express();


  // middleware to parse JSON and URL-encoded data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const port = serverConfig.PORT;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
setupAndStartServer();