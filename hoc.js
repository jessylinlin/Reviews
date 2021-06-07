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
  constructor() {
    //init
    this.status = PENDING


    this.resolve = function () {

    }

    this.reject = function () {

    }
  }
}
