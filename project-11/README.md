# mysql 연동

### 테이블 생성
SCHEMA - nodejs  
상세한 SQL은 nodejs.sql 파일 참고

### sequelize 설치 - [참고](https://sequelize.org/v5/index.html)
sequelize는 ORM 라이브러리이다.  
```bash
$ express project-11 --view=pug

$ cd project-11
$ npm i # npm 모듈 설치

$ npm i sequelize mysql2 # mysql과 연동하기 위한 sequelize orm설치
$ npm i -g sequelize-cli # sequelize 커맨드 사용
$ sequelize init
```
### sequelize 사용
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
### express와 sequelize 연결
sequelize를 통해 express와 mysql을 연결해야한다.  
app.js에서 추가해준다.
```js
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sequelize = require('./models').sequelize; //require('./models')는 require('./models/index.js')와 동일

var app = express();
sequelize.sync(); //호출시 mysql과 연동
```
### sequelize 모델 선언
User와 Comment 테이블에 연결하기 위한 모델을 정의한다.  
모델명을 user와 comment라고 하면 tableName 옵션 생략시 실제 users와 comments 테이블(모델명 + s)과 매핑되며,  
모델의 프로퍼티가 createdAt이면 실제 created_at 컬럼과 매핑된다.  
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
    //tableName: 'BBBAAA' //tableName 옵션으로 매핑할 테이블을 직접 선언할 수도 있다
  });
};
```

**models/comment.js**
```js
//commenter 컬럼은 index.js 관계 매핑에 사용되므로 여기서 매핑하지 않음
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

모델을 생성했으면 models/index.js와 연결한다.  
**models/index.js**
```js
//...
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//모델 연결
db.User = require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

// 1:N 관계 정의
db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });

module.exports = db;
```
### sequelize DB 커넥션 설정
config 폴더 안의 config.json에서 db커넥션 정보를 수정한다.  
개발, 테스트, 운영용도로 나누어져 있으니 환경에 맞춰서 설정한다.  
  
`process.env.NODE_ENV`가 development, test, production값일때 각각의 속성이 적용된다.

```json
{
  "development": {
    "username": "nodejs",
    "password": "123123",
    "database": "nodejs",
    "host": "192.168.0.14",
    "dialect": "mysql"
  },
//...
}
```

### sequelize 관계 정의 하기

#### 1 대 N
1이 되는 부분은 hasMany로 N이 되는 부분은 belongsTo로 1대상에 매핑한다.
```js
// 1:N 관계 정의 - foreignKey 값은 User의 commenter 컬럼이다. sourceKey와 targetKey 값은 User의 id 컬럼 값이다.
db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
```

#### 1 대 1

```js
// 1:1 관계 정의 - foreignKey 값은 Info의 user_id 컬럼이다. sourceKey와 targetKey 값은 User의 id 컬럼 값이다.
db.User.hasOne(db.Info, { foreignKey: 'user_id', sourceKey: 'id' });
db.Info.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });
```

#### N 대 M
게시글 하나에 태그가 여러개 올 수 있고 태그 하나에 게시글이 여러게 올 수 있다.
```js
// PostHashTag를 통한 다대다 조인
db.Post.belongsToMany(db.HashTag, {through: 'PostHashTag'})
db.HashTag.belongsToMany(db.Post, {through: 'PostHashTag'})
```

다대다 조인에 대해 데이터를 다음과 같이 가져올수 있다  
다음은 HashTag 테이블의 해시태그를 통해 게시물을 찾는 코드다
```js
async (req, res, next) => {
  const tag = await Hashtag.find({where: {title: '노드'}})
  const posts = await tag.getPosts()
}
```

다대다 관계를 설정할 수도 있다.
```js
async (req, res, next) => {
  const tag = await Hashtag.find({where: {title: '노드'}})
  await tag.addPosts(3) 
}
```


### CRUD - INSERT

```js
// INSERT INTO nodejs.users(name, age, married, comment) values('zero', 24, 0, '자기소개1')
const { User } = require('../models')
User.create({
  name: 'zero',
  age: 24,
  married: false,
  comment: '자기소개1'
})
```

### CRUD - SELECT
```js
// INSERT INTO nodejs.users(name, age, married, comment) values('zero', 24, 0, '자기소개1')
const { User, Sequelize: { OP } } = require('../models')
User.findAll({}) // select * from nodejs.users

User.findOne({}) // select * from nodejs.users limit 1

User.findAll({ // select name, married from nodejs.users
  attributes: ['name', 'married']
}) 

// select name, age from nodejs.users where married = 1 and age > 30
User.findAll({
  attributes: ['name', 'age'],
  where: {
    married: 1,
    age: { [Op.gt]: 30 }
  }
})

// select id, name from users where married = 0 OR age > 30
User.findAll({
  attributes: ['id', 'name'],
  where: {
    [Op.or]: [{married: 0}, {age: {[Op.gt]: 30}}]
  }
})

// select id, name from users order by age desc;
User.findAll({
  attributes: ['id', 'name'],
  order:[['age', 'DESC']]
})

// select id, name from users order by age desc limit 1;
User.findAll({
  attributes: ['id', 'name'],
  order:[['age', 'DESC']],
  limit: 1
})

// select id, name from users order by age desc limit 1 offset 1;
User.findAll({
  attributes: ['id', 'name'],
  order:[['age', 'DESC']],
  limit: 1,
  offset: 1
})
```

### CRUD - UPDATE
```js
//update nodejs.users set comment = '바꿀내용' where id = 2
User.update({
  comment: '바꿀 내용',
}, {
  where: {id: 2}
})
```

### DELETE FROM nodejs.users where id = 2
```js
User.destroy({
  where: {id: 2}
})
```

