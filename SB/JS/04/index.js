// Задание 1
let count = 70;
let arr = [];
let n = 100;
let m = -5;

for (i = 0; i < count; ++i) {
  let min = Math.min(n, m);
  let max = Math.max(n, m);
  arr.push(Math.floor(Math.random() * (max - min) + min));
}
console.log(arr);

// Задание 2
let str = 'Привет, мир!'
let rstr = '';

for (i = str.length - 1; i >=0; --i){
  rstr += str[i];
}
console.log(rstr);

// Задание 3
let roadMines = [];
mineCount = 0;
position = 0;
// Зададим случайный массив из boolean
for (i = 0; i < 10; ++i){
  roadMines[i] = Boolean(Math.floor(Math.random() * 2));
}
console.log(roadMines);

for (mine of roadMines){
  ++position;
  console.log(`Танк переместился на ${position}`);
  if (mine === true){
    ++mineCount;
    if (mineCount <= 1){
      console.log('Танк поврежден');
    }
    else{
      console.log('Танк уничтожен');
      break;
    }
  }
}

// Задание 4
