

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
    const taskNodes = this.props.data
        .map((task, index) => {
          const category = parseInt(task.task.category, 10) || '#'
          return (
            <Task
              author={task.task.author}
              text={task.task.text}
              date={task.task.date}
              key={task.task.id}
              taskKey={task.task.id}
              onTaskChange={this.handleTaskChange}
              onTaskDelete={this.handleTaskDelete}
              itemCategory={category}
              hide={
                (category !==
                  (this.props.categoryKey + 1) &&
                  !this.props.isLast) ||
                (this.props.isLast && category > 0 && category < 5)
              }
            />
          )
        })
    return (
      <div className={'category' + (this.props.isLast ? ' last': ' quadrantBox')}>
        <h2>{this.props.categoryTitle}</h2>
        {taskNodes}
      </div>
    )
  }
})

// -Tasks
const Task = React.createClass({
  handleDeletePress(e){
    e.preventDefault()
    this.props.onTaskDelete(this.props.taskKey)
  },
  handleCategoryChange(e){
    this.props.onTaskChange(this.props.taskKey, e.target.value)
  },
  render(){
    if(this.props.hide) return (null)
    return (
      <div className="task">
      {this.props.author}&nbsp;
      {this.props.text}&nbsp;
      Due date:&nbsp;{this.props.date}&nbsp;
      <form onSubmit={this.handleDeletePress}>
        <input
          type="text"
          placeholder="Category #"
          value={this.props.itemCategory}
          onChange={this.handleCategoryChange}
          maxLength="1"
        />
        <button>Delete</button>&nbsp;
      </form>
      &nbsp;
      </div>
    )
  }
})

// -TaskForm
const TaskForm = React.createClass({
  getInitialState(){
    return {
      author: '',
      text: '',
      date: this.todaysDate
    }
  },
  todaysDate: (()=>(new Date().toISOString()))().slice(0,10),
  handleAuthorChange(e){
    this.setState({author: e.target.value})
  },
  handleTextChange(e){
    this.setState({text: e.target.value})
  },
  handleDateChange(e){
    console.log(e.target.value)
    this.setState({date: e.target.value})
  },
  handleSubmit(e){
    e.preventDefault()
    let
      author = this.state.author.trim(),
      text = this.state.text.trim(),
      date = this.state.date.slice(5,10)
    if(!author || !text) return
    this.props.onTaskSubmit({author, text, category: '#', date})
    this.setState({
      author: '',
      text: '',
      date: this.todaysDate
    })
  },
  render(){
    return (
      <div className="taskForm">
        <form onSubmit={this.handleSubmit}>
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
          <input
            type="date"
            value={this.state.date}
            onChange={this.handleDateChange}
          />
          <input type="submit" value="Add Task" />
        </form>
      </div>
    )
  }
})
