const fs = require('fs')

// 파일 읽기
fs.readFile('./data/data.txt', (err, data) => {
    if (err) {
        throw err
    }
    console.log(data) //<Buffer ed 8c 8c ec 9d bc ec 97 90 20 eb 8d b0 ec 9d b4 ed 84 b0 ea b0 80 20 ec 9e 88 ec 8a b5 eb 8b 88 eb 8b a4 2e>
    console.log(data.toString()) //파일에 데이터가 있습니다.
})

// 파일 쓰기
fs.writeFile('./data/write.txt', '글이 입력됩니다', (err, data) => {
    if (err) {
        throw err
    }
    fs.readFile('./data/write.txt', (err, data) => {
        if (err) {
            throw err
        }
        console.log(data.toString()) //글이 입력됩니다
    })
})