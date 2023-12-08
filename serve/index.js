const express = require('express');
const fs = require('fs');
const cors = require('cors');
var url = require('url');

const { writeFile, GetFilesInFolder, fsReadFileSync } = require('./util.js');
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

const calculatorFolderName = './serve/';

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
  const { path } = req.query;

  const data = await GetFilesInFolder(`${calculatorFolderName}/${path}`);
  res.send({
    status: 200,
    data: data,
  });
});

app.post('/updateJson', async function (req, res) {
  const { name, content, path } = req.body;
  const filePath = `${calculatorFolderName}/${path}/${name}.js`;

  if (fs.existsSync(filePath)) {
    await fs.unlinkSync(filePath, () => {});
  }

  await writeFile(filePath, content);
  res.send({ status: 200, data: content });
});

app.post('/deleteJson', async function (req, res) {
  const { name, content, path } = req.body;

  const filePath = `${calculatorFolderName}/${path}/${name}.js`;

  await fs.unlinkSync(filePath, () => {});
  res.send({ status: 200, data: content });
});

app.post('/addUrl', async function (req, res) {
  const filePath = `${calculatorFolderName}interface/index.json`;
  await writeFile(filePath, JSON.stringify(req.body, null, '\t'));

  res.send({ status: 200, data: req.body });
});

app.get('/getUrl', async function (req, res) {
  const filePath = `${calculatorFolderName}interface/index.json`;
  const data = await fsReadFileSync(filePath);
  console.log('data: ', data);

  res.send({ status: 200, data });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
