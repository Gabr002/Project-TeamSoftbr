const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => {
    console.info(`App rodando em http://localhost:` + 3000);
});

module.exports = app;
