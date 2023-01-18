import './App.css';
import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


/// COMPONENTS
import AddTaskForm from './components/AddTaskForm.jsx'
import UpdateTaskForm from './components/UpdateTaskForm.jsx'
import ToDo from './components/ToDo.jsx'

function App() {
      ///////BODY STYLE..//////
  document.body.style.backgroundColor = "#333";
  document.body.style.color = "#fff";
      ///////BODY STYLE..//////

      //Tasks state
  const [toDo , setToDo] = useState( [])   
  
  //temp state
  const [newTask , setNewTask]= useState('');
  const [updateData, setUpdateData]=useState('');

  //Add TASK
  const addTask=()=> {

      if(newTask) {

        let num = toDo.length + 1 ; // increacses new entry number
        let newEntry = {id : num , title:newTask , status:false} //creates new task object
        setToDo([...toDo ,newEntry ]) //add to new task to toDO`s array
        setNewTask("");//clears the input

      }

  }

  //Delete Task
  const deleteTask=(id)=> {

    let newTasks = toDo.filter( task => task.id !== id )
    setToDo(newTasks)



  }

  //mark task as done 
  const  markDone=(id)=> {

    let newTask = toDo.map(task => {
      if(task.id == id ){

        return ({...task , status: !task.status})
      }
      return task ;
     
    })
    setToDo(newTask)


  }
  //Cancel Upate
  const  cancelUpdate=()=> {

    setUpdateData('')

  }

  //Change task for update
  const  changeTask=(e)=> {

     let  newEntry = {
       id: updateData.id ,
       title :  e.target.value,
       status :  updateData.status ? true : false
     }
     setUpdateData(newEntry)
  }
  //Update task
  const  updateTask=()=> {

      let filterRecords = [...toDo].filter(task => task.id !== updateData.id)
      let updatedObject= [...filterRecords, updateData]
      setToDo(updatedObject)
      setUpdateData('');
  }



  return (

    <div className="container App">

      <h1 className='headTitle'> To Do List</h1>

      {updateData && updateData ? (
       
        
               
          <UpdateTaskForm
            updateData = {updateData}
            changeTask = {changeTask}
            updateTask = {updateTask}
            cancelUpdate = {cancelUpdate}

           />
      ) : (

         


<AddTaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        />
      
    )}
  
      {/* {Displat Todos} */}

      {toDo && toDo.length ? "" : "No tasks..."}

      <ToDo
      toDo={toDo}
      markDone={markDone}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
       />  
      
    </div>
  );
}

export default App;
