# mysql 연동

### 테이블 생성
SCHEMA - nodejs  
상세한 SQL은 nodejs.sql 파일 참고

### sequelize 설치
sequelize는 ORM 라이브러리이다.  
```bash
$ express project-11 --view=ejs

$ cd project-11
$ npm i # npm 모듈 설치

$ npm i sequelize mysql2 # mysql과 연동하기 위한 sequelize orm설치
$ npm i -g sequelize-cli # sequelize 커맨드 사용
$ sequelize init
```

`sequelize init` 명령후 config, models, migrations, seeder 폴더가 생성됨  
models 폴더 안의 index.js를 확인한다.  
**models/index.js**
```js
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```
sequelize-cli가 생성해주는 코드는 그대로 사용했는때 에러가 발생하고 필요없는 부분도 많으므로 다음과 같이 수정한다.
**models/index.js**
```js
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

mysql을 연결한다.