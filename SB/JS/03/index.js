// Задание 1
let password = '|-__-|';

if (password.length >= 4 && (password.includes('_') || password.includes('-'))) {
  console.log('Пароль надежный');
}
else {
  console.log('Пароль недостаточно надежный');
}

// Задание 2
let fname = 'NaMe';
let sname = 'Surname';

let ufname = format(fname);
let usname = format(sname);

if (fname === ufname){
  console.log('Имя осталось без изменений');
}
else{
  console.log('Имя было преобразовано');
}

if (sname === usname){
  console.log('Фамилия осталась без изменений');
}
else{
  console.log('Фамилия была преобразована');
}

function format(str){
  let ustr;
  ustr = str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
  console.log(ustr);
  return ustr;
}
