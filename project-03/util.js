const util = require('util');
const crypto = require('crypto');

// 함수 deprecate - (deprecated 대상 함수, 경고메시지) 
const dontUseMe = util.deprecate((x, y) => {
  console.log(x + y);
}, 'dontUseMe 함수는 deprecated되었으니 더 이상 사용하지 마세요!');
dontUseMe(1, 2);

// 콜백을 promise 패턴으로 변환 - 이것을 잉해서 aync/await 패턴가지 사용가능
const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
  .then((buf) => {
    console.log(buf.toString('base64'));
  })
  .catch((error) => {
    console.error(error);
  });