// 비동기식 처리
const fs = require('fs');

console.log('비동기 시작');
fs.readFile('./readme2.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('1번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('2번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('3번', data.toString());
});
console.log('비동기 끝');

// 동기식 처리

console.log('동기 시작');
let data = fs.readFileSync('./readme2.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('3번', data.toString());
console.log('동기 끝');


// 비동기 식으로 순서 유지하며 처리하기 - Promise나 aync, await로 변경하여 처리 추천
console.log('비동기 순서 유지 시작');
fs.readFile('./readme2.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('1번', data.toString());
  fs.readFile('./readme2.txt', (err, data) => {
    if (err) {
      throw err;
    }
    console.log('2번', data.toString());
    fs.readFile('./readme2.txt', (err, data) => {
      if (err) {
        throw err;
      }
      console.log('3번', data.toString());
      console.log('비동기 순서 유지 끝');
    });
  });
});

// 위 코드를 promise 패턴으로 처리
const util = require('util')
const readFile = util.promisify(fs.readFile)
readFile('./readme2.txt')
    .then(data => { 
        console.log("data 1 :", data.toString())
        return readFile('./readme2.txt')
    })
    .then(data => {
        console.log("data 2 :", data.toString())
        return readFile('./readme2.txt')
    })
    .then(data => {
        console.log("data 3 :", data.toString())
    })
    .catch(err => console.error(err))