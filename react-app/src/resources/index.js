export function normalizeArray(arr) {
  let obj = {};
  if (Array.isArray(arr)) arr.forEach(el => obj[el.id] = el);
  return obj;
};

// export function dateDisplay(date) {
//   let split = date.split(' ')
//   let dateSplit = split[0].split('-')

// }
