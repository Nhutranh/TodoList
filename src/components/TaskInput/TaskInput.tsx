import { useState } from 'react'
import styles from './TaskInput.module.scss'
import { Todo } from '../../@types/todo.type'

interface TaskInputProps {
  addTodo: (name: string) => void
  curentTodo: Todo | null
  editTodo: (name: string) => void
  finishEdit: () => void
}

export default function TaskInput(props: TaskInputProps) {
  const { addTodo, curentTodo, editTodo, finishEdit } = props
  const [name, setName] = useState<string>('')

  const hanldeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (curentTodo) {
      finishEdit()
      if (name) setName('')
    } else {
      addTodo(name)
      setName('')
    }
  }

  const onChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (curentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }

  return (
    <div>
      <h1 className={styles.title}> TodoList typescript</h1>
      <form className={styles.form} onSubmit={hanldeSubmit}>
        <input
          type='text'
          placeholder='caption...'
          value={curentTodo ? curentTodo.name : name}
          onChange={onChangeEvent}
        />
        <button type='submit'>{curentTodo ? '✔' : '➕'}</button>
      </form>
    </div>
  )
}
