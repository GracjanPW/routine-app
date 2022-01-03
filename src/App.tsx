import React from 'react';
import './App.css';


interface Task {
  todo: string,
  done: boolean
}
interface TodoProps {
  task: Task,
  index: number,
  check: (index: number) => void
}

interface AddFormProps {
  open: boolean,
  toggle: () => void,
  add: (todo: string) => void
}

const Todo = ({task,index,check}: TodoProps) =>{
  return (
    <li>{task.todo}<span onClick={()=>check(index)} className='check'>{task.done?'/':' '}</span></li>
  )
}

const AddForm = ({open,toggle,add}: AddFormProps) =>{
  return (
    <div onClick={toggle} className={'add-prompt'+ (open?'':' toggle-off')}>
        <input type="text" name='text' />
    </div>
  )
}

export const App = () => {
  const [tasks,setTasks] = React.useState([
    {
      todo: "go outside",
      done: false,
    },
    {
      todo: "go outside",
      done: false,
    }
  ])
  const [open, setOpen] = React.useState(false)
  const toggleOff = React.useCallback(() => setOpen(false),[])
  const check = React.useCallback((index: number) =>{
    console.log('check')
    let newTasks = [...tasks]
    newTasks[index].done = !newTasks[index].done
    console.log(newTasks[index])
    setTasks(newTasks)
  },[tasks]
  )
  const add = (todo: string) =>{
    setTasks([...tasks,{todo,done:false}])
  }

  return (
    <div>
      <div className="board">
      <header className='header'>Task List</header>
      <span onClick={()=>setOpen(true)} className='add'>+</span>
      <ul className='list'>
        {tasks.map((task,index)=> <Todo key={index} task={task} index={index} check={check}/>)}
      </ul>
      </div>
      <AddForm open={open} toggle={toggleOff} add={add}/>
    </div>
    


  );
}

export default App;
