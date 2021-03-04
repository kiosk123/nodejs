# cluster

싱글 스레드인 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈  
cluster 모듈을 설정하여 코어 하나당 노드 프로세스 하나가 돌아갈 수 있게 한다.  
단점은 세션을 공유하지 못하는 단점이 있으며 이는 Redis 서버를 도입하여 해결한다
  
클러스터에는 마스터 프로세스와 워크 프로세스가 있다.  
마스터 프로세스는 CPU갯수 만큼 워커 프로세스를 만들고 8086포트에서 대기한다.  
요청이 들어오면 워커 프로세스에 요청을 분배한다.  
  
워커 프로세스가 실질적인 일을 하는 프로세스이다.  
워커 프로세스의 개수 - 1 만큼 오류가 발생해도 서버가 정상 작동 할 수 있다  
종료된 워커 프로세스를 다시 켜면 오류가 발생해도 계속 버틸 수 있다.

```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`마스터 프로세스 아이디: ${process.pid}`);
    // CPU 개수만큼 워커를 생산
    for (let i = 0; i < numCPUs; i += 1) {
        cluster.fork();
    }
    // 워커가 종료되었을 때
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        console.log('code', code, 'signal', signal);
        // cluster.fork(); // 프로세스가 종료 되었을 때 새로운 워커 생성
    });
} else {
    // 워커들이 포트에서 대기
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Cluster!</p>');
        setTimeout(() => { // 워커 존재를 확인하기 위해 1초마다 강제 종료
            process.exit(1);
        }, 1000);
    }).listen(8086);

    console.log(`${process.pid}번 워커 실행`);
}
```