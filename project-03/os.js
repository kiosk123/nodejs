/**
 *  Operation System information ----------
    os.arch() : x64
    os.platform() : win32
    os.type() : Windows_NT
    os.uptime() : 82933
    os.hostname() : DESKTOP-0M7DK4J
    os.release() : 10.0.18363      
    path information ---------------
    os.homedir() : C:\Users\HeoJongTae
    os.tmpdir() : C:\Users\HEOJON~1\AppData\Local\Temp
    cpu information ----------------
    os.cpus() : [
    {
        model: 'Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz',
        speed: 1800,
        times: {
        user: 1801765,
        nice: 0,
        sys: 1581046,
        idle: 41882500,
        irq: 495750
        }
    },
    {
        model: 'Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz',
        speed: 1800,
        times: { user: 1020234, nice: 0, sys: 440718, idle: 43803937, irq: 11062 }
    },
    {
        model: 'Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz',
        speed: 1800,
        times: { user: 2283625, nice: 0, sys: 957281, idle: 42023984, irq: 11375 }
    },
    {
        model: 'Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz',
        speed: 1800,
        times: { user: 1155703, nice: 0, sys: 458796, idle: 43650390, irq: 6000 }
    },
    {
        model: 'Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz',
        speed: 1800,
        times: { user: 2049937, nice: 0, sys: 748703, idle: 42466250, irq: 9875 }
    },
    {
        model: 'Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz',
        speed: 1800,
        times: { user: 1217890, nice: 0, sys: 605765, idle: 43441234, irq: 6687 }
    },
    {
        model: 'Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz',
        speed: 1800,
        times: { user: 2216109, nice: 0, sys: 728343, idle: 42320406, irq: 9234 }
    },
    {
        model: 'Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz',
        speed: 1800,
        times: { user: 1303703, nice: 0, sys: 596109, idle: 43365062, irq: 5203 }
    }
    ]
    os.cpus().length : 8
    memory information -------------------
    os.freemem() : 11173314560
    os.totalmem() : 17052917760
 */

const os = require('os')

console.log('Operation System information ----------')
console.log('os.arch() :',os.arch())
console.log('os.platform() :',os.platform())
console.log('os.type() :', os.type())
console.log('os.uptime() :',os.uptime()) //운영체제 부팅 후 시간
console.log('os.hostname() :',os.hostname())
console.log('os.release() :',os.release())

console.log('path information ---------------')
console.log('os.homedir() :', os.homedir())
console.log('os.tmpdir() :', os.tmpdir())

console.log('cpu information ----------------')
console.log('os.cpus() :', os.cpus())
console.log('os.cpus().length :',os.cpus().length)

console.log('memory information -------------------')
console.log('os.freemem() :',os.freemem()) // 사용 가능한 메모리 정보
console.log('os.totalmem() :', os.totalmem())

console.dir(os.constants) // 각종 에러와 신호에 대한 정보가 있음 - (에러 발생시 EADDRINUSE, ECONNRESET같은 에러 코드등을 보여줌)