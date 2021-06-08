var promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (1 == '') {
      resolve('成功')
    } else {
      reject('nmsl')
    }

  }, 2000)
}).then(
  result => {
    console.log('success', result)
  },
  error => {
    console.log('failed', error)
  }
)

const PENDING = 'pending'
const FULFILLED = 'fullfilled'
const REJECTED = 'rejected'
class myPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.error = undefined

    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    let self = this;

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.resolvedCallbacks.forEach(fn => fn())
      }
    }

    let reject = (error) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.error = error
        this.rejectedCallbacks.forEach(fn => fn())
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
      this.resolvedCallbacks.push(() => { onFulfilled(this.value) })
      this.rejectedCallbacks.push(() => { onRejected(this.error) })
    }
  }
}

Promise.myall = function (arr) {
  if (arr[Symbol.iterator] === undefined) {
    return Promise.reject('not a iterator')
  }

  let promises = [...arr] //Array.from(arr)
  const results = [];
  let count = 0;

  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      let promise = promises[i];

      promise.then(result => {
        results[i] = result;
        count++

        if (count === promises.length) {
          resolve(results)
        }
      }).catch(error => {
        reject(error)
      })
    }
  })
}

Promise.prototype.myFinally = function () {

}