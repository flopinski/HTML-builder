const fs = require('fs'),
  path = require('path'),
  fsPromises = require('fs/promises');

(function copyDirectory() {
  fs.rm(path.resolve(__dirname, 'files-copy'), { recursive: true, force: true }, () => {

    fs.mkdir(path.resolve(__dirname, 'files-copy'), { recursive: true }, () => {});
   
    fsPromises
      .readdir(path.resolve(__dirname, 'files'), {withFileTypes: true})
      .then(dirEntryList => {
        dirEntryList.forEach(dirEntry => {
          fsPromises.copyFile(
            path.resolve(__dirname, 'files', dirEntry.name),
            path.resolve(__dirname, 'files-copy', dirEntry.name)
          );
        });
      })
  });
  

})();


