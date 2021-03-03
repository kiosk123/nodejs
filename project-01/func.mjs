import {odd, even} from './var.mjs' // 모듈 import

const checkOddOrEven = (num) => {
    if (num % 2 === 0) {
        return odd;
    }
    return even;
}

export default checkOddOrEven