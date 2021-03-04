/**
 *  이벤트 1
    이벤트 2
    이벤트 2 추가
    이벤트 3
    2
 */
const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1', () => {
    console.log('이벤트 1');
});
myEvent.on('event2', () => {
    console.log('이벤트 2');
});
myEvent.on('event2', () => {
    console.log('이벤트 2 추가');
});
myEvent.once('event3', () => {
    console.log('이벤트 3');
}); // 한 번만 실행됨

// emit('이벤트') - 이벤트를 실행한다.
myEvent.emit('event1'); // 이벤트 호출
myEvent.emit('event2'); // 이벤트 호출

myEvent.emit('event3');
myEvent.emit('event3'); // 실행 안 됨

myEvent.on('event4', () => {
    console.log('이벤트 4');
});
myEvent.removeAllListeners('event4');
myEvent.emit('event4'); // 실행 안 됨

const listener = () => {
    console.log('이벤트 5');
};
myEvent.on('event5', listener);
myEvent.removeListener('event5', listener); // 이벤트에 연결된 리스너 제거
myEvent.off('event5', listener)
myEvent.emit('event5'); // 실행 안 됨

console.log(myEvent.listenerCount('event2'));