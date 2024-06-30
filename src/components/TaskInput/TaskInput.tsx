import { useState } from 'react'
import styles from './TaskInput.module.scss'

interface TaskInputProps {
  addTodo: (name: String) => void
}

export default function TaskInput(props: TaskInputProps) {
  const { addTodo } = props
  const [name, setName] = useState<string>('')
  const hanldeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addTodo(name)
    setName('')
  }
  const onChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setName(value)
  }
  return (
    <div>
      <h1 className={styles.title}> TodoList typescript</h1>
      <form className={styles.form} onSubmit={hanldeSubmit}>
        <input type='text' placeholder='caption...' value={name} onChange={onChangeEvent} />
        <button type='submit'>➕</button>
      </form>
    </div>
  )
}
