const fs = require('fs');
const path = require('path');

const fsReadFileSync = (url) => {
  return new Promise((res) => {
    fs.readFile(url, { encoding: 'utf8', flag: 'r' }, (err, data) => {
      const urls = url.split('/');
      const name = urls[urls.length - 1].replace('.js', '');
      if (err) throw err;
      res({
        name,
        content: data,
      });
    });
  });
};

const isFile = (fileName) => {
  return fs.lstatSync(fileName).isFile();
};

module.exports.isFile = isFile;

module.exports.GetFilesInFolder = async (folderName) => {
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }

    const data = fs
      .readdirSync(folderName)
      .map((fileName) => {
        return path.join(folderName, fileName);
      })
      .filter(isFile);

    const dataContent = data.map((res) => {
      return fsReadFileSync(res);
    });

    return await Promise.all(dataContent);
  } catch (err) {
    console.error(err);
  }
};

module.exports.writeFile = (url, content) => {
  return fs.writeFileSync(url, content, 'utf-8', (err, data) => {
    if (err) throw err;
    console.log('data: ', data);
  });
};
