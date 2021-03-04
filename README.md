# nodeJS 연습

## 개발도구 
- vscode
  - Prettier 설치
  - node-snippets 설치
  - Node.js Modules Intellisense 설치
  - npm Intellisense
## 목록
- 01 - 코드 모듈화 하기 
- 02 - 노드 내장 객체
- 03 - 노드 내장 모듈
- 04 - 파일 시스템 접근
- 05 - 이벤트
- 06 - 예외처리
- 07 - http 모듈로 웹서버 만들기

## nodeJS 설치 - 우분투
```bash
$ sudo apt-get update
$ sudo apt-get install -y build-essential
$ sudo apt-get install curl

$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash --
$ sudo apt-get install -y nodejs

# nodejs 버전 확인
$ node -v

# npm 버전 확인
$ npm -v
```

## 바이너리 파일을 이용한 nodejs 설치 - 리눅스
1. 바이너리 파일을 원하는 디렉터리에 압축푼다. - 여기서는 **/usr/local/lib/nodejs** 품
```bash
$ sudo mkdir -p /usr/local/lib/nodejs
$ sudo tar -xJvf node-v14.16.0-linux-x64.tar.xz -C /usr/local/lib/nodejs 
```

2. **~/.profile**에 환경 변수를 추가한다.
```
VERSION=v14.16.0
DISTRO=linux-x64
export PATH=/usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin:$PATH
```

3. **~/.profile**을 반영한다.
```
$ . ~/.profile
```

4. 2번에서 설정하는 환경변수 방식 대신에 심볼릭 링크로 설정하는 방식도 고려할 수 있다
```
$ sudo ln -s /usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin/node /usr/bin/node

$ sudo ln -s /usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin/npm /usr/bin/npm

$ sudo ln -s /usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin/npx /usr/bin/npx
```

5. 제대로 설치되었는지 버전 확인한다.
```
$ node -v
$ npm version
$ npx -v
```

## npm 버전 업데이트
```bash
$ npm install -g npm
```

## 자바스크립트 파일 실행하기
```bash
$ node <javascript 파일명> # 확장자 .js는 생략가능

$ node src/helloworld
```

