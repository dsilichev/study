{
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const middleName = document.getElementById("middleName");
  const form = document.getElementById("form");

  const fields = [firstName, lastName, middleName];

  const regex = /[\sа-яА-Я-]/g;

  function clearFields(fields) {
    // clear fields
    for (const field of fields) {
      field.value = "";
    }
  }

  clearFields(fields);

  // returns string with allowed symbols
  function allowedSymbols(str) {
    return (str.match(regex) || []).join("");
  }
  // return modified string
  function modifiedString(str) {
    if (str) {
      // replace multiple to single
      str = str.replace(/-+/g, "-");
      str = str.replace(/ +/g, " ");

      // deleting at start
      while (str.indexOf("-") === 0 || str.indexOf(" ") === 0) {
        str = str.slice(1);
      }

      // deleting at end
      while (
        str.lastIndexOf("-") === str.length - 1 ||
        str.lastIndexOf(" ") === str.length - 1
      ) {
        str = str.substring(0, str.length - 1);
      }

      // first sign to UpperCase
      if (str) {
        str = str[0].toUpperCase() + str.slice(1);
      }
    }

    return str;
  }

  // input events
  for (const field of fields) {
    field.addEventListener("input", (e) => {
      field.value = allowedSymbols(e.currentTarget.value);
    });

    field.addEventListener("blur", (e) => {
      field.value = modifiedString(e.currentTarget.value);
    });
  }

  // submit evet
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (firstName.value && middleName.value && lastName.value) {
      // adding paragraph with name
      nameLine = document.createElement("p");
      nameLine.innerText =
        firstName.value + " " + middleName.value + " " + lastName.value;
      form.appendChild(nameLine);

      clearFields(fields);
    }
  });
}
