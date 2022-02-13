import { useCallback, useState, useEffect, useContext } from 'react'
import Todo from '../components/Todo'
import { LocationContext } from '../App'

function TodoPage() {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])
  const [error, setError] = useState()
  const { setCurrentRoute } = useContext(LocationContext)

  const onInputChange = useCallback(e => {
    const value = e.target.value

    setInputValue(value)
  }, [])

  const addTodo = useCallback(async () => {
    if (!inputValue) {
      return
    }

    const newTodo = {
      text: inputValue,
    }

    const res = await fetch('http://localhost:3010/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })

    const result = await res.json()

    setTodos(t => [...t, result])
    setInputValue('')
  }, [inputValue])

  const deleteTodo = useCallback(async id => {
    await fetch(`http://localhost:3010/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    setTodos(ts => ts.filter(t => t.id !== id))
  }, [])

  const addTodoByKey = useCallback(
    e => {
      if (e.charCode === 13) {
        addTodo()
      }
    },
    [addTodo],
  )

  const completeTodo = useCallback(id => {
    setTodos(ts => ts.map(t => (t.id === id ? { ...t, status: !t.status } : t)))
  }, [])

  const getTodos = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3010/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await res.json()

      setTodos(result)
    } catch (err) {
      setError(err.message)
    }
  }, [])

  const logout = useCallback(() => {
    setCurrentRoute('login')
  })

  useEffect(() => {
    getTodos()
  }, [getTodos])

  return (
    <div className="todos">
      <div className="add-todo-form">
        <input onChange={onInputChange} value={inputValue} onKeyPress={addTodoByKey} />
        <button onClick={addTodo}>Add todo!</button>
      </div>
      {error ? <span className="error">{error}</span> : null}
      {todos.map(t => (
        <Todo
          status={t.status}
          completeTodo={completeTodo}
          text={t.text}
          key={t.id}
          id={t.id}
          deleteTodo={deleteTodo}
        />
      ))}
      <div className="logout" onClick={logout}>
        LOGOUT
      </div>
    </div>
  )
}

export default TodoPage
