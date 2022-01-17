// Задание 1
let count = 70;
let array = [];
let n = 100;
let m = -5;
let min = Math.min(n, m);
let max = Math.max(n, m);

for (i = 0; i < count; ++i) {
  array.push(Math.floor(Math.random() * (max - min) + min));
}
console.log(array);

array = [];
i = 0;
while (i < count) {
  array.push(Math.floor(Math.random() * (max - min) + min));
  ++i;
}
console.log(array);

// Задание 2
let string = 'Привет, мир!'
let reverseString = '';

for (i = string.length - 1; i >=0; --i){
  reverseString += string[i];
}
console.log(reverseString);

// Задание 3
let roadMines = [];
let mineCount = 0;
let position = 0;
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
let monthDays = [];
let weekDays = ['понедельник', 'вторник', 'среда', 'четверг',
'пятница', 'суббота', 'воскресенье'];
let weekStartDay = 'понедельник';
let dayIndex = getStartDayIndex(weekStartDay);

// Заполняем массив дней в месяце
for (i = 1; i <= 31; ++i){
  monthDays.push(i);
}

// Вычисляем индекс стартового дня
function getStartDayIndex(weekStartDay){
  return weekDays.indexOf(weekStartDay);
}

for (monthDay of monthDays){
  let weekDay = weekDays[dayIndex % 7];
  console.log(`${monthDay} января, ${weekDay}`);
  ++dayIndex;
}