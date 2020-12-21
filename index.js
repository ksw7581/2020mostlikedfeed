const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
dotenv.config();

const routes = require('./routes');
const globalRouter = require('./routers/globalrouter');
const app = express();

const PORT = process.env.PORT || 80;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes.home, globalRouter);

app.listen(PORT, function () {
    console.log(`Server started on port, ${PORT}`);
});

