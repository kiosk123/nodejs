/**
 *  단방향 암호화 - bcrypt, scrypt 방식 추천 
 * */ 
const crypto = require('crypto');

// createHash(해시알고리즘).update(변환할 데이터).digest(인코딩 알고리즘) 
// 해시 알고리즘 - md5(비권장), sha1(비권장), sha256, sha512
// 인코딩 알고리즘 - base64, hex, latin1
console.log('base64:', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex:', crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64:', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));

// pbkdf2 알고리즘 - salt 문자열을 붙인 후 해시 알고리즘 반복 적용
crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString('base64');
  console.log('salt:', salt);
  crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
    console.log('password:', key.toString('base64'));
  });
});

const salt = crypto.randomBytes(64).toString('base64') //64비트 문자열을 생성

// 비밀 번호, salt, 반복횟수, 출력바이트, 해시 알고리즘 
// 다음 코드는 'sha512'변환과정을 10만번 반복
crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
    const cipherpass = key.toString('base64')
    console.log('cipher pass :', cipherpass)
})


// bcrypt 알고리즘 - npm install bcrypt
const bcrypt = require('bcrypt')

// sync 암호화
const password = '1234'
const bcryptpass = bcrypt.hashSync(password, 10) // sync
console.log("bcrypt pass :", bcryptpass)

// async
bcrypt.hash(password, 10, (err, bcryptAsyncPass) => {
  // async callback
  console.log('bcryptAsyncPass :', bcryptAsyncPass)
})

// 비밀번호 비교
const isequal = bcrypt.compareSync(password, bcryptpass) // sync
console.log(isequal)

// async
bcrypt.compare(password, bcryptpass, (err, passIsEqual) => {
    // async callback
    console.log(passIsEqual)
})

/**
 * 양방향 암호화
 */