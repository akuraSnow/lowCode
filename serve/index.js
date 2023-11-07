const express = require('express');
const fs = require('fs');
const cors = require('cors');

const { writeFile, GetFilesInFolder, isFile } = require('./util.js');
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

const calculatorFolderName = './serve/calculator';

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/saveJson', async function (req, res) {
  await writeFile(calculatorFolderName, JSON.stringify(req.body, null, '\t'));

  res.send({ name: 'dd' });
});

app.get('/addJson', async function (req, res) {
  const { name, content } = req.body;

  const path = `${calculatorFolderName}/${name}.js`;
  await writeFile(path, content);
  res.send({ status: 200, data: content });
});

app.get('/getJson', async function (req, res) {
  console.log('req: ', req.query);

  const { name, content, path } = req.body;
  console.log('path: ', path);

  const data = await GetFilesInFolder(calculatorFolderName);
  res.send({ status: 200, data });
});

app.post('/updateJson', async function (req, res) {
  const { name, content } = req.body;

  const path = `${calculatorFolderName}/${name}.js`;

  if (fs.existsSync(path)) {
    await fs.unlinkSync(path, () => {});
  }

  await writeFile(path, content);
  res.send({ status: 200, data: content });
});

app.post('/deleteJson', async function (req, res) {
  const { name, content } = req.body;

  const path = `${calculatorFolderName}/${name}.js`;

  await fs.unlinkSync(path, () => {});
  res.send({ status: 200, data: content });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
