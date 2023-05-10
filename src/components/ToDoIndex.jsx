import {useState} from 'react'
import AddTaskForm from './To_Do/AddTaskForm'
import UpdateForm from './To_Do/UpdateForm.jsx'
import ToDo from './To_Do/ToDo.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'

function ToDoIndex() {

  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([])

  // Temp State
  const [newTask, setNewTask] = useState('')
  const [updateData, setUpdateData] = useState('')

  // Add task 
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1 
      setToDo([
        ...toDo, 
        { id: num, title: newTask, status: false }
      ])

      setNewTask('')
    }
  }

  // Delete task 
  const deleteTask = (id) => {
    setToDo(toDo.filter(task => task.id !== id))
  }

  // Mark task as done or completed
  const markDone = (id) => {
    setToDo(toDo.map(
      task => task.id === id 
      ? ({ ...task, status: !task.status }) 
      : (task) 
    ))
  }

  // Cancel update
  const cancelUpdate = () => {
    setUpdateData('')
  }

  // Change task for update
  const changeHolder = (e) => {
    setUpdateData({...updateData, title: e.target.value})
  }

  const updateTask = () => {
    let removeOldRecord = [...toDo].filter(task => task.id !== updateData.id)
    setToDo([
      ...removeOldRecord, 
      updateData
    ])
    
    setUpdateData('')
  }

  return (
    <div>
      <h2>To Do List</h2>

    {updateData && updateData ? (
      <UpdateForm 
        updateData={updateData}
        changeHolder={changeHolder}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
      />
    ) : (
      <AddTaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />
    )}

    {toDo && toDo.length ? '' : 'No Tasks...'}

    <ToDo
      toDo={toDo}
      markDone={markDone}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
    />  

    </div>
  );
}

export default ToDoIndex;