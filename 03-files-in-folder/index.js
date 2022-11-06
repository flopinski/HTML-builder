const fs = require('fs/promises'),
  path = require('path');

fs.readdir(path.resolve(__dirname, 'secret-folder'), {
  withFileTypes: true,
}).then((dirEntryList) => {
  dirEntryList.forEach((dirEntry) => {
    if (dirEntry.isFile()) {
      fs.stat(path.resolve(__dirname, 'secret-folder', dirEntry.name)).then(
        (data) => {
          const dirEntryExtension = path.extname(
            path.resolve(__dirname, 'secret-folder', dirEntry.name)
          );
          const dirEntryName = path.basename(
            path.resolve(__dirname, 'secret-folder', dirEntry.name).replace(dirEntryExtension, '')
          );
          console.log(`${dirEntryName} - ${dirEntryExtension.slice(1)} - ${data.size}b`);
        }
      );
    }
  });
});
