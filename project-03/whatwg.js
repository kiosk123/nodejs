/*
    searchParams: URLSearchParams {
      'page' => '3',
      'limit' => '10',
      'category' => 'nodejs',
      'category' => 'javascript' }
    searchParams.getAll(): [ 'nodejs', 'javascript' ]
    searchParams.get(): 10
    searchParams.has(): true
    searchParams.keys(): URLSearchParams Iterator { 'page', 'limit', 'category', 'category' }
    searchParams.values(): URLSearchParams Iterator { '3', '10', 'nodejs', 'javascript' }
    [ 'es3', 'es5' ]
    [ 'es6' ]
    []
    searchParams.toString(): page=3&limit=10&category=nodejs&category=javascript
*/
const { URL } = require('url');

const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
console.log('searchParams:', myURL.searchParams);
console.log('searchParams.getAll():', myURL.searchParams.getAll('category')); // 키에 해당하는 모든 값을 가져온다.
console.log('searchParams.get():', myURL.searchParams.get('limit')); // 키에 해당하는 첫번째 값만 가져온다
console.log('searchParams.has():', myURL.searchParams.has('page')); // 해당 키가 있는지 없는지를 검사한다.

console.log('searchParams.keys():', myURL.searchParams.keys()); // searchParams의 모든키를 iterator 객체로 가져온다
console.log('searchParams.values():', myURL.searchParams.values()); // searchParams의 모든 값을 iterator 객체로 가져온다.

myURL.searchParams.append('filter', 'es3'); // 해당(키, 값)을 추가한다. 같은 키의 값이 있다면 유지하고 하나 더 추가한다.
myURL.searchParams.append('filter', 'es5');
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.set('filter', 'es6'); // 같은 키의 값들을 모두 지우고 새로 추가한다.
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.delete('filter'); // 해당 키를 제거한다.
console.log(myURL.searchParams.getAll('filter'));

console.log('searchParams.toString():', myURL.searchParams.toString()); //searchParams 객체를 다시 문자열로 만든다
myURL.search = myURL.searchParams.toString();