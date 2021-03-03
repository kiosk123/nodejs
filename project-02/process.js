/**
 *  v14.15.4
    x64
    win32
    9880
    0.0450177
    C:\sw\nodejs\node.exe
    C:\Users\HeoJongTae\Desktop\nodejs\project-02
    { user: 31000, system: 46000 }
    {
    ALLUSERSPROFILE: 'C:\\ProgramData',
    APPDATA: 'C:\\Users\\HeoJongTae\\AppData\\Roaming',
    ..
    }
    C:\Users\HeoJongTae\AppData\Roaming
    nextTick
    immediate
    1
    2
    3
    4
    program exit
 */

console.log(process.version) // 설치된 노드의 버전
console.log(process.arch) // 프로세서 아키텍처 정보
console.log(process.platform) // 운영체제 플랫폼
console.log(process.pid) // 현재 프로세스 아이디
console.log(process.uptime()) // 프로세스가 시작된 후 흐른 시간 (초)
console.log(process.execPath) // 노드의 경로
console.log(process.cwd()) // 현재 프로세스가 실행되는 위치
console.log(process.cpuUsage()) // 현재 cpu 사용량
console.log(process.env) // 시스템의 환경변수
console.log(process.env.APPDATA) // 시스템 특정 환경변수에 접근

setImmediate(() => {
    console.log('immediate')
})

// setImmediate와 setTimeout보다 먼저 실행
process.nextTick(() => {
    console.log('nextTick')
})

let i = 1;
setInterval(() => {
    if (i === 5) {
        console.log('program exit')
        process.exit() // 실행 중인 노드 프로세스 종료 - 서버에서 사용시 멈추기 때문에 서버에서는 거의 사용안함 독립된 프로그램에서는 사용하는 경우 있음
    }
    console.log(i)
    i++
}, 1000)