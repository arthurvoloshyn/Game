export const random = (min, max) => {
  const randomVal = Math.random();
  return Math.floor(randomVal * (max - min) + min);
};

export const exists = val => {
  if (val != null) return val;
};

export const clone = obj => {
  const newObj = {};
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
};
