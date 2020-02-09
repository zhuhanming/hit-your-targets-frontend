// https://dev.to/goenning/how-to-retry-when-react-lazy-fails-mb5
const retryPromise = (
  promise,
  retriesLeft = 5,
  interval = 1000
): Promise<unknown> => {
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

// Capitalises the word
const capitalize = (word: string): string => {
  return word.replace(/(?:^|\s)\S/g, a => {
    return a.toUpperCase();
  });
};

// Get a random greeting for Main view
const randomGreeting = (name: string): string => {
  const greetings = [
    `Welcome back, ${name}`,
    `How are you today, ${name}?`,
    'Winners never quit, and quitters never win',
    'Rome was not built in a day',
    "Take baby steps - you'll get there!",
    "There's no time to waste!"
  ];

  return greetings[Math.floor(Math.random() * greetings.length)];
};

export { retryPromise, capitalize, randomGreeting };
