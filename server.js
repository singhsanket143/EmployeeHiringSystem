const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const companyRoutes = require('./routes/company.routes');
const jobRoutes = require('./routes/job.routes');

const db = require('./models/index');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// register the routes
authRoutes(app);
companyRoutes(app);
jobRoutes(app);

if(process.env.SYNC) {
    db.sequelize.sync({force: true});
}

app.listen(process.env.PORT, () => {
    console.log('Server Started at PORT', process.env.PORT);
})