# mysql 연동

### 테이블 생성
SCHEMA - nodejs  
상세한 SQL은 nodejs.sql 파일 참고

### sequelize 설치 - [참고](https://sequelize.org/v5/index.html)
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

sequelize를 통해 express와 mysql을 연결해야한다.  
app.js에서 추가해준다.
```js
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sequelize = require('./models').sequelize; //require('./models')는 require('./models/index.js')와 동일

var app = express();
sequelize.sync(); //호출시 mysql과 연동
```

User와 Comment 테이블에 연결하기 위한 모델을 정의한다.  
sequelize는 기본적으로 모델이름은 단수형으로 테이블을 복수형으로 사용한다.  
  
sequelize는 id를 기본키로 연결하기 때문에 id컬럼은 적어줄 필요가 없다.  
sequelize.defind 메서드로 테이블명과 각 컬럼의 스펙을 입력한다.  
  
mysql 테이블과 컬럼 내용이 일치해야 정확하게 대응된다
**models/user.js**
```js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED, //zerofill 옵션을 사용하고 싶다면 DataTypes.INTEGER.UNSIGNED.ZEROFILL을 적어줌
      allowNull: false,
    },
    married: {
      type: DataTypes.BOOLEAN, //mysql tinyint
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('now()'),
    },
  }, { //테이블 옵션
    timestamps: false, //true일경우 createdAt과 updatedAt컬럼 추가
    //paranoid: true, //timestamp가 true일경우 사용가능 deletedAt 컬럼 추가 데이터삭제시 삭제날짜 입력되고 데이터 조회시 deletedAt이 null인 row만 조회 
  });
};
```

**models/comment.js**
```js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment', {
      comment: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('now()'),
      },
    }, {
      timestamps: false,
    });
  };
  ```
