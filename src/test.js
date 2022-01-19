const arr = [6, 30, 2, 65, 1]
const index = arr.findIndex((el) => el === 2)
const arr1 = arr.filter((el) => el !== index);
// console.log(arr1)
// console.log(index)

const teh = arr.slice(0, index);
const teh1 = arr.slice(index+1);


const arr2 = [...teh, ...teh1];
console.log(arr2)