function createAppTitle(title) {
  let appTitle = document.createElement("h2");
  appTitle.innerHTML = title;
  return appTitle;
}

function createTodoItemForm() {
  let form = document.createElement("form");
  let input = document.createElement("input");
  let buttonWrapper = document.createElement("div");
  let button = document.createElement("button");

  form.classList.add("input-group", "mb-3");
  input.classList.add("form-control");
  input.placeholder = "Введите название нового дела";
  buttonWrapper.classList.add("input-group-append");
  button.classList.add("btn", "btn-primary");
  // Атрибут disabled при загрузке страницы
  button.setAttribute("disabled", "true");
  button.textContent = "Добавить дело";

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button,
  };
}

function createTodoList() {
  let list = document.createElement("ul");
  list.classList.add("list-group");
  return list;
}

function createTodoItemElement(todoItem, { onDone, onDelete }) {
  let item = document.createElement("li");

  let buttonGroup = document.createElement("div");
  let doneButton = document.createElement("button");
  let deleteButton = document.createElement("button");

  item.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  item.textContent = todoItem.name;
  // Если статус done: true , отмечаем сделанным
  if (todoItem.done) {
    item.classList.toggle("list-group-item-success");
  }
  buttonGroup.classList.add("btn-group", "btn-group-sm");
  doneButton.classList.add("btn", "btn-success");
  doneButton.textContent = "Готово";
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.textContent = "Удалить";

  doneButton.addEventListener("click", function () {
    onDone({ todoItem, element: item });
    item.classList.toggle("list-group-item-success", todoItem.done);
  });

  deleteButton.addEventListener("click", function () {
    onDelete({ todoItem, element: item });
  });

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return item;
}

async function createTodoApp(
  container,
  {
    title,
    owner,
    todoItemList = [],
    onCreateFormSubmit,
    onDoneClick,
    onDeleteClick,
  }
) {
  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemForm();
  let todoList = createTodoList();
  const handlers = { onDone: onDoneClick, onDelete: onDeleteClick };

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  todoItemList.forEach((todoItem) => {
    const todoItemElement = createTodoItemElement(todoItem, handlers);
    todoList.append(todoItemElement);
  });

  //событие на input формы
  todoItemForm.form.addEventListener("input", function () {
    // Если не пусто, удаляем атрибут кнопки disabled, если пусто, возвращаем
    if (todoItemForm.input.value) {
      todoItemForm.button.removeAttribute("disabled");
    } else {
      todoItemForm.button.setAttribute("disabled", "true");
    }
  });

  todoItemForm.form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // возвращаем атрибут disabled кнопке после добавления дела
    todoItemForm.button.setAttribute("disabled", "true");

    if (!todoItemForm.input.value) {
      return;
    }

    const todoItem = await onCreateFormSubmit({
      owner,
      name: todoItemForm.input.value.trim(),
    });
    // Создаем TodoItem
    const todoItemElement = createTodoItemElement(todoItem, handlers);

    todoList.append(todoItemElement);
    todoItemForm.input.value = "";
    localStorage.setItem("session", JSON.stringify(session));
  });
}

export { createTodoApp };
