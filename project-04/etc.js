
const fs = require('fs');

/**
 * 파일 만들기
 * 파일 읽고 쓰기
 * 파일명 바꾸기
 */
// access(경로, 옵션, 콜백) - 폴더나 파일에 접근할 수 있는 지 여부 체크,
// F_OK 파일 존재 여부, R_OK 읽기 권한여부, W_OK는 쓰기 권한여부 체크
fs.access('./folder', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if (err) {
        if (err.code === 'ENOENT') { //ENOENT 파일/폴더가 없을 때의 에러 코드
            console.log('폴더 없음');

            // 폴더를 만든다
            fs.mkdir('./folder', (err) => {
                if (err) {
                    throw err;
                }
                console.log('폴더 만들기 성공');

                // 파일이 없다면 파일을 생성한뒤 아이디(fd)를 가져온다.
                // 가져온 아이디를 사용해 fs.read()나 fs.write()를 사용해 읽거나 쓸 수 있다.
                // 두번째 인자는 어떤 동작을 할 것 인지다 쓰려면 w, 읽으려면 r, 기존 파일에 추가시 a이다 
                /**
                 *  'r' - 읽기로 열기. 파일이 존재하지 않으면 에러발생.
                    'r+' - 읽기/쓰기로 열기. 파일이 존재하지 않으면 에러발생.
                    'w' - 쓰기로 열기. 파일이 존재하지 않으면 만들어지고, 파일이 존재하면 지우고 처음부터 씀.
                    'w+' - 읽기/쓰기로 열기. 파일이 존재하지 않으면 만들어지고, 파일이 존재하면 처음부터 씀.
                    'a' - 추가 쓰기로 열기. 파일이 존재하지 않으면 만들어짐.
                    'a+' - 파일을 읽고/추가쓰기모드로 열기. 파일이 존재하지 않으면 만들어짐.
                 */
                fs.open('./folder/file.js', 'w', (err, fd) => {
                    if (err) {
                        throw err;
                    }
                    console.log('빈 파일 만들기 성공', fd);
                    const data = 'const num = 10'


                    // fs.write 사용하여 파일 읽기
                    let buffer = new Buffer.from('GeeksforGeeks: A computer science portal for geeks\n');
                    fs.write(fd, buffer, 0, buffer.length, null, function (err, writtenbytes) {
                        if (err) {
                            console.log('Cant write to file');
                        } else {
                            console.log(writtenbytes + ' characters added to file');
                        }
                    })


                    buffer = new Buffer.alloc(1024);
                    fs.open('./folder/file.js', 'r+', function (err, fd) {
                        if (err) {
                            return console.error(err);
                        }

                        console.log("Reading the file");

                        // fs.read를 사용하여 파일 읽기
                        fs.read(fd, buffer, 0, buffer.length, 0, function (err, bytes) {
                            if (err) {
                                console.log(err);
                            }

                            if (bytes > 0) {
                                console.log(buffer.slice(0, bytes).toString());
                            }
                            console.log(bytes + " bytes read");

                            // 파일을 닫는다
                            fs.close(fd, function (err) {
                                if (err) {
                                    console.log(err);
                                }

                                console.log("File closed successfully");
                            });
                        });
                    });

                    //파일의 이름을 바꾼다
                    fs.rename('./folder/file.js', './folder/newfile.js', (err) => {
                        if (err) {
                            throw err;
                        }
                        console.log('이름 바꾸기 성공');
                    });
                });
            });
        } else {
            throw err;
        }
    } else {
        console.log('이미 폴더 있음');
    }
});

/**
 * 폴더 내용 확인 및 파일과 폴더 삭제
 */
// 폴더 안의 파일과 폴더를 확인한다.
fs.readdir('./folder', (err, dir) => {
    if (err) {
        throw err;
    }
    console.log('폴더 내용 확인', dir);

    // 파일을 삭제한다. 삭제할 파일이 없다면 에러 발생
    fs.unlink('./folder/newFile.js', (err) => {
        if (err) {
            throw err;
        }
        console.log('파일 삭제 성공');

        // 폴더를 삭제한다.
        fs.rmdir('./folder', (err) => {
            if (err) {
                throw err;
            }
            console.log('폴더 삭제 성공');
        });
    });
});

/**
 * 파일 복사 - 노드 8.5 부터 사용가능한 API
 */
fs.copyFile('readme4.txt', 'writeme4.txt', (error) => {
    if (error) {
        return console.error(error);
    }
    console.log('복사 완료');
});