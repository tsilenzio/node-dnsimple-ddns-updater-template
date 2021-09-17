import path from 'path';
import fs from 'fs';

const fileName = 'config.json';
const filePath = path.resolve(`./src/config/${fileName}`);
let config;

const load = () => {
  console.info(`Loading data from ${fileName}`);
  config = JSON.parse(fs.readFileSync(filePath));

  return config;
};

const save = () => {
  console.info(`Saving data to ${fileName}`);
  fs.writeFile(filePath, JSON.stringify(config, null, '\t'), (err) => {
    if (err) {
      throw err;
    }
  });
};

export default {
  load,
  save,
};
