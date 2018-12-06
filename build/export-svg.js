const path = require('path');
const shell = require('shelljs');
const svgDir = path.join(__dirname, '../assets/svg');
const sketch = path.join(__dirname, '../assets/icons.sketch');

// extract svg from sketch
// should install sketchtool first
// install guide: https://developer.sketchapp.com/guides/sketchtool/
shell.exec(
  `/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchtool export slices --formats=svg --overwriting=YES --save-for-web=YES --output=${svgDir} ${sketch}`
);
