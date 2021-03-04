# 이벤트 - evnet.js
스트림에서 다음과 같이 on('이벤트명', 콜백)을 사용했다.  
특정 이벤트가 발생했을 때 콜백을 호출하도록 이벤트를 등록한 것이다.

```js
const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
const data = [];

readStream.on('data', (chunk) => {
  data.push(chunk);
  console.log('data :', chunk, chunk.length);
});

```

이벤트를 또한 직접 만들고 호출하고 삭제할 수 있다.