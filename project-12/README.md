# 몽고디비

## 몽고디비 설치
[mongodb 사이트](whttps://www.mongodb.com/try/download/communit)로 이동한다 - 커뮤니티 버전 다운로드  
설치할 운영체제 버전에 맞춰서 다운로드 한다.  
  
1. CentOS7 
- [참고1](https://rastalion.me/mongodb-4-2-%EC%84%A4%EC%B9%98-on-centos-7/)
- [참고2](https://akageun.github.io/2020/02/29/centos7-mongo4-install.html)
- [참고3](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/)
먼저 이미 설치된 버전의 mongodb가 있다면 삭제한다
```bash
$ sudo yum install -y mongodb-org
```
mongo db 리포지토리를 추가한다.
```bash
$ sudo vi /etc/yum.repos.d/mongodb-org-4.2.repo

[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc

# 몽고디비 설치 - 1 리포지토리 기준 안정화된 최신버전 다운
$ sudo yum install -y mongodb-org

# 몽고디비 설치 - 2 특정 버전 설치
$ sudo yum install -y mongodb-org-4.2.12 mongodb-org-server-4.2.12 mongodb-org-shell-4.2.12 mongodb-org-mongos-4.2.12 mongodb-org-tools-4.2.12

# 의도치 않은 몽고디비 버전 업그레이드 방지를 위해 다음과 같이 설정한다.
$ sudo vi /etc/yum.conf
exclude=mongodb-org,mongodb-org-server,mongodb-org-shell,mongodb-org-mongos,mongodb-org-tools

# 몽고디비 설정 값 수정
$ sudo vi /etc/mongod.conf

# network interfaces
net:
  port: 27017 # 몽고 DB 기본 포트
  bindIp: 0.0.0.0 # 0.0.0.0 으로 수정  

# mongodb 서비스 실행 및 활성화
$ sudo systemctl start mongod
$ sudo systemctl enable mongod

# 버전 확인
$ mongo -version

# 명령어 실행시 다음과 같은 에러가 발생시
Failed to unlink socket file /tmp/mongodb-27017.sock Operation not permitted

$ sudo rm -rf /tmp/mongodb-27017.sock
$ sudo systemctl start mongod
```

## mongodb 로그 확인
```bash
$ sudo tail -f /var/log/mongodb/mongod.log
```

## mongodb 실행
```bash
# 몽고디비 실행
$ mongo

# 몽고디비 버전 확인
> db.version()
```

## 관리자 계정 생성 및 로그인 기능 활성화
```bash
> use admin
> db.createUser({user: '아이디', pwd: '비밀번호', roles:['root']})
> exit

$ sudo systemctl stop mongod 
$ sudo vi /etc/mongod.conf

security: 
  authorization: enabled

$ sudo systemctl start mongod 
$ mongo admin -u '아이디' -p '비미리번호'
```

### mongodb compass통해 생성된 계정으로 연결하기 
```bash
mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]

# mongodb://아이디:비번@호스트주소:포트
mongodb://admin:1234@192.168.0.222:27017
```