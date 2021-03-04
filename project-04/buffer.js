const buffer = Buffer.from('저를 버퍼로 바꿔보세요'); //문자열을 버퍼로 바꾼다
console.log('from():', buffer); 
console.log('length:', buffer.length); //버퍼의 길이
console.log('toString():', buffer.toString()); //버퍼를 다시 문자열로 바꾼다

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
const buffer2 = Buffer.concat(array); //배열안에 든 버퍼를 하나로 합친다
console.log('concat():', buffer2.toString());

const buffer3 = Buffer.alloc(5); //alloc(바이트사이즈) - 바이트사이즈 만큼의 버퍼를 생성한다.
console.log('alloc():', buffer3);