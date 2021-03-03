/*
    new URL(): URL {
      href: 'http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor',
      origin: 'http://www.gilbut.co.kr',
      protocol: 'http:',
      username: '',
      password: '',
      host: 'www.gilbut.co.kr',
      hostname: 'www.gilbut.co.kr',
      port: '',
      pathname: '/book/bookList.aspx',
      search: '?sercate1=001001000',
      searchParams: URLSearchParams { 'sercate1' => '001001000' },
      hash: '#anchor'
    }
    url.format(): http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor
    ------------------------------
    url.parse(): Url {
      protocol: 'http:',
      slashes: true,
      auth: null,
      host: 'www.gilbut.co.kr',
      port: null,
      hostname: 'www.gilbut.co.kr',
      hash: '#anchor',
      search: '?sercate1=001001000',
      query: 'sercate1=001001000',
      pathname: '/book/bookList.aspx',
      path: '/book/bookList.aspx?sercate1=001001000',
      href: 'http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor'
    }
    url.format(): http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor
*/

const url = require('url');

const { URL } = url;
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL)); // url.format(객체) - url 객체를 다시 원래 상태로 조립한다.
console.log('------------------------------');
const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor'); // 주소를 분해한다
console.log('url.parse():', parsedUrl);
console.log('url.format():', url.format(parsedUrl)); // url 객체를 다시 원래 상태로 조립한다.