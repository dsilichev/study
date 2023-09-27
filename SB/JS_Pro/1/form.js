{
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const middleName = document.getElementById("middleName");

  const regex = /[\sа-яА-Я-]/g;

  firstName.addEventListener("input", () => {
    //console.log(firstName.value.match(regex));
    firstName.value = firstName.value.match(regex).join("");
  });

  firstName.addEventListener("focusout", () => {
    console.log(';sfrg')
    // пробелы также как - удалить
    firstName.value = firstName.value.trim().replaceAll(firstName.value.trim().match(/-+/), '-');
    if (firstName.value.indexOf('-') === 0) {
      firstName.value = firstName.value.slice(1);
    }
  });
}
