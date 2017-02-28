"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.clear();

var Title = function Title(_ref) {
  var todoCount = _ref.todoCount;

  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "to-do (",
        todoCount,
        ")"
      )
    )
  );
};

var TodoForm = function TodoForm(_ref2) {
  var addTodo = _ref2.addTodo;

  // Input Tracker
  var input = undefined;
  // Return JSX
  return React.createElement(
    "form",
    { onSubmit: function onSubmit(e) {
        e.preventDefault();
        addTodo(input.value);
        input.value = '';
      } },
    React.createElement("input", { className: "form-control col-md-12", ref: function ref(node) {
        input = node;
      } }),
    React.createElement("br", null)
  );
};

var Todo = function Todo(_ref3) {
  var todo = _ref3.todo;
  var remove = _ref3.remove;
  var onDone = _ref3.onDone;

  // Each Todo
  return React.createElement(
    "div",
    null,
    React.createElement(
      "a",
      { href: "#", className: "list-group-item", onClick: function onClick() {
          remove(todo.id);
        } },
      todo.text
    ),
    React.createElement(
      "button",
      { onClick: function onClick() {
          onDone(todo.text);
        } },
      "done"
    )
  );
};

var TodoList = function TodoList(_ref4) {
  var todos = _ref4.todos;
  var remove = _ref4.remove;
  var onDone = _ref4.onDone;

  // Map through the todos
  var todoNode = todos.map(function (todo) {
    return React.createElement(Todo, { todo: todo, key: todo.id, remove: remove, onDone: onDone });
  });
  return React.createElement(
    "div",
    { className: "list-group", style: { marginTop: '30px' } },
    todoNode
  );
};

var MyTodo = function MyTodo(_ref5) {
  var done = _ref5.done;

  // Each Todo
  return React.createElement(
    "a",
    { href: "#", className: "list-group-item" },
    done.text
  );
};

var DoneList = function DoneList(_ref6) {
  var donelist = _ref6.donelist;

  // Map through the todos
  var mytodoNode = donelist.map(function (done) {
    return React.createElement(MyTodo, { done: done, key: done.id });
  });
  return React.createElement(
    "div",
    { className: "list-group", style: { marginTop: '30px' } },
    mytodoNode
  );
};

// Contaner Component
// Todo Id
window.id = 0;
window.id = 0;

var TodoApp = function (_React$Component) {
  _inherits(TodoApp, _React$Component);

  function TodoApp(props) {
    _classCallCheck(this, TodoApp);

    // Set initial state

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
    // Pass props to parent class

    _this.state = {
      data: [],
      info: []
    };
    _this.apiUrl = '//57b1924b46b57d1100a3c3f8.mockapi.io/api/todos';
    _this.newapiUrl = '//58b140d1e51b7812000f998d.mockapi.io/done/donelist';
    return _this;
  }
  // Lifecycle method

  TodoApp.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    // Make HTTP reques with Axios
    axios.get(this.apiUrl).then(function (res) {
      // Set state with result
      _this2.setState({ data: res.data });
    });
    axios.get(this.newapiUrl).then(function (res) {
      // Set state with result
      _this2.setState({ info: res.data });
    });
  };
  // Add todo handler

  TodoApp.prototype.addTodo = function addTodo(val) {
    var _this3 = this;

    // Assemble data
    var todo = { text: val };
    // Update data
    axios.post(this.apiUrl, todo).then(function (res) {
      _this3.state.data.push(res.data);
      _this3.setState({ data: _this3.state.data });
    });
  };

  TodoApp.prototype.onDone = function onDone(val) {
    var _this4 = this;

    // Assemble data
    var done = { text: val };
    // Update data
    axios.post(this.newapiUrl, done).then(function (res) {
      _this4.state.info.push(res.data);
      _this4.setState({ info: _this4.state.info });
    });
  };

  // Handle remove

  TodoApp.prototype.handleRemove = function handleRemove(id) {
    var _this5 = this;

    // Filter all todos except the one to be removed
    var remainder = this.state.data.filter(function (todo) {
      if (todo.id !== id) return todo;
    });
    // Update state with filter
    axios.delete(this.apiUrl + '/' + id).then(function (res) {
      _this5.setState({ data: remainder });
    });
  };

  TodoApp.prototype.render = function render() {
    // Render JSX
    return React.createElement(
      "div",
      null,
      React.createElement(Title, { todoCount: this.state.data.length }),
      React.createElement(TodoForm, { addTodo: this.addTodo.bind(this) }),
      React.createElement(TodoList, {
        todos: this.state.data,
        remove: this.handleRemove.bind(this),
        onDone: this.onDone.bind(this)
      }),
      React.createElement(DoneList, {
        donelist: this.state.info
      })
    );
  };

  return TodoApp;
}(React.Component);

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('container'));