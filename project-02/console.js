/*
    평범한 로그입니다 쉼표로 구분해 여러값을 찍을 수 있습니다.
    abc 1 true
    에러 메시지는 console.error에 담으시오
    { outside: { inside: { key: 'value' } } }
    { outside: { inside: [Object] } }
    시간 측정: 3.213ms
    Trace: 에러 위치 추적
        at b (C:\Users\HeoJongTae\Desktop\nodejs\project-02\console.js:27:13)
        at a (C:\Users\HeoJongTae\Desktop\nodejs\project-02\console.js:31:5)
        at Object.<anonymous> (C:\Users\HeoJongTae\Desktop\nodejs\project-02\console.js:34:1)
        at Module._compile (internal/modules/cjs/loader.js:1063:30)
        at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
        at Module.load (internal/modules/cjs/loader.js:928:32)
        at Function.Module._load (internal/modules/cjs/loader.js:769:14)
        at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
        at internal/main/run_main_module.js:17:47
    (node:15368) Warning: No such label '전체시간' for console.timeEnd()
    (Use `node --trace-warnings ...` to show where the warning was created)
*/

const str = 'abc'
const num = 1
const bool = true
const obj = {
    outside: {
        inside: {
            key: 'value'
        }
    }
}

console.time('전체 시간')
console.log('평범한 로그입니다 쉼표로 구분해 여러값을 찍을 수 있습니다.')
console.log(str, num, bool)
console.error('에러 메시지는 console.error에 담으시오')

console.dir(obj, {colors: false, depth: 2})
console.dir(obj, {colors: true, depth: 1})

console.time('시간 측정')
for (let i = 0; i < 100000; i++) {
    continue
}
console.timeEnd('시간 측정')

const b = () => {
    console.trace('에러 위치 추적')
}

const a = () => {
    b()
}

a()
console.timeEnd('전체시간')