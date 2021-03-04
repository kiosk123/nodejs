# 쿠키와 세션

## 쿠키 생성 후 브라우저에 응답 - cookie.js
```js
const http = require('http')

const parseCookies = (cookie = '') => 
    cookie
    .split(';')
    .map(v => v.split('='))
    .map(([k, ...vs]) => [k, vs.join('=')])
    .reduce((acc, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v)
        return acc
    }, {})       


http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie)
    console.log(req.url, cookies)
    res.writeHead(200, {'Set-Cookie': 'mycookie=test'}) //쿠키생성
    res.end('Hello Cookie')
})
.listen(8082, () => {
    console.log('8082에서 서버 대기 중입니다.')
})
```

## 쿠키 식별하기 - cookie2.js
- 쿠키 옵션 - 옵션 간은 ;으로 구분한다.
  - 쿠키명=쿠키값 : 기본적인 쿠키 값
  - Expires=날짜 : 만료기한 날짜 기본값은 클라이언트가 종료될때 까지
  - Max-age=초 : 만료기한 초가 지나면 쿠키 제거 Expires보다 우선
  - Domain=명 : 쿠키가 전송될 도메인을 특정. 기본값은 현재 도메인
  - Path=URL : 쿠키가 전송될 URL을 특정. 기본값은 '/'이고 모든 URL에 쿠키를 전송할 수 있음
  - Secure : HTTPS일 경우에만 쿠키 전송
  - HttpOnly : 설정시 자바 스크립트에서 쿠키에 접근 불가. 쿠키 조작을 방지하기 위해 설정하는 것을 권장


## 쿠키 개선안 (세션 아이디 사용하기) - cookie3.js
cookie2.js는 쿠키가 노출되어 있고, 쿠키가 조작될 위험도 있다. 민감한 정보는 쿠키에 넣어두는 것은 적절하지 않다.  
cookie3.js는 서버가 사용자 정보를 관리하도록 한다.  
쿠키에 이름을 담아서 보내는 대신, randomInt라는 임의의 숫자를 보냈다  
  
cookie.session이 있고, 만료기한을 넘기지 않았다면 session 변수에서 사용자 정보를 가져와서 사용한다.  
  
사용한 코드는 보안에 취약하므로 개념을 익히는 용도로만 사용