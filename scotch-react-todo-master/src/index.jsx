import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

console.clear();

const Title = ({todoCount}) => {
  return (
    <div>
       <div>
          <h1>to-do ({todoCount})</h1>
       </div>
    </div>
  );
}

const TodoForm = ({addTodo}) => {
  // Input Tracker
  let input;
  // Return JSX
  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        addTodo(input.value);
        input.value = '';
      }}>
      <input className="form-control col-md-12" ref={node => {
        input = node;
      }} />
      <br />
    </form>
  );
};

const Todo = ({todo, remove,onDone}) => {
  // Each Todo
  return (<div><a href="#" className="list-group-item" onClick={() => {remove(todo.id)}}>{todo.text}</a><button onClick={() => {onDone(todo.text)}}>done</button></div>);
}

const TodoList = ({todos, remove,onDone}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove} onDone={onDone}/>)
  });
  return (<div className="list-group" style={{marginTop:'30px'}}>{todoNode}</div>);
}


const MyTodo = ({done}) => {
  // Each Todo
  return (<a href="#" className="list-group-item" >{done.text}</a>);
}

const DoneList = ({mydone,onDone}) => {
  // Map through the todos
  const todoNode = todos.map((done) => {
    return (<MyTodo done={done} key={done.iddone} />)
  });
  return (<div className="list-group" style={{marginTop:'30px'}}>{todoNode}</div>);
}


// Contaner Component
// Todo Id
window.id = 0;
window.iddone = 0;
class TodoApp extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: [],
      info: []
    }
    this.apiUrl = '//57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'
  }
  // Lifecycle method
  componentDidMount(){
    // Make HTTP reques with Axios
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        this.setState({data:res.data});
      });
    
     axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        this.setState({info:res.info});
      });
  }
  // Add todo handler
  addTodo(val){
    // Assemble data
    const todo = {text: val}
    // Update data
    axios.post(this.apiUrl, todo)
       .then((res) => {
          this.state.data.push(res.data);
          this.setState({data: this.state.data});
       });
  }
  
  onDone(val){
    // Assemble data
    const done = {text: val}
    // Update data
    axios.post(this.apiUrl, done)
       .then((res) => {
          this.state.info.push(res.info);
          this.setState({info: this.state.info});
       });
  }
  
   
  // Handle remove
  handleRemove(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) return todo;
    });
    // Update state with filter
    axios.delete(this.apiUrl+'/'+id)
      .then((res) => {
        this.setState({data: remainder});      
      })
  }
 
  render(){
    // Render JSX
    return (
      <div>
        <Title todoCount={this.state.data.length}/>
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList 
          todos={this.state.data} 
          remove={this.handleRemove.bind(this)}
          onDone={this.onDone.bind(this)}
        />
        <DoneList
          mydone={this.state.info}
          onDone={this.onDone.bind(this)}
        />
      </div>
    );
  }
}
ReactDOM.render(<TodoApp />, document.getElementById('container'));
