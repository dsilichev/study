{
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const middleName = document.getElementById("middleName");

  const regex = /[\sа-яА-Я-]/g;

  firstName.addEventListener("input", () => {
    firstName.value = (firstName.value.match(regex) || []).join("");
  });

  firstName.addEventListener("focusout", () => {
    console.log(";sfrg");
    // пробелы также как - удалить
    firstName.value = firstName.value.replace(/-+/g, '-');
    firstName.value = firstName.value.replace(/ +/g, ' ');
    for (i=0; i<=1; i++) {
      if (firstName.value.indexOf("-") === 0 || firstName.value.indexOf(" ") === 0) {
        firstName.value = firstName.value.slice(1);
        console.log(firstName.value)
      }
    }
    for (i=0; i<=1; i++) {
      if (firstName.value.indexOf("-") === firstName.value.length || firstName.value.indexOf(" ") === firstName.value.length) {
        firstName.value = firstName.value.substring(0, firstName.value.length - 1); // need to fix
      }
    }
  });
}
