import {v4 as uuidv4} from 'uuid'

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

const list = document.getElementById('list') as HTMLUListElement
const formElm = document.getElementById('new-task-form') as HTMLFormElement | null
const title = document.getElementById('new-task-title') as HTMLInputElement
const searchform = document.getElementById('search-form') as HTMLFormElement
const serachInput = document.getElementById('search-input') as HTMLInputElement


const tasks: Task[] = loadTasks()
tasks.forEach(addTask)


searchform?.addEventListener('input', (e)=>{
  e.preventDefault()
  if(serachInput.value == '' || serachInput.value == null) return
  const inputVal: string = serachInput.value.toLowerCase()
  const li = document.querySelectorAll('li label') as NodeListOf<HTMLLIElement>

  li.forEach(item =>{
    if(item.textContent?.includes(inputVal)){
      item.parentElement?.classList.remove('notfound')

    }else{
      item.parentElement?.classList.add('notfound')
    }
  })
})


formElm?.addEventListener('submit', e=>{
  e.preventDefault()
  if(title?.value == '' || title?.value == null) return

  const newTask: Task ={
    id: uuidv4(),
    title: title.value,
    completed: false,
    createdAt: new Date()
  }

  tasks.push(newTask)
saveTask()

  addTask(newTask)
  title.value = ''
})

function addTask(task: Task){
  const item = document.createElement('li')
  const label = document.createElement('label')
  const checkbox = document.createElement('input')
  checkbox.type= 'checkbox'
  checkbox.checked = task.completed

  checkbox.addEventListener('change', ()=>{
    task.completed = checkbox.checked
    saveTask()
  })
  label.append(task.title)
  item.append(checkbox)
  item.append(label)
  list?.append(item)
}

function saveTask (){
  localStorage.setItem('TASKS', JSON.stringify(tasks))
}

function loadTasks(): Task[]{
  const tasksJson = localStorage.getItem('TASKS')
  if(tasksJson == null) return []
  return JSON.parse(tasksJson)
}