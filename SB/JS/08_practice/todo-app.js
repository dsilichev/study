(function () {
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    // Атрибут disabled при загрузке страницы
    button.setAttribute('disabled', 'true');
    button.textContent = 'Добавить дело';

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
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(nameAndStatus) {
    let item = document.createElement('li');

    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = nameAndStatus.name;
    // Если статус done: true , отмечаем сделанным
    if (nameAndStatus.done) {
      item.classList.toggle('list-group-item-success');
    }
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton,
    };

  }

  function createTodoApp(container, title = 'Список дел', whosTodo, ...args) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    let session = {
      myTodos: [],
      momTodos: [],
      dadTodos: [],
    };

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    // Загрузка сохраненных дел
    if (args.length !== 0) {
      console.log(args);
      session = args[0];
      for (i = 0; i < args[0][whosTodo].length; i++) {
        let todoItem = createTodoItem(args[0][whosTodo][i]);
        console.log(args[0][whosTodo][i]);
        todoItem.doneButton.addEventListener('click', function () {
          todoItem.item.classList.toggle('list-group-item-success');
        });
        todoItem.deleteButton.addEventListener('click', function () {
          if (confirm('Вы уверены?')) {
            todoItem.item.remove();
            let indexOfRemovedItem = session[whosTodo].indexOf(args[0][whosTodo][i]);
            console.log(indexOfRemovedItem);
            session[whosTodo].splice(indexOfRemovedItem, 1);
            localStorage.setItem('session', JSON.stringify(session));
          }
        });
        todoList.append(todoItem.item);
        //localStorage.setItem('session', JSON.stringify(session));
      }
    }

    //событие на input формы
    todoItemForm.form.addEventListener('input', function () {
      // Если не пусто, удаляем атрибут disabled, если пусто, возвращаем
      if (todoItemForm.input.value) {
        todoItemForm.button.removeAttribute('disabled');
      }
      else {
        todoItemForm.button.setAttribute('disabled', 'true');
      }
    })

    todoItemForm.form.addEventListener('submit', function (e) {
      e.preventDefault();
      // возвращаем атрибут disabled кнопке после добавления дела
      todoItemForm.button.setAttribute('disabled', 'true');

      if (!todoItemForm.input.value) {
        return;
      }
      // Создаем TodoItem
      let nameAndStatus = { name: todoItemForm.input.value, done: false };
      let todoItem = createTodoItem(nameAndStatus);
      session[whosTodo].push(nameAndStatus);

      todoItem.doneButton.addEventListener('click', function () {
        todoItem.item.classList.toggle('list-group-item-success');
      });

      todoItem.deleteButton.addEventListener('click', function () {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
          let indexOfRemovedItem = session[whosTodo].indexOf(nameAndStatus);
          console.log(indexOfRemovedItem);
          session[whosTodo].splice(indexOfRemovedItem, 1);
          localStorage.setItem('session', JSON.stringify(session));
        }
      });

      todoList.append(todoItem.item);
      todoItemForm.input.value = '';
      localStorage.setItem('session', JSON.stringify(session));
    });
  }

  window.createTodoApp = createTodoApp;
})();