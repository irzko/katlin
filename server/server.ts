import express, { Express } from 'express';
const cors = require('cors')
require("./src/models/users.model");

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require("./src/routers/routes.config"));

app.listen(port|| 8001, () => {
  console.log(`Server listening on port ${port || 8001}`);
});
