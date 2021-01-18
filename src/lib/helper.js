/** Return random number in given range */
export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const shuffle = (a) => {
  let j = 0;
  let x = 0;
  let i = 0;

  for (i = a.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

/**
 * Simple images preload
 * @param {Array} urls - array of urls
 */
export const preloadImages = (urls) => {
  urls.forEach((url) => {
    const image = new Image();
    image.src = url;
  });
};

export const declineWord = (number, words) => {
  let result = '';

  if (number % 10 === 1 && number % 100 !== 11) {
    result += words[0];
  } else if ([2, 3, 4].indexOf(number % 10) > -1 && [12, 13, 14].indexOf(number % 100) < 0) {
    result += words[1];
  } else {
    result += words[2];
  }

  return result;
};
