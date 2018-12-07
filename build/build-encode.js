const fs = require('fs-extra');
const path = require('path');
const config = require('../src/config');

function template(fontName, ttf) {
  return `@font-face {
  font-style: normal;
  font-weight: normal;
  font-family: '${fontName}';
  src: url('${ttf}') format('truetype');
}
`;
}

module.exports = function encode(ttf, srcDir) {
  const ttfBase64 = fs.readFileSync('../src/' + ttf, 'base64');
  fs.writeFileSync(
    path.join(srcDir, 'encode.less'),
    template(config.name, `data:font/ttf;base64,${ttfBase64}`)
  );
};
