// -Categories (4)
// (urgent/important, urgent/unimportant, non-urgent/important, non-urgent/unimportant)
const Category = React.createClass({
  handleTaskDelete(taskId){
    this.props.onListTaskDelete(taskId)
  },
  handleTaskChange(taskId, categoryId){
    this.props.onListTaskChange(taskId, categoryId)
  },
  render(){
    let opts = {}
    function predicate(condition, test){
      if (condition){
        return () => test
      }
      return () => true
    }
    const taskNodes = this.props.data
      // .filter((task, index) => {
      //   return predicate(
      //     !this.props.isLast,
      //     parseInt(task.category, 10) === index + 1)()
      // })
      .map((task, index) => {
        return (
          <Task
            author={task.task.author}
            text={task.task.text}
            key={task.task.id}
            taskKey={task.task.id}
            onTaskChange={this.handleTaskChange}
            onTaskDelete={this.handleTaskDelete}
            category={task.category}
          />
        )
      })
    return (
      <div className="category">
        <h2>{this.props.categoryTitle}</h2>
        {taskNodes}
      </div>
    )
  }
})

// -MatrixBox
const MatrixBox = React.createClass({
  getInitialState(){
    return {
      taskData: [],
      categoryData: [
        {name: 'urgent/important (1)'},
        {name: 'non-urgent/important (2)'},
        {name: 'urgent/unimportant (3)'},
        {name: 'non-urgent/unimportant (4)'},
        {name: 'no label'}
      ]}
  },
  handleListTaskDelete(taskId){
    const tasks = this.state.taskData
    const newTasks = tasks.filter(task => (task.task.id !== taskId))
    this.setState({taskData: newTasks})
  },
  handleListTaskChange(taskId, categoryId){
    const tasks = this.state.taskData
    const newTasks = tasks.map(task => {
      if (task.task.id !== taskId) return task
      task.task.category = categoryId
      return task
    })
    this.setState({taskData: newTasks})
  },
  handleTaskSubmit(task){
    const tasks = this.state.taskData
    task.id = Date.now()
    const newTasks = tasks.concat([{task, category: ''}])
    this.setState({taskData: newTasks})
  },
  render(){
    console.log(this.state.taskData)
    const categoryNodes = this.state.categoryData.map((category, index, arr)=>{
      return (
        <Category
          categoryTitle={category.name}
          key={index}
          categoryKey={index}
          onListTaskDelete={this.handleListTaskDelete}
          onListTaskChange={this.handleListTaskChange}
          isLast={(index + 1 >= arr.length)}
          data={this.state.taskData}
        />
      )
    })
    return (
      <div className="matrixBox">
        {categoryNodes}
        <TaskForm onTaskSubmit={this.handleTaskSubmit} />
      </div>
    )
  }
})

// -Tasks
const Task = React.createClass({
  getInitialState(){
    return {category: ''}
  },
  handleDeletePress(e){
    e.preventDefault()
    this.props.onTaskDelete(this.props.taskKey)
  },
  handleCategoryChange(e){
    this.setState({category: e.target.value})
    this.props.onTaskChange(this.props.taskKey, e.target.value)
  },
  render(){
    let category = this.state.category
    if(category !== ''
        && parseInt(category, 10) < 5
        && parseInt(category, 10) > 0
      ) {
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
          placeholder="Category #"
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
      <form className="taskForm" onSubmit={this.handleSubmit}>
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
