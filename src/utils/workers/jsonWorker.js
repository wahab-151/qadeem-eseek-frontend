/* eslint-disable no-restricted-globals */
self.onmessage = (e) => {
  try {
    const json = JSON.stringify(e.data);
    self.postMessage(json);
  } catch (err) {
    self.postMessage(null);
  }
};


