# 노드 내장 객체

노드는 기본적인 내장 객체와 내장 모듈을 제공하므로 따로 설치하지 안항도 바로 사용가능하다.

### global

브라우저의 window와 같은 전역 객체  
모든 파일에서 접근가능 하며 window.open에서 window 생략 후 open만으로 호출 가능한 것 처럼 global도 생략가능

globalA.js
```js
module.exports = () => global.message
```

globalB.js
```js
const A = require('./globalA)
global.message = 'hello'

console.log(A()) //hello 출력
```

### console 

global 객체에 포함되어 있으며, 보통 디버깅을 위해 사용한다. - console.js 참고
- console.time(레이블): console.timeEnd(레이블)과 대응되어 같은 레이블을 가진 time과 timeEnd사이의 시간을 측정한다.
- console.log(내용): 평범한 로그를 콘솔에 표시
- console.error(에러 내용): 에러를 콘솔에 표시
- console.dir(객체, 옵션): 객체를 콘솔에 표시할때 사용
  - colors 옵션 : true로 하면 콘솔에 색이 추가된다. 
  - depth 옵션 : 객체를 몇 단계까지 보여줄지를 결정. 기본값은 2
- console.trace(레이블): 에러가 어디서 발생했는지 추적할 수 있게 해준다

### 타이머 - timer.js 참고
타이머 기능 제공하는 함수 setTimeout, setInterval, setImmediate는 노드에서 window 대신 global에 들어있다.
다음 타이머 함수들은 아이디를 반환한다.
- setTimeout(callback, millis) : 주어진 millis 이후에 callback 실행
- setInterval(callback, millis) : 주어진 밀리초마다 callback를 반복 실행
- setImmediate(callback) : callback 즉시 실행

타이머 함수가 반환한 아이디를 사용하여 타이머를 취소할 수 있다.
- clearTimeout(아이디) : setTimeout을 취소
- clearInterval(아이디) : setInterval을 취소
- clearImmediate(아이디) : setImmediate를 취소

### __filename, __dirname - filename.js 참고
- __filename : 현재 파일 경로 확인
- __dirname : 현재 디렉터리 경로 확인