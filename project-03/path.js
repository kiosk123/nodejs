/**
 * 
    C:\Users\HeoJongTae\Desktop\nodejs\project-03>node path.js
    \
    ;
    -----------------------------------------------
    C:\Users\HeoJongTae\Desktop\nodejs\project-03
    .js
    path.js
    path
    -----------------------------------------------
    {
    root: 'C:\\',
    dir: 'C:\\Users\\HeoJongTae\\Desktop\\nodejs\\project-03',
    base: 'path.js',
    ext: '.js',
    name: 'path'
    }
    C\users\user\path.js

    C:\Users\HeoJongTae\Desktop\nodejs\project-03>node path.js
    \
    ;
    -----------------------------------------------
    C:\Users\HeoJongTae\Desktop\nodejs\project-03
    .js
    path.js
    path
    -----------------------------------------------
    {
    root: 'C:\\',
    dir: 'C:\\Users\\HeoJongTae\\Desktop\\nodejs\\project-03',
    base: 'path.js',
    ext: '.js',
    name: 'path'
    }
    C:\Users\HeoJongTae\Desktop\nodejs\project-03\path.js

    C:\Users\HeoJongTae\Desktop\nodejs\project-03>
    C:\Users\HeoJongTae\Desktop\nodejs\project-03>node path.js
    \
    ;
    -----------------------------------------------
    C:\Users\HeoJongTae\Desktop\nodejs\project-03
    .js
    path.js
    path
    -----------------------------------------------
    {
    root: 'C:\\',
    dir: 'C:\\Users\\HeoJongTae\\Desktop\\nodejs\\project-03',
    base: 'path.js',
    ext: '.js',
    name: 'path'
    }
    C:\Users\HeoJongTae\Desktop\nodejs\project-03\path.js
    C:Users\HeoJongTae\Desktop
    odejsproject-03path.js
    -----------------------------------------------
    true
    ..\..\..\..\..
    C:\Users\HeoJongTae\Desktop\users\tmp
    C:\tmp
 */
const path = require('path')

const string = __filename

console.log(path.sep) //경로 구분자
console.log(path.delimiter) // 환경변수 구분자

console.log('-----------------------------------------------')
console.log(path.dirname(string)) //파일이 위치한 폴더의 경로 
console.log(path.extname(string)) //파일의 확장자

console.log(path.basename(string)) // 확장자를 포함한 파일의 이름을 보여줌
console.log(path.basename(string, path.extname(string))) //파일 이름만 보고 싶으면 파일의 확장자를 두번째 파라미터로 넣는다

console.log('-----------------------------------------------')
console.log(path.parse(string)) //파일 경로를 root, dir, base, ext, name으로 분리
console.log(path.format({
    root: 'C:\\',
    dir: 'C:\\Users\\HeoJongTae\\Desktop\\nodejs\\project-03',
    base: 'path.js',
    ext: '.js',
    name: 'path'
  })) //parse한 객체를 파일 경로로 합침

console.log(path.normalize('C:\Users\\HeoJongTae/Desktop\nodejs\project-03\path.js')) // \ /혼용시 정상적인 경로로 반환

console.log('-----------------------------------------------')
console.log(path.isAbsolute(string)) // 절대경로 여부 반환
console.log(path.relative('C:\\Users\\HeoJongTae\\Desktop\\nodejs\\project-03', 'C:\\')) // relative(첫번째경로, 두번째경로)는 첫번째 경로에서 두번째 경로로 가는법 알려줌
console.log(path.join(__dirname, '..', '..', '/users', '.', '/tmp')) // 인자들을 하나의 경로로 합쳐줌 ..(상대경로), .(현위치)도 알아서 처리함
console.log(path.resolve(__dirname, '..', 'users', '.', '/tmp')) //join과 비슷하지만 /를 만나면 앞의 경로를 다 무시하고 절대경로로 인식한다.