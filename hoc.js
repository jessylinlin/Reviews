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
function fib () {

}

//bind

//apply

//call

//promise
