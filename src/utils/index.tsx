const retryPromise = (promise, retriesLeft = 5, interval = 1000) => {
  return new Promise((resolve, reject) => {
    promise()
      .then(resolve)
      .catch(error => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            reject(error);
            return;
          }

          retryPromise(promise, retriesLeft - 1, interval).then(
            resolve,
            reject
          );
        }, interval);
      });
  });
};

const capitalize = (word: string) => {
  return word.replace(/(?:^|\s)\S/g, a => {
    return a.toUpperCase();
  });
};

export { retryPromise, capitalize };
