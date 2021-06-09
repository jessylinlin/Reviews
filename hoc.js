//柯里化
function curry (fn, currArgs) {
  return function () {
    let args = [].slice.call(arguments);

    if (currArgs) {
      args = args.concat(currArgs);
    }

    if (args.length < fn.length) {
      return curry(fn, args)
    }

    return fn.apply(null, args)
  }
}
//实现add(1)(2)(3)
function add () {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  var _args = [].slice.call(arguments);

  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  var adder = function () {
    var _adder = function () {
      _args.push(...arguments);
      return _adder;
    };

    // 利用隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
      return _args.reduce((a, b) => a + b);
    }
    console.log(_adder)
    return _adder;
  }
  // return adder.apply(null, _args);
  return adder(..._args);
}

//实现add柯里化
function add () {
  let args = [].slice.call(arguments);
  var adder = function () {
    let currying = function () {
      if (arguments.length === 0) {
        return args.reduce((a, b) => a + b)
      } else {
        args.push(...arguments);
      }

      return currying
    }
  }

  return adder(arguments)

}


//compose
function compose () {
  let args = [].slice.call(arguments)

  return function (x) {
    if (args.length < 2) {
      return args[0] && args[0](x)
    } else {
      return funcs.reduce((a, b) => (...args) => a(b(...args)))
    }
  }
}

//数组扁平
function flat (arr) {
  let result = [];
  for (let val of arr) {
    if (!Array.isArray(val)) {
      result.push(val)
    } else {
      result = result.concat(flat(val))
    }
  }

  return result
}

//斐波拉契数列
function fib (n) {
  if (n === 1 || n === 2) return n

  return fib(n - 1) + fib(n - 2)
}

//fib缓存优化
function fib (n) {
  let res = [0, 1, 1]


  let _fib = function (n) {
    if (!res[n]) {
      res[n] = _fib(n - 1) + _fib(n - 2)
    }

    return res[n]
  }

  return _fib(n)
}

//apply
Function.prototype.myApply = function () {
  var context = arguments[0] || window;

  context.fn = this;
  let args = arguments[1] || [];
  let result = context.fn(args);
  delete context.fn;

  return result
}
//call
Function.prototype.myCall = function () {
  var context = arguments[0] || window;

  context.fn = this;
  var args = [...arguments].slice(1);
  var result = context.fn(args)
  delete context.fn
  return result
}

//bind
Function.prototype.myBind = function () {
  var _this = this;
  var context = arguments[0];
  var args = [].slice.call(arguments, 1);

  if (typeof _this !== 'function') {
    throw new TypeError("not a function")
  }

  var bound = function () {
    if (this instanceof bound) {
      return _this.apply(this, args.concat([].slice.call(arguments)))
    } else {
      return _this.apply(context, args.concat([].slice.call(argument)))
    }
  }

  //继承
  var f = function () { }

  f.prototype = _this.prototype;
  bound.prototype = new f()

  return bound
}

//setInterval
var mySetInterval = function (fn, a, b) {
  this.a = a;
  this.b = b;
  this.handler = -1;
  this.timer = 0;

  this.start = () => {
    this.handler = setTimeout(() => {
      fn();
      this.timer++;
      this.start();
    }, this.a + this.b * this.timer)
  }

  this.stop = () => {
    clearTimeout(this.handler)
    this.timer = 0
  }
}

class mySetInterval {
  constructor(fn, a, b) {
    this.fn = fn;
    this.a = a;
    this.b = b;
    this.timer = 0;
    this.handler = -1;
  }

  start () {
    this.handler = setTimeout(() => {
      this.fn();
      this.timer++;
      this.start()
    }, this.a + this.b * timer)
  }

  stop () {
    clearTimeout(this.handler);
    this.timer = 0
  }
}

//promise
var PENDING = 'pending';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';

class myPromise {
  constructor(executor) {
    //init
    this.status = PENDING
    this.value = undefined //resolved
    this.error = undefined //rejected

    //收集回调
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []


    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    let reject = (error) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.error = error
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then (onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.error)
    }

    if (this.status === PENDING) {
      this.onRejectedCallbacks.push(() => {
        onFulfilled(this.value)
      })

      this.onRejectedCallbacks.push(() => {
        onRejected(this.error)
      })
    }
  }
}


//async/await
const getData = () =>
  new Promise(resolve =>
    setTimeout(() => resolve("data")
      , 1000)
  )

async function test () {
  const data = await getData();
  console.log('data: ' + data)

  const data2 = await getData()
  console.log('data2: ' + data)


  console.log('success')
  return 'success-then'
}


function* testG () {
  // await被编译成了yield
  const data = yield getData()
  console.log('data: ', data);
  const data2 = yield getData()
  console.log('data2: ', data2);
  return 'success'
}

console.log('script start');

setTimeout(function () {
  console.log('timeout1');
}, 10);

new Promise(resolve => {
  console.log('promise1');

  setTimeout(() => console.log('timeout2'), 10);
  resolve();
}).then(function () {
  console.log('then1')
})

console.log('script end');

async function async1 () {
  console.log("async1 start");  //(2)        
  await async2();
  console.log("async1 end");   //(6)    
}
async function async2 () {
  console.log('async2');   //(3)     
}
console.log("script start");  //(1)      
setTimeout(function () {
  console.log("settimeout");  //(8)      
}, 0);
async1();
new Promise(function (resolve) {
  console.log("promise1");   //(4)         
  resolve();
}).then(function () {
  console.log("promise2");    //(7)    
});
console.log('script end');//(5)


//防抖
const debounce = function (func, delay) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

//节流
const throttle = function (func, delay) {
  let previous = 0;
  return function (...args) {
    let now = new Date().getTime();
    if (now - previous > wait) {
      func.apply(this, args)
      previous = now
    }
  }
}

var testobj = {
  id: 'abc',
  nested_obj: {
    f_f: 123
  },
  nested_arr: [1, 2],
  nested_arr_and_obj: [
    {
      a_a: 'aa',
      b_b: {
        c_c: 'cc'
      }
    },
    {
      d_d: false
    }
  ]
}


//下划线转驼峰
function camelString (str) {
  return str.replace(/_(\w)/g, (words, letter) => {
    return letter.toUpperCase()
  })
}

//递归遍历json
function camelObj (obj) {
  if (Array.isArray(obj)) {
    for (let val of obj) {
      camelObj(val)
    }
  } else if (obj.constructor === Object) {
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) {
        return
      }

      let newKey = camelString(key);

      if (newKey !== key) {
        obj[newKey] = obj[key];
        delete obj[key]
      }

      camelObj(obj[newKey])
    }
  }
}

//驼峰转下划线
function underlineString (str) {
  return str.replace(/[A-Z]/g, (words) => {
    return '_' + words.toLowerCase()
  })
}

function underlineObj (obj) {
  if (Array.isArray(obj) && Object.prototype.toString.apply(obj) === '[object Array]') {
    for (let val of obj) {
      underlineObj[val]
    }
  } else if (obj.constructor === Object && Object.prototype.toString.call(obj) === '[object Object]') {
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) {
        return
      }

      let newKey = underlineString(key);

      if (newKey !== key) {
        obj[newKey] = obj[key]
        delete obj[key]
      }

      underlineObj(obj[newKey])
    }
  }
}
