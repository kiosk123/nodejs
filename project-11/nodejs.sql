-- 사용자 정보 테이블
CREATE TABLE nodejs.users(
    id bigint unsigned NOT NULL AUTO_INCREMENT, -- 숫자 bigint, float, double
    name VARCHAR(20) NOT NULL, --  문자 varchar 가변길이, char 고정길이
    age INT UNSIGNED NOT NULL,
    married TINYINT NOT NULL, -- -127 ~ 128
    comment TEXT NULL, 
    created_at DATETIME NOT NULL DEFAULT NOW(), -- date, time, timestamp
    CONSTRAINT USERS_PK PRIMARY KEY(id),
    UNIQUE INDEX name_UNIQUE (name ASC) -- name 컬럼의 값은 유일해야하며, 오름차순으로 인덱싱하겠다는 의미
)
COMMENT='사용자 정보'
DEFAULT CHARSET=utf8
ENGINE=InnoDB;

-- 사용자 댓글 저장
CREATE TABLE nodejs.comments(
	id bigint unsigned not null auto_increment,
    commenter bigint unsigned not null,
    comment varchar(100) not null,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    CONSTRAINT COMMENTS_PK PRIMARY KEY(id),
    INDEX commenter_idx (commenter ASC),
    constraint COMMENTS_FK foreign key(commenter) references nodejs.users(id)
    on delete cascade
    on update cascade
)
COMMENT='댓글'
DEFAULT CHARSET=utf8
ENGINE=InnoDB;

-- 테스트 데이터
insert into nodejs.users(name, age, married, comment) values('zero', 24, 0, '자기소개1');
insert into nodejs.users(name, age, married, comment) values('nero', 32, 1, '자기소개2');

insert into nodejs.comments(commenter, comment) values(1, '안녕하세요. zero의 댓글입니다');