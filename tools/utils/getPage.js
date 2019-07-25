const helpers = require("./helpers");
const iterateFiles = require("./iterateFiles");
const path = require("path");

function getPages(projectName, callback) {
  const curRootPath = helpers.resolve(`../../view`);
  const productPath = curRootPath;
  const pageMap = {};
  return iterateFiles(productPath, (item, next) => {
    const relativePath = path.relative(curRootPath, item.fullPath);
    const fileInfo = path.parse(relativePath);
    const pathArr = fileInfo.dir.split(path.sep);
    const fileExt = path.extname(item.fullPath);
    let pageId = "";
    if (fileExt) {
      const key = fileExt.split('.')[1];
      pageId = `${pathArr.join("/")}/${fileInfo.name}`;
      if (!pageMap[pageId]) {
        pageMap[pageId] = {};
      }
      pageMap[pageId][key] = `${pageId}${fileInfo.ext}`;
    }

    if (typeof callback === "function") {
      pageMap[pageId].id = pageId;
      callback(pageMap[pageId]);
    }
    next();
  })
    .then(() => pageMap)
    .catch(err => {
      global.console.log(err);
    });
}

module.exports = getPages;
