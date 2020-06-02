// export function square(x) {
//   return x * x;
// }

// export function cube(x) {
//   return x * x * x;
// }

function min(a, b) {
  return (b - a) * 3;
}

module.exports = {
  add: (...args) => {
    return args.reduce((prev, curr) => {
      return prev + curr;
    })
  },
  mul: (...args) => {
    return args.reduce((prev, curr) => {
      return prev * curr;
    })
  },
  cube: (x) => {
    return x * x * x;
  },
  square: (x) => {
    return x * x;
  },
  cover: (a, b) => {
    if (a > b) {
      return a - b
    } else if (a == b) {
      return a + b
    } else {
      return min(a, b);
    }
  },
  num1: n => parseInt(n),
  num2: n => Number(n)

}