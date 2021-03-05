# Express 프레임워크

## Express 설치
Express-generator를 통해 프레임워크에 필요한 디렉터리 구조와 package.json을 만든다.  
Express-generator는 콘솔 명령어 이기 때문에 npm 전역 설치가 필요하다
```bash
$ npm i -g express-generator # npm install --global express-generator와 동일
```

Express-generator 설치 후 새로 프로젝트를 만들고자 하는 폴더로 이동해서  
express <프로젝트 이름>으로 새 익스프레스 프로젝트를 생성한다.  
  
여기서 --view=pug 옵션을 주게 되는데 Express는 기본적으로 Jade를 템플릿 엔진으로 설치한다.  
Jade는 Pug로 개명한지 오래되었고, 옛버전인 Jade 대신 최신 버전인 Pug를 설치하기 위해서 옵션을 준다
  
명령을 실행하게 되면 project-09 디렉터리 안에 Express 프레임워크를 사용하기 위한 기본 구조가 잡히게 된다.
```bash
$ express project-09 --view=pug
```

생성한 프로젝트 폴더 project-09로 이동 후 npm 모듈들을 설치한다.
```bash
$ cd project-09 && npm i
```

명령어 실행시 다음과 같은 디렉터리 구조로 변경되어 있으면 성공이다.  
![1.png](./img/1.png)  
- app.js
  - 핵심적인 서버 역할
- bin/www
  - 서버를 실행하는 스크립트
- public 폴더
  - 외부(브라우저 등 클라이언트)에서 접근 가능한 파일을 모아둔 곳 - 이미지, 자바스크립트, css파일등
- routes 폴더
  - 주소별 라우터들을 모아둔 곳 : 서버 로직 처리
- views 폴더
  - 템플릿 파일을 모아둔 곳 : 클라이언트 화면 처리

### 서버 실행
```bash
$ npm start
```