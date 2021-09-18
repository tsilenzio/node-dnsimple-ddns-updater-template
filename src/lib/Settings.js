import path from 'path';
import fs from 'fs';

export default class Settings {
  constructor(filePath) {
    this.filePath = path.resolve(filePath);
    this.fileName = path.basename(filePath);
    this.data = {};

    if (!fs.existsSync(this.filePath)) {
      throw new Error(`No file located at ${this.filePath}`);
    }
  }

  load() {
    console.info(`Loading data from ${this.fileName}`);
    const text = fs.readFileSync(this.filePath);
    this.data = JSON.parse(text);

    return this.data;
  }

  save() {
    console.info(`Saving data to ${this.fileName}`);
    const json = JSON.stringify(this.data, null, '\t');

    fs.writeFile(this.filePath, json, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}
