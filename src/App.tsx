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
  remove: (index: number) => void
}

interface AddFormProps {
  open: boolean,
  toggle: () => void,
  add: (todo: string) => void
  
}


const Todo = ({task,index,check,remove}: TodoProps) =>{
  return (
    <li>{task.todo}
      <span className='right'>
        <span onClick={()=>check(index)} className='check click'>{task.done?'/':' '}</span>
        
        <span onClick={()=>remove(index)} className='click'> [X]</span>
      </span>
    </li>
  )
}

const AddForm = ({open,toggle,add}: AddFormProps) =>{
  const [text, setText] = React.useState('')
  const close = (event:React.MouseEvent) =>{
    if (event.target === event.currentTarget){
      toggle()
    }
  }
  const add_tgl = () => {add(text);toggle()}
  return (
    <div onClick={close} className={'add-prompt'+ (open?'':' toggle-off')}>
        <div className='add-box'>
          <input type="text" name='text' value={text} onChange={(e)=>setText(e.target.value)}/>
          <input type="button" value="Add" onClick={()=>text.length>0?add_tgl():alert('no task was entered')}/>
        </div>
        
    </div>
  )
}

export const App = () => {
  const [tasks,setTasks] = React.useState<Task[]>([])
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
  const remove = (index:number) =>{
    setTasks(prev=>{
      let tasks = [...prev]
      tasks.splice(index,1)
      return tasks
    })
  }

  return (
    <div>
      <div className="board">
      <header className='header'>Task List</header>
      <span onClick={()=>setOpen(true)} className='add click'>+</span>
      <ul className='list'>
        {tasks.map((task,index)=> <Todo key={index} task={task} index={index} check={check} remove={remove}/>)}
      </ul>
      </div>
      <AddForm open={open} toggle={toggleOff} add={add}/>
    </div>
    


  );
}

export default App;
