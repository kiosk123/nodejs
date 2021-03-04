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
패키지를 설치하면 package.json의 dependencies에 기록된다.  
  
npm이 npm@5이하라면 `npm install [패키지이름] --save`로 실행하자
```bash
$ npm install express
```

패키지를 `npm install [패키지 이름] [패키지 이름] [패키지 이름] [...]` 명령을 사용하여 여러개 설치할 수 있다.
```bash
$ npm install morgan cookie-parser express-session
```

개발용 패키지를 설치할 수도 있다.  
실제 배포시에는 사용되지 않고 개발 중에만 사용되는 패키지들이며.  
`npm install --save-dev [패키지] [...]`로 설치한다.  
  
```bash
$ npm install --save-dev nodemon # 소스 코드가 바뀔 때마다 자동으로 노드를 재실행
```

전역 설치 옵션도 있는데.  
패키지를 현재 폴더의 node_modules에 설치하는 것이 아니라 npm이 설치되어 있는 폴더  
(윈도-C:\Users\사용자이름\AppData\Roaming\npm, 맥-/usr/lib/node_modules)에 설치한다.  
  
이 폴더의 경로는 보통 시스템 환경 변수에 등록되어 있으므로 전역 설치한 패키지는 콘솔의 커맨드로 사용할 수 있다.
```bash
# rimraf <디렉터리경로> 명령을 실행하면 rm -rf와 동일한 효과
$ npm install --global rimraf # 리눅스나 맥에서는 sudo 사용하여 명령 실행
```
package.json에 의존 패키지가 기록되지 않아 전역 설치가 기피되는 경우도 있는데  이럴 경우 다음과 같이 한다.
```bash
$ npm install --save-dev rimraf # 일반적으로 설치
$ npx rimraf node_modules # npx 명령을 이용해서 전역으로 실행
```

node_modules를 실수로 삭제해도 package.json이 있는 프로젝트 경로에서  `npm install`만 다시 입력하면 복구된다.

### 패키지 버전 이해하기
노드 및 노드 패키지 버전은 세자리로 이루어져 있다.  
SemVer 방식의 버전 넘버링을 따르른데.  
  
버전의 첫번째 자리는 major 버전이고. 주 버전이 0이면 초기 개발중이라는 뜻이다.  
1부터 정식 버전이라는 뜻이며. major 버전은 하위 호환이 안될 정도로 패키지의 내용이 수정되었을 때 올린다.
  
두번째 자리는 minor 버전이다 minor 버전은 하위 호환이 되는 기능 업데이트 시에 올린다. 1.5.0 -> 1.6.0 으로  
버전업시 아무 문제도 없어야 한다.  
  
세번째 자리는 patch 버전이다. 새로운 기능이 추가 되었기다기 보다. 기존 기능에 문제가 있어 수정했을 때 올린다.  
버전 1.5.0 -> 1.5.1로 버전업시 아무 문제도 없어야 한다.  
  
세 자리 버전 외에도 버전앞에 ^,~,>,< 같은 문자가 붙는데 이 문자는 버전에는 포함되지 않지만, 설치 또는 업데이트시  
어떤 버전을 설치해야 하는지 알려준다.  
  
^는 minor버전까지만 설치또는 업데이트 한다. `npm i express@^1.1.1`이라면 1.1.1 <= 버전 < 2.0.0 버전까지 설치된다.  
2.0.0은 설치되지 않는다. 1.x.x와 같이 표현도 가능하다.  
  
~는 patch 버전까지만 설치 또는 업데이트 한다. `npm i express@~1.1.1`이라면 1.1.1 <= 버전 < 1.2.0버전까지 설치된다.  
1.1.x와 같이 표현도 가능하다.  
  
>, <, >=, <=, = 초과 미만, 이상 이하, 동일을 뜻한다. `npm i express@>1.1.1`같이 사용할 경우 1.1.1버전보다 높은 버전이 설치된다.  
  
@latest는 항상 최신 버전의 패키지를 설치한다. x로도 표현가능하다.

### 기타 npm 명령어
[npm 사이트](https://docs.npmjs.com)에서 CLI 참고
```bash
$ npm outdated # 업데이트 할 수 있는 패키지가 있는 지 확인한다.

$ npm update [패키지명] # 패키지를 Wanted에 적힌 버전으로 업데이트 한다.

$ npm unistall [패키지명] # 패키지를 제거한다.

$ npm search [검색어] # 패키지를 검색한다.

$ npm info [패키지명] # 패키지의 세부정보를 파악하고자 할 때 사용한다.

$ npm adduser # npm 공식사이트에 가입한 계정으로 npm 로그인을 위한 명령어 npm에 패키지를 배포할 때 사용

$ npm whoami # npm에 로그인한 사용자 정보

$ npm logout # npm 로그아웃

$ npm version [버전] # package.json의 버전을 올려줌. 원하는 버전의 숫자를 넣는다
$ npm version 5.3.2 # 5.3.2 버전으로 올림
$ npm version minor # minor 버전을 1올림 major, patch도 사용가능

$ npm deprecated [패키지명][버전] [메시지] # 해당 패키지를 설치할 때 경고 메시지를 띄우게 하기 위한 명령어 (해당 버전 지원안할 때 사용)

$ npm publish # 자신이 만든 패키지를 배포할 때 사용
$ npm unpublish [패키지명] --force # 배포한 패키지를 제거할 때 사용. 24시간 이내에 배포한 패키지만 제거 가능
```