const fs = require('fs'),
  path = require('path'),
  stream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), 'utf-8');

stream.on('data', (chunk) => {
  console.log(chunk);
})