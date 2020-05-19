export default (model, data, keys) => {
  const subjects = [];
  keys.forEach((key) => {
    model.find((item) => item[key] === data[key]) && subjects.push(key);
  })
  console.log(subjects)

  return subjects;
};
