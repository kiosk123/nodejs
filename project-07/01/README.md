# 노드 서버 생성

### 이벤트 리스너를 가진 노드 서버 생성
```js
const http = require('http');

http.createServer((req, res) => {
  // 응답 처리.
})
```

### 요청 응답 기본
listen 메서드를 사용하여 클라이언트에게 공개할 포트 번호와 포트 연결 후 실행할 콜백을 선언한다.
```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
server.listen(8080, () => {
    console.log("서버가 실행됨")
})
```

listen(포트, 콜백) 대신에 이벤트 리스너를 대신 사용가능함
```js
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }) //헤더값을 설정한다.
    res.write('<h1>Hello Node!</h1>') // 클라이언트에 데이터를 보낸다
    res.end('<p>Hello Server!</p>') // 인자가 있다면 클라이언트에 인자를 데이터로 보내고 종료한다.
})

server.listen(8080)

server.on('listening', () => {
    console.log('서버 실행됨')
})

server.on('error', (error) => {
    console.error(error)
})
```

### 웹페이지 응답 - page.js