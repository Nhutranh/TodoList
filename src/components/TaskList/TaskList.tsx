import { Todo } from '../../@types/todo.type'
import styles from './TaskList.module.scss'

interface TaskListProps {
  doneTaskList: boolean
  todos: Todo[]
  hanldeDoneTodo: (id: string, done: boolean) => void
  startEdit: (id: string) => void
  deleteTodo: (id: string) => void
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, hanldeDoneTodo, startEdit, deleteTodo } = props

  const onChangeCheckbox = (idTodo: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    hanldeDoneTodo(idTodo, event.target.checked)
  }

  return (
    <div>
      <h2 className={styles.title}>{doneTaskList ? 'Hoàn thành' : ' Chưa hoàn thành'}</h2>
      <div className={styles.tasks}>
        {todos.map((item) => (
          <div key={item.id.toString()} className={styles.task}>
            <input
              type='checkbox'
              className={styles.taskCheckbox}
              checked={item.done}
              onChange={onChangeCheckbox(item.id.toString())}
            />
            <span className={`${styles.taskName} ${item.done ? styles.taskNameDone : ''}`}>{item.name}</span>
            <div className={styles.taskActions}>
              <button className={styles.taskBtn} onClick={() => startEdit(item.id)}>
                🖊
              </button>
              <button className={styles.taskBtn} onClick={() => deleteTodo(item.id)}>
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
