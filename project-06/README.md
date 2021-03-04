# 예외처리
노드에서는 예외처리가 중요하다. 예외처리를 제대로 못하면 실행 중인 노드 프로세스를 멈추게 한다.  
그 이유는 노드는 멀티 스레드가 아닌 싱글 스레드 프로그램이기 때문이다.  

1. try catch를 이용한 예외 처리
에러가 발생할 것 같은 부분에 try catch문으로 감싼다.  
특히 다른 곳에서 throw 되는 에러를 처리할 때 필수다.
```js
setInterval(() => {
  console.log('시작');
  try {
    throw new Error('서버를 고장내주마!');
  } catch (err) {
    console.error(err);
  }
}, 1000);
```

2. 노드 자체에서 잡아주는 에러
```js
const fs = require('fs');

setInterval(() => {
  fs.unlink('./abcdefg.js', (err) => {
    if (err) {
      console.error(err);
    }
  });
}, 1000);
```

3. 예측 불가능한 에러처리

다음 코드는 process 객체에 uncaughtException 이벤트 리스너를 달아주었다.  
처리하지 못한 에러가 발생했을 때 이벤트 리스너가 실행되고 프로세스가 유지된다.  
uncaughtException 이벤트 발생 후 다음 동작이 제대로 동작하는지 보증하기 힘들기 때문에  
uncaughtException를 최후의 수단으로 활용하고, 에러 내용을 기록하는 정도록 사용하고 prcess.exit()로 프로세스를 종료하는 것이 좋다.
```js
process.on('uncaughtException', (err) => {
  console.error('예기치 못한 에러', err);
});

setInterval(() => {
  throw new Error('서버를 고장내주마!');
}, 1000);

setTimeout(() => {
  console.log('실행됩니다');
}, 2000);
```