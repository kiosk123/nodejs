const {odd, even} = require('./var') // 모듈 import

const checkOddOrEven = (num) => {
    if (num % 2 === 0) {
        return odd;
    }
    return even;
}

module.exports = checkOddOrEven