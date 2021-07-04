function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    let resultArray = [],
      total = promises.length;
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((res) => {
          resultArray[i] = res;
          total--;
          if (total === 0) {
            resolve(resultArray);
          }
        })
        .catch(reject);
    }
    //if promises array is empty
    if (promises.length === 0) {
      resolve(resultArray);
    }
  });
}

// Test code.
Promise_all([]).then((array) => {
  console.log("This should be []:", array);
});
function soon(val) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
Promise_all([soon(1), soon(2), soon(3)]).then((array) => {
  console.log("This should be [1, 2, 3]:", array);
});
Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then((array) => {
    console.log("We should not get here");
  })
  .catch((error) => {
    if (error != "X") {
      console.log("Unexpected failure:", error);
    }
  });
