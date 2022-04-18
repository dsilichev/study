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

  function createTodoItemElement(todoItem, {onDone, onDelete}) {
    let item = document.createElement('li');

    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = todoItem.name;
    // Если статус done: true , отмечаем сделанным
    if (todoItem.done) {
      item.classList.toggle('list-group-item-success');
    }
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    doneButton.addEventListener('click', function () {
      onDone({todoItem, element: item});
      item.classList.toggle('list-group-item-success', todoItem.done);
      // item.classList.toggle('list-group-item-success');
      // let indexOfModifiedItem = session[whosTodo].indexOf(nameAndStatus);
      // if (item.classList.contains('list-group-item-success')) {
      //   session[whosTodo][indexOfModifiedItem].done = true;
      // }
      // else {
      //   session[whosTodo][indexOfModifiedItem].done = false;
      // }
      // localStorage.setItem('session', JSON.stringify(session));
    });

    deleteButton.addEventListener('click', function () {
      onDelete({todoItem, element: item});
      // if (confirm('Вы уверены?')) {
      //   item.remove();
      //   let indexOfRemovedItem = session[whosTodo].indexOf(nameAndStatus);
      //   console.log(indexOfRemovedItem);
      //   session[whosTodo].splice(indexOfRemovedItem, 1);
      //   localStorage.setItem('session', JSON.stringify(session));
      // }
    });

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return item;

  }

  async function createTodoApp(container, title, owner, ...args) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    const handlers = {
      onDone({todoItem}) {
        todoItem.done = !todoItem.done;
        fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
          method: 'PATCH',
          body: JSON.stringify({done: todoItem.done}),
          headers: {
            'Content-Type': 'application/json',
          }
        })
      },
      onDelete({todoItem, element}) {
        element.remove();
        fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
          method: 'DELETE',
        })
      }
    }
    let session = {
      myTodos: [],
      momTodos: [],
      dadTodos: [],
    };

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
    const todoItemList = await response.json();

    todoItemList.forEach(todoItem => {
      const todoItemElement = createTodoItemElement(todoItem, handlers);
      todoList.append(todoItemElement);
    })
    // Загрузка сохраненных дел
    // if (args.length !== 0) {
    //   console.log(args);
    //   session = args[0];
    //   for (i = 0; i < args[0][whosTodo].length; i++) {
    //     let nameAndStatus = args[0][whosTodo][i];
    //     let todoItemElement = createTodoItem(nameAndStatus);

    //     // todoItemElement.doneButton.addEventListener('click', function () {
    //     //   todoItemElement.item.classList.toggle('list-group-item-success');
    //     //   let indexOfModifiedItem = session[whosTodo].indexOf(nameAndStatus);
    //     //   if (todoItemElement.item.classList.contains('list-group-item-success')) {
    //     //     session[whosTodo][indexOfModifiedItem].done = true;
    //     //   }
    //     //   else {
    //     //     session[whosTodo][indexOfModifiedItem].done = false;
    //     //   }
    //     //   localStorage.setItem('session', JSON.stringify(session));
    //     // });

    //     // todoItemElement.deleteButton.addEventListener('click', function () {
    //     //   if (confirm('Вы уверены?')) {
    //     //     todoItemElement.item.remove();
    //     //     let indexOfRemovedItem = session[whosTodo].indexOf(nameAndStatus);
    //     //     session[whosTodo].splice(indexOfRemovedItem, 1);
    //     //     localStorage.setItem('session', JSON.stringify(session));
    //     //   }
    //     // });
    //     todoList.append(todoItemElement);
    //   }
    // }

    //событие на input формы
    todoItemForm.form.addEventListener('input', function () {
      // Если не пусто, удаляем атрибут кнопки disabled, если пусто, возвращаем
      if (todoItemForm.input.value) {
        todoItemForm.button.removeAttribute('disabled');
      }
      else {
        todoItemForm.button.setAttribute('disabled', 'true');
      }
    })

    todoItemForm.form.addEventListener('submit', async e => {
      e.preventDefault();
      // возвращаем атрибут disabled кнопке после добавления дела
      todoItemForm.button.setAttribute('disabled', 'true');

      if (!todoItemForm.input.value) {
        return;
      }

      const response = await fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        body: JSON.stringify({
          name: todoItemForm.input.value.trim(),
          owner,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const todoItem = await response.json();
      //console.log(todoItem);

      // Создаем TodoItem
      let nameAndStatus = { name: todoItem.name, done: false };
      const todoItemElement = createTodoItemElement(todoItem, handlers);
      // session[whosTodo].push(nameAndStatus);

      // todoItemElement.doneButton.addEventListener('click', function () {
      //   todoItemElement.item.classList.toggle('list-group-item-success');
      //   let indexOfModifiedItem = session[whosTodo].indexOf(nameAndStatus);
      //   if (todoItemElement.item.classList.contains('list-group-item-success')) {
      //     session[whosTodo][indexOfModifiedItem].done = true;
      //   }
      //   else {
      //     session[whosTodo][indexOfModifiedItem].done = false;
      //   }
      //   localStorage.setItem('session', JSON.stringify(session));
      // });

      // todoItemElement.deleteButton.addEventListener('click', function () {
      //   if (confirm('Вы уверены?')) {
      //     todoItemElement.item.remove();
      //     let indexOfRemovedItem = session[whosTodo].indexOf(nameAndStatus);
      //     console.log(indexOfRemovedItem);
      //     session[whosTodo].splice(indexOfRemovedItem, 1);
      //     localStorage.setItem('session', JSON.stringify(session));
      //   }
      // });

      todoList.append(todoItemElement);
      todoItemForm.input.value = '';
      localStorage.setItem('session', JSON.stringify(session));
    });
  }

  window.createTodoApp = createTodoApp;
})();
