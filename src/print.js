// export default
console.log('Updating print.js....')
export function printMe() {
  h5.innerHTML = [
    'Hello webpack4!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n')
}

export function ui () {
  $('body').css('background', '#eee');
}

// var num1 = 1;
// var num2 = 1;
// for (var i = 0; i < 10; i++) {
//   console.log(num1, num2);
//   [num1, num2] = [num2, num1 + num2]
// }

// let num2 = 0;
// let max2 = 10;
// let incrementNumber2 = function () {
//   console.log(num2++);
//   //如果执行次数未达到 max2 设定的值, 则设置另一次超时调用
//   if (num < max2) {
//     console.log(num)
//     setTimeout(incrementNumber2, 500);
//   } else {
//     console.log('Done');
//   }
// }
// setTimeout(incrementNumber, 500);
