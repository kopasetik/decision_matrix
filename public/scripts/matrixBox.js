// -MatrixBox
const MatrixBox = React.createClass({
  getInitialState(){
    return {
      taskData: JSON.parse(localStorage.getItem('taskData')),
      categoryData: [
        {name: '(1) urgent/important'},
        {name: '(2) non-urgent/important'},
        {name: '(3) urgent/unimportant'},
        {name: '(4) non-urgent/unimportant'},
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
    const newTasks = tasks.concat([{task}])
    this.setState({taskData: newTasks})
  },
  render(){
    localStorage.setItem('taskData', JSON.stringify(this.state.taskData))
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
