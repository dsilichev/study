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
let sname = 'SuRNamE';

function toUpper(str) {
  let ustr = '';
  for (i in str){
    if (i == 0){
      ustr += str[i].toUpperCase();
    }
    else{
      ustr += str[i].toLowerCase();
    }
  }
  console.log(ustr);
}

let ufname = toUpper(fname);
let usname = toUpper(sname);

if (fname === ufname){
  console.log('Имя осталось без изменений');
}
else{
  console.log('Имя было преобразовано');
}

if (sname === usname){
  console.log('Фамилия осталось без изменений');
}
else{
  console.log('Фамилия была преобразована');
}
