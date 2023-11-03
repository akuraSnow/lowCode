const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors()).use((req, res, next) => {
  // console.log(req);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.set('Content-Type', 'text/plain');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/saveJson', async function (req, res) {
  await fs.writeFileSync(
    'serve/jsonData/pageJson.json',
    JSON.stringify(req.body, null, '\t'),
    'utf-8',
    (err, data) => {
      if (err) throw err;
      console.log('data: ', data);
    },
  );

  res.send({ name: 'dd' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
