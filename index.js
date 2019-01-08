const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const app = express();
const db = "mongodb://kcheung:testing123@ds027779.mlab.com:27779/fakeddit";
const port = process.env.PORT || 5000;

app.use(cors());

mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(port, () => {
  console.log(`Now listening to ${port} 🚀`);
});
