/**
 * XMLHttpRequest
 * @param {String} url
 * @param {String} type - GET or POST
 * @param {Formdata} data - FormData object
 */
export default (url, type = 'GET', data = '') => new Promise((resolve, reject) => {
  const request = new XMLHttpRequest();

  request.open(type, url);

  /** Special headers for cmtt sites */
  request.setRequestHeader('X-This-Is-CSRF', 'THIS IS SPARTA!');

  // eslint-disable-next-line no-underscore-dangle
  if (window.__static_version) {
    // eslint-disable-next-line no-underscore-dangle
    request.setRequestHeader('X-JS-Version', window.__static_version);
  }

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      resolve(request.response);
    } else {
      reject(request.statusText);
    }
  };

  request.onerror = () => reject(request.statusText);

  request.send(data);
});
