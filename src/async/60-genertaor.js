// 异步编程的解决方案: 回调, promise, generator
{
  // genertaor 基本定义
  let tell = function*() {
    yield 'a';
    yield 'b';
    return 'c';
  };

  // 返回 iterator 接口
  let k = tell();

  // console.log(k.next()); // {value: "a", done: false}
  // console.log(k.next()); // {value: "b", done: false}
  // console.log(k.next()); // {value: "c", done: true}
  // console.log(k.next()); // {value: undefined, done: true}
}

{
  let obj = {};
  obj[Symbol.iterator] = function*() {
    yield 1;
    yield 2;
    yield 3;
  };

  for (let value of obj) {
    // console.log(value); // 1 2 3 
  }
}
// 状态机
{
  let state = function*() {
    while (1) {
      yield 'A';
      yield 'B';
      yield 'C';
    }
  };
  let status = state();
  // console.log(status.next()); // A
  // console.log(status.next()); // B
  // console.log(status.next()); // C
  // console.log(status.next()); // A
  // console.log(status.next()); // B
}

// async 与上例相同
// {
  // let state=async function (){
  //   while(1){
  //     await 'A';
  //     await 'B';
  //     await 'C';
  //   }
  // }
  // let status = state();
  // console.log(status.next());
  // console.log(status.next());
  // console.log(status.next());
  // console.log(status.next());
  // console.log(status.next());
// }

// 实例1 抽奖
{
  let draw = function(count) {
    console.info(`剩余 ${count} 次`);
  };
  let residue = function*(count) {
    while (count > 0) {
      count--;
      yield draw(count);
    }
  };
  let star = residue(5);
  let btn = document.createElement('button');
  btn.id = 'start';
  btn.textContent = '抽奖';
  document.body.appendChild(btn);
  document.getElementById('start').addEventListener('click', ()=>star.next(), false);
}

{
  // 长轮询
  let ajax = function*() {
    yield new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve({ code: 0 });
      }, 200);
    });
  };

  let pull = function() {
    let generator = ajax();
    let step = generator.next();
    step.value.then(function(d) {
      if (d.code != 0) {
        setTimeout(function() {
          console.log('wait');
          pull();
        }, 100);
      } else {
        console.info(d);
      }
    });
  };

  // pull();
}
