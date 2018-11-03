export function mergeDataWithKey(data) {
  return Object.values(data).map((value, index) => {
    return {
      ...value,
      key: Object.keys(data)[index].replace('-', '')
    };
  });
}

export function getBoardKey() {
  return window.location.href
    .split('/')
    .pop()
    .replace('-', '');
}
