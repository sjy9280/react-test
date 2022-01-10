export function contain(arr1, arr2) {
  return arr2.every(val => arr1.includes(val));
}

function zuhe(a, b) {
  return [].concat(...a.map(c => b.map(d => [].concat(c, d))))
}

// 笛卡尔积计算出sku
export function cartesian(a, b, ...c) {
  return b ? cartesian(zuhe(a, b), ...c) : a
}

