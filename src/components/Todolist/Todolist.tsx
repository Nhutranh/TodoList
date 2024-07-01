import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './Todolist.module.scss'
import { Todo } from '../../@types/todo.type'

interface HandleNewTodo {
  (todos: Todo[]): Todo[]
}

const syncReactToLocal = (handleNewTodo: HandleNewTodo) => {
  const todoString = localStorage.getItem('todos')
  const todoObj: Todo[] = JSON.parse(todoString || '[]')
  const newTodoObj = handleNewTodo(todoObj)
  localStorage.setItem('todos', JSON.stringify(newTodoObj))
}

export default function Todolist() {
  const [todos, setTodo] = useState<Todo[]>([])
  const [curentTodo, setCrurentTodo] = useState<Todo | null>(null)
  const doneTodo = todos.filter((todo) => todo.done)
  const notDoneTodo = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todoString = localStorage.getItem('todos')
    const todoObj: Todo[] = JSON.parse(todoString || '[]')
    setTodo(todoObj)
  }, [])

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    const handler = (todoObj: Todo[]) => {
      return [...todoObj, todo]
    }
    setTodo((prev) => [...prev, todo])
    syncReactToLocal(handler)
  }

  const hanldeDoneTodo = (id: string, done: boolean) => {
    setTodo((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }

  const startEdit = (id: string) => {
    const findTodo = todos.find((todo) => todo.id === id)
    if (findTodo) {
      setCrurentTodo(findTodo)
    }
  }

  const editTodo = (name: string) => {
    setCrurentTodo((prev) => {
      if (prev) return { ...prev, name }
      return null
    })
  }

  const finishEdit = () => {
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === (curentTodo as Todo).id) {
          return curentTodo as Todo
        }
        return todo
      })
    }
    setTodo(handler)
    setCrurentTodo(null)
    syncReactToLocal(handler)
  }

  const deleteTodo = (id: string) => {
    if (curentTodo) {
      setCrurentTodo(null)
    }
    const handler = (todoObj: Todo[]) => {
      const findIndex = todoObj.findIndex((todo) => todo.id === id)
      if (findIndex != -1) {
        const result = [...todoObj]
        result.splice(findIndex, 1)
        return result
      }
      return todoObj
    }
    setTodo(handler)
    syncReactToLocal(handler)
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} curentTodo={curentTodo} editTodo={editTodo} finishEdit={finishEdit} />
        <TaskList
          doneTaskList={false}
          todos={notDoneTodo}
          hanldeDoneTodo={hanldeDoneTodo}
          startEdit={startEdit}
          deleteTodo={deleteTodo}
        />
        <TaskList
          doneTaskList
          todos={doneTodo}
          hanldeDoneTodo={hanldeDoneTodo}
          startEdit={startEdit}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}
