import { useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './Todolist.module.scss'
import { Todo } from '../../@types/todo.type'

export default function Todolist() {
  const [todo, setTodo] = useState<Todo[]>([])

  const doneTodo = todo.filter((todo) => todo.done)
  const notDoneTodo = todo.filter((todo) => !todo.done)

  const addTodo = (name: String) => {
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

  console.log({ todo })

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} />
        <TaskList doneTaskList={false} todos={notDoneTodo} hanldeDoneTodo={hanldeDoneTodo} />
        <TaskList doneTaskList todos={doneTodo} hanldeDoneTodo={hanldeDoneTodo} />
      </div>
    </div>
  )
}
