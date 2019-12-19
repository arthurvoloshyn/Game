export const random = (min, max) => {
  let r = Math.random();
  return Math.floor(r * (max - min) + min);
};

export const exists = x => {
  if (x != null) return x;
};

export const clone = obj => {
  let newObj = {};
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
};
