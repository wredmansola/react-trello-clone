const mergeDataWithKey = data => {
  return Object.values(data).map((value, index) => {
    return {
      value,
      key: Object.keys(data)[index].replace('-', '')
    };
  });
};

export default mergeDataWithKey;
