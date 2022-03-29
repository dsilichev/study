parseEmployeesData(`
Тиунов Тимофей  Сергеевич,  системный архитектор
Иванов Иван Иванович , frontend-разработчик
`);
console.log(parseEmployeesData(`
Тиунов Тимофей  Сергеевич,  системный архитектор
Иванов Иван Иванович , frontend-разработчик
`)[0]);
function parseEmployeesData(dataString) {
    return dataString
    // разбиваем текст по строкам
    .split('\n')
    // убираем пустые строки и строки с пробелами
    .filter(line => line.trim().length > 0)
    // преобразуем каждую строку
    .map(line => {
        // через запятую выписаны ФИО и должность
        const [fullName, occupation] = line
        // разбиваем строку по запятой
        .split(',')
        // убираем лишние пробелы
        .map(str => str.trim())
        // убираем из всего массивапустые строки, которые могут
        // появиться если в тексте есть несколько пробелов подряж
        .filter(text => text.length > 0);
        // далее нам нужно разбить ФИО на составляющие
        const [surname, name, middleName] = fullName
        // ФИО в тесте написаны через пробел, так что разбиваем по пробелу
        .split(' ')
        // и тоже убираем лишнее
        .filter(text => text.length > 0);
        // возвращаем объект со структурированными данными
        return {
            surname, name, middleName, occupation
        };
    })
};