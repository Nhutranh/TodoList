import { useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './Todolist.module.scss'
import { Todo } from '../../@types/todo.type'

export default function Todolist() {
  const [todo, setTodo] = useState<Todo[]>([])
  const [curentTodo, setCrurentTodo] = useState<Todo | null>(null)

  const doneTodo = todo.filter((todo) => todo.done)
  const notDoneTodo = todo.filter((todo) => !todo.done)

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodo((prev) => [...prev, todo])
  }

  const hanldeDoneTodo = (id: string, done: boolean) => {
    setTodo((prev) => {
      return todo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }

  const startEdit = (id: string) => {
    const findTodo = todo.find((todo) => todo.id === id)
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
    setTodo((prev) => {
      return prev.map((todo) => {
        if (todo.id === (curentTodo as Todo).id) {
          return curentTodo as Todo
        }
        return todo
      })
    })
    setCrurentTodo(null)
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} curentTodo={curentTodo} editTodo={editTodo} finishEdit={finishEdit} />
        <TaskList doneTaskList={false} todos={notDoneTodo} hanldeDoneTodo={hanldeDoneTodo} startEdit={startEdit} />
        <TaskList doneTaskList todos={doneTodo} hanldeDoneTodo={hanldeDoneTodo} startEdit={startEdit} />
      </div>
    </div>
  )
}
