import { useState, createContext, useMemo, useContext } from 'react'
import TodoPage from './pages/TodoPage'
import LoginPage from './pages/LoginPage'
import './App.css'

export const LocationContext = createContext()

function getHref() {
  const { href } = window.location

  return href.split('/').splice(3).join('/')
}

function Route({ children, route }) {
  const { currentRoute } = useContext(LocationContext)

  if (currentRoute !== route) {
    return null
  }

  return children
}

function Switch({ children }) {
  return children[0]
}

function App() {
  const [currentRoute, setCurrentRoute] = useState(getHref())

  const contextValue = useMemo(
    () => ({ currentRoute, setCurrentRoute }),
    [currentRoute, setCurrentRoute],
  )

  return (
    <div className="app">
      <LocationContext.Provider value={contextValue}>
        <Switch>
          <Route route="">
            <TodoPage />
          </Route>
          <Route route="">
            <TodoPage />
          </Route>
          <Route route="">
            <TodoPage />
          </Route>
          <Route route="login">
            <LoginPage />
          </Route>
        </Switch>
      </LocationContext.Provider>
    </div>
  )
}

export default App
