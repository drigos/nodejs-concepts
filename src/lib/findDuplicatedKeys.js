export default (model, data, keys) => {
  const subjects = [];
  keys.forEach((key) => {
    const found = model.find((item) => item[key] === data[key]);
    if (found) subjects.push(key);
  });

  return subjects;
};
