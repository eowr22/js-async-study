const readFile = (filePath) => {
  const fs = require("fs");
  return new Promise((resolve, reject) => {
    fs.readFile(`${filePath}.json`, "utf8", (err, data) => {
      resolve(data);
      reject(
        new Error(
          "fs.readFile을 이용해 Promise화 시킨 readFile을 구현하여 보세요"
        )
      );
    });
  });
};

exports.readFile = readFile;
