function throttle(func, ms) {
  let isThrottled = false;

  function wrapper() {
    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (saveArgs) {
        wrapper.apply(saveThis, saveArgs);
        saveThis = saveArgs = null;
      }
    }, ms);
  }

  return wrapper;
}

function mouseMove() {
  console.log(new Date());
}

setInterval(mouseMove, 1000);
