import { useCallback, useMemo } from 'react'

function Todo({ text, deleteTodo: deleteTodoProps, completeTodo: completeTodoProps, id, status }) {
  const deleteTodo = useCallback(
    e => {
      e.stopPropagation()
      deleteTodoProps(id)
    },
    [deleteTodoProps, id],
  )

  const completeTodo = useCallback(
    e => {
      completeTodoProps(id)
    },
    [completeTodoProps, id],
  )

  const todoClassname = useMemo(() => `todo ${status ? 'todo-active' : ''}`, [status])

  return (
    <div className={todoClassname} onClick={completeTodo}>
      <span>{text}</span>
      <span onClick={deleteTodo} className="removeIcon">
        x
      </span>
    </div>
  )
}

export default Todo
