const express = require('express');
const path = require('path')
const sequelize = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./controllers')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
})