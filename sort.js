//bubble
//O(n^2)
var arr = [1, 3, 6, 2, 4, 5, 8]

function bubbleSort (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }

  return arr
}

function selectionSort (arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }

    if (i !== min) {
      [arr[i], arr[min]] = [arr[min], arr[i]]
    }
  }

  return arr
}

function insertionSort (arr) {
  for (let i = 1; i < arr.length; i++) {
    let cur = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > cur) {
      arr[j + 1] = arr[j]
      j--
    }

    //此处j--
    arr[j + 1] = cur
  }

  return arr
}


