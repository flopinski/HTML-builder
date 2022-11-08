const fs = require('fs'),
  path = require('path'),
  fsPromises = require('fs/promises'),

  stylesFolder = path.resolve(__dirname, 'styles'),
  resultFolder = path.resolve(__dirname, 'project-dist'),
  assetsFolder = path.resolve(__dirname, 'assets'),
  assetsFolderNew = path.resolve(resultFolder, 'assets');

const buildHtml = async () => {
  const templateHtml = path.resolve(__dirname, 'template.html'),
    indexHtml = path.resolve(resultFolder, 'index.html'),
    componentsDirectory = path.resolve(__dirname, 'components');

  await fsPromises.copyFile(templateHtml, indexHtml);
  let documentHTML = await fsPromises.readFile(indexHtml, 'utf8');

  const writeStream = fs.createWriteStream(indexHtml),
    dirEntryList = await fsPromises.readdir(componentsDirectory, { withFileTypes: true });

  for (let dirEntry of dirEntryList) {
    const pathHtml = path.resolve(componentsDirectory, dirEntry.name),
      extName = path.extname(pathHtml);

    if (dirEntry.isFile() && extName === '.html') {
      const htmlName = path.parse(pathHtml).name,
        htmlFile = await fsPromises.readFile(pathHtml, 'utf8');

      documentHTML = documentHTML.replace(`{{${htmlName}}}`, htmlFile);
    }
  };
  writeStream.write(documentHTML);
}


const mergeStyles = async () => {
  const bundle = fs.createWriteStream(path.resolve(resultFolder, 'style.css')),
    stylesArr = await fsPromises.readdir(stylesFolder, { withFileTypes: true });

  stylesArr.forEach(styleFile => {
    const extName = path.extname(styleFile.name)
    if (styleFile.isFile() && extName === '.css') {
      let readableStream = fs.createReadStream(path.resolve(stylesFolder, styleFile.name));

      readableStream.pipe(bundle);
    }
  });
}

const copyDirectory = (filesFrom, filesDestination) => {

  fs.mkdir(filesDestination, { recursive: true }, () => { });

  fsPromises
    .readdir(filesFrom, { withFileTypes: true })
    .then(dirEntryList => {
      
      dirEntryList.forEach(dirEntry => {
      if (dirEntry.isFile()) {

        fs.copyFile(path.resolve(filesFrom, dirEntry.name), path.resolve(filesDestination, dirEntry.name), () => { });

      }

      else {
        copyDirectory(path.resolve(filesFrom, dirEntry.name), path.resolve(filesDestination, dirEntry.name))
      }

    })
  }
)}

const buildPage = async () => {
  await fsPromises.rm(path.resolve(__dirname, 'project-dist'), {force: true, recursive: true});
  await fsPromises.mkdir(path.resolve(__dirname, 'project-dist'), { recursive: true });
  await mergeStyles();
  await copyDirectory(assetsFolder, assetsFolderNew);
  await buildHtml();
}

buildPage()



