const fs = require('fs');

/**
 * 파일 읽기 스트림
 */
// 파일을 읽는 stream 메서드, { highWaterMark: 16 } 기본값 64 * 1024이며 16으로 설정시 16바이트로 나눠서 처리 
const readStream = fs.createReadStream('./data/readme3.txt', { highWaterMark: 16 });
const data = [];

// readStream에 이벤트 리스너를 붙여서 사용 'data', 'end', 'error'등이 있음
readStream.on('data', (chunk) => {
  data.push(chunk);
  console.log('data :', chunk, chunk.length);
});

readStream.on('end', () => {
  console.log('end :', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
  console.log('error :', err);
});

/**
 * 파일 쓰기 스트림
 */
// 파일을 쓰는 stream 메서드
const writeStream = fs.createWriteStream('./data/writeme2.txt');
writeStream.on('finish', () => {
  console.log('파일 쓰기 완료');
});

writeStream.write('이 글을 씁니다.\n');
writeStream.write('한 번 더 씁니다.');
writeStream.end(); // 파일에 데이터를 다 썼으면 end 호출하여 finish 이벤트를 발생시킨다.

/**
 * 파일 읽기 쓰리 스트림을 연결 (파이핑)
 */
const readStream2 = fs.createReadStream('./data/readme4.txt');
const writeStream2 = fs.createWriteStream('./data/writeme3.txt');
readStream2.pipe(writeStream2);