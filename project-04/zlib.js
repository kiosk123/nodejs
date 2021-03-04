const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./readme4.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./readme4.txt.gz');

// 데이터 stream을 하면서 gzip으로 압축후 파일로 쓰여짐
// 확장자가 .gzip인 파일이 생김
readStream.pipe(zlibStream).pipe(writeStream);