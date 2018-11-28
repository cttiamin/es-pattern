// export function square(x) {
//   return x * x;
// }

// export function cube(x) {
//   return x * x * x;
// }

function min(a, b) {
  const c = 3;
  return (b-a) * c;
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
    if( a > b) {
      return a - b
    } else if (a == b) {
      return a + b
    } else {
      return min(a, b);
    }
  }
}