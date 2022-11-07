const fs = require('fs'),
  path = require('path'),
  fsPromises = require('fs/promises'),
  readStylesFolder = path.resolve(__dirname, 'styles'),
  resultFolder = path.resolve(__dirname, 'project-dist'),
  bundle = fs.createWriteStream(path.resolve(resultFolder, 'bundle.css'));


const mergeStyles = async () => {
  const stylesArr = await fsPromises.readdir(readStylesFolder, { withFileTypes: true });
  stylesArr.forEach(styleFile => {
    const extName = path.extname(styleFile.name)

    if (styleFile.isFile() && extName === '.css') {
      let readableStream = fs.createReadStream(path.resolve(readStylesFolder, styleFile.name))

      readableStream.pipe(bundle)
    }
  });
}

mergeStyles()
