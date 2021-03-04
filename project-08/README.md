# npm 패키지 매니저

npm은 노드에서 사용하는 패키지 매니저 (대체제로 페이스북에서 만든 yarn이 있음)

## package.json으로 패키지 관리
패키지를 하나씩 추가하면 패키지 수가 많아지고 패키지 마다 고유 버전이 있으므로 기록해 두어야한다.  
설치한 패키지 버전을 관리하는 파일이 package.json이다.  
  
프로젝트를 시작하기 전에 package.json부터 만들고 시작하는 것이 좋다.  
npm은 패키지 package.json을 만드는 명령을 제공한다.  
  
package.json 생성할 노드 프로젝트 폴더에서 다음 명령을 실행한다.
```bash
$ npm init
```

명령을 실행하면 다음의 정보를 입력하게 된다
```bash
package name: 패키지이름, package.json의 name 속성에 저장
version: 패키지버전
description: 패키지 설명
entry point: 자바스크립트 실행 파일 진입점. 보통 마지막으로 module.exports를 하는 파일 지정. package.json의 main속성에 저장
test command: 코드를 테스트 할 때 입력할 명령어. package.json scripts 속성 안의 test 속성에 저장
git repository: 코드를 저장해둔 git 저장소 주소. package.json의 repository 속성에 저장
keywords: npm 공식 홈페이지 https://npmjs.com 에서 패키지를 쉽게 찾을 수 있게 해줌. package.json의 keywords 속성에 저장
author: 
license: 패키지의 라이선스 (ISC, MIT, Apache, BSD, GPL 등)
```

생성된 package.json의 내용은 다음과 같다.  
scrips 부분은 npm 명령을 저장해 두는 부분이며 콘솔에서 `npm run [스크립트 명령어]`를 입력하면 해당 스크립트가 실행된다.  
예를 들어 `npm run test`를 입력하면 `"echo \"Error: no test specified\" && exit 1"`가 실행된다.  
  
그리고 start 명령어에 `node [파일명]`을 지정해 두고 `npm start`로 실행하기도 한다
```json
{
  "name": "project-08",
  "version": "1.0.0",
  "description": "npm test",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

### 패키지 설치하기
`npm install [패키지 이름]`으로 패키지를 설치한다.
```bash
$ npm install express
```
