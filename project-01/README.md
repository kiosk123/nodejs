# 코드 모듈화 하기

특정한 기능의 코드를 한곳에 모아 파일로 만든 다음 모듈로서 재활용 가능  
여기서는 ES5 스타일의 모듈 불러오고 내보내기를 작성함

#### var.js

```js
const odd = '홀수입니다.'
const even = '짝수입니다.'

// odd, even 변수를 다른 모듈에서 참조할 수 있게 함
module.exports = {
    odd,
    even
}
```

#### func.js
```js
const {odd, even} = require('./var') // 모듈 import

const checkOddOrEven = (num) => {
    if (num % 2 === 0) {
        return odd;
    }
    return even;
}

module.exports = checkOddOrEven
```

위 코드를 ES6로 작성할 경우 다음과 같음  
파일명을 func.js -> func.mjs로 변경후  
실행시 node --experimental-modules var.mjs 형태로 실행

```js
import {odd, even} from './var.mjs' // 모듈 import

const checkOddOrEven = (num) => {
    if (num % 2 === 0) {
        return odd;
    }
    return even;
}

export default checkOddOrEven
```

#### index.js
```js
const {odd, even} = require('./var')
const checkNumber = require('./func') // 모듈에서 값을 불러 올때 변수 이름을 다르게 지정가능

const checkStringOddOrEven = (str) => {
    if (str.length % 2 === 0) {
        return odd
    }
    return even
}

console.log(checkNumber(10))
console.log(checkStringOddOrEven('hello'))
```

#### 코드 실행
```bash
$ node index

# ES 방식 모듈 실행
$ node --experiment-modules index.mjs
```



