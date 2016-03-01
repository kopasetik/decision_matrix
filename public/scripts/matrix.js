// Define the default values for:
// 1) Categories
// 2) Tasks
// 3) Labels

// how does the matrix come together?
// it has a few components
// -Labels
const Label = React.createClass({
  render(){
    return (<label></label>)
  }
})


const Category = React.createClass({
  render(){
    return (
      <div className="category">
        <h2>{this.props.categoryTitle}</h2>
      </div>
    )
  }
})

// -MatrixBox
const MatrixBox = React.createClass({
  getInitialState(){
    return {
      data: [],
      categories: [
        {name: 'urgent/important'},
        {name: 'non-urgent/important'},
        {name: 'urgent/unimportant'},
        {name: 'non-urgent/unimportant'}
      ]
    }
  },
  handleListTaskDelete(taskId){
    const tasks = this.state.data
    const newTasks = tasks.filter(task=>(task.id !== taskId))
    this.setState({data: newTasks})
  },
  handleTaskSubmit(task){
    const tasks = this.state.data
    task.id = Date.now()
    const newTasks = tasks.concat([task])
    this.setState({data: newTasks})
  },
  render(){
    const categoryNodes = this.state.categories.map((category, index)=>{
      return (
        <Category categoryTitle={category.name} key={index} />
      )
    })
    return (
      <div className="matrix-box">
        {categoryNodes}
        <TaskList data={this.state.data} onListTaskDelete={this.handleListTaskDelete} />
        <TaskForm onTaskSubmit={this.handleTaskSubmit} />
      </div>
    )
  }
})

// -TaskList
// const handleTaskDelete = function (idx, taskId, evt){
//   evt.preventDefault()
//   console.log('clarence carter')
//   this.props.onListTaskDelete(taskId)
// }

const TaskList = React.createClass({
  handleTaskDelete(taskId){
    this.props.onListTaskDelete(taskId)
  },
  render(){
    const taskNodes = this.props.data.map((task, index) => {
      return (
        <Task
          author={task.author}
          text={task.text}
          key={task.id}
          taskKey={task.id}
          onTaskDelete={this.handleTaskDelete}
        />
      )
    })
    return (
      <div className="task-list">
        {taskNodes}
      </div>
    )
  }
})

// -Categories (4)
// (urgent/important, urgent/unimportant, non-urgent/important, non-urgent/unimportant)

// -Tasks
const Task = React.createClass({
  getInitialState(){
    return {category: ''}
  },
  handleDeletePress(e){
    e.preventDefault()
    console.log('pretend delete!')
    this.props.onTaskDelete(this.props.taskKey)
  },
  handleCategoryChange(e){
    this.setState({category: e.target.value})
  },
  render(){
    let category = this.state.category
    if(category !== '' && category < 5 && category > 0) {
      console.log('New value is ' + this.state.category)
    }
    return (
      <div className="task">
      {this.props.author}&nbsp;
      {this.props.text}&nbsp;
      <form onSubmit={this.handleDeletePress}>
        <button>Delete</button>&nbsp;
        <input
          type="text"
          placeholder="#"
          value={this.state.category}
          onChange={this.handleCategoryChange}
          maxLength="1"
        />
      </form>
      &nbsp;
      </div>
    )
  }
})

// -TaskForm
const TaskForm = React.createClass({
  getInitialState(){
    return {author: '', text: ''}
  },
  handleAuthorChange(e){
    this.setState({author: e.target.value})
  },
  handleTextChange(e){
    this.setState({text: e.target.value})
  },
  handleSubmit(e){
    e.preventDefault()
    let
      author = this.state.author.trim(),
      text = this.state.text.trim()
    if(!author || !text) return
    this.props.onTaskSubmit({author, text})
    this.setState({author: '', text: ''})
  },
  render(){
    return (
      <form className="task-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Who are you?"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Whaddaya got to say?"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Add Task" />
      </form>
    )
  }
})

// ReactDOM render the stuff
ReactDOM.render(
  <MatrixBox />,
  document.getElementById('content')
)
