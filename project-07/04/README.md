# https와 http2

## https
https 모듈은 웹 서버에 SSL 암호화를 추가한다.  
GET이나 POST 요청을 할때 오고 가는 데이터를 암호화해서 중간에 다른 사람이 요청을 가로채더라도 내용을 확인 할 수 없게 한다.
  
다음 코드는 https모듈을 사용하여 암호화를 적용한 코드다.  
https 모듈을 사용하기 위해 인증서가 필요하다.  
인증서는 인증기관에서 구입해야하거나. Let's Encrypt 기관에서 무료로 발급해주기도 한다.

- 참고 사이트
  - [5분안에 Node.js 로컬호스트에 HTTPS 적용하기](https://techlog.io/Server/HTTPS/5%EB%B6%84%EC%95%88%EC%97%90-node-js-%EB%A1%9C%EC%BB%AC%ED%98%B8%EC%8A%A4%ED%8A%B8%EC%97%90-https-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0/)
  - [Node.js SSL 인증서 설치/적용 가이드](https://www.sslcert.co.kr/guides/Node-js-SSL-Certificates-Install)
  - [Node.js 쉽게 https 적용 시키는 법](https://velog.io/@alskt0419/Node.js-%EC%89%BD%EA%B2%8C-https-%EC%A0%81%EC%9A%A9-%EC%8B%9C%ED%82%A4%EB%8A%94-%EB%B2%95)
```js
const https = require('https');
const fs = require('fs');

/*
  const option = {
    ca: fs.readFileSync('/etc/letsencrypt/live/등록 시킨 도메인 이름/fullchain.pem'),
    key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/등록 시킨 도메인 이름/privkey.pem'), 'utf8').toString(),
    cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/등록 시킨 도메인 이름/cert.pem'), 'utf8').toString(),
  };
 */
 
https.createServer({
  cert: fs.readFileSync('도메인 인증서 경로'),
  key: fs.readFileSync('도메인 비밀키 경로'),
  ca: [
    fs.readFileSync('상위 인증서 경로'),
    fs.readFileSync('상위 인증서 경로'),
  ],
}, (req, res) => {
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
}).listen(443, () => {
  console.log('443번 포트에서 서버 대기중입니다!');
});
```

### http2
기존 http/1.1 보다 개선된 http/2 프로토콜을 사용하게 해주는 모듈
  
다음은 http2 모듈을 적용한 https 서버임
```js
const http2 = require('http2');
const fs = require('fs');

http2.createSecureServer({
    cert: fs.readFileSync('도메인 인증서 경로'),
    key: fs.readFileSync('도메인 비밀키 경로'),
    ca: [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
    ],
}, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
.listen(443, () => {
    console.log('443번 포트에서 서버 대기 중입니다!');
});
```