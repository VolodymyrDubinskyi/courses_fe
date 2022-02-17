import React, { useState, createContext, useMemo, useContext, useEffect, useCallback } from 'react'
import TodoPage from './pages/TodoPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
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

function App() {
  const [currentRoute, setCurrentRoute] = useState(getHref())

  const contextValue = useMemo(
    () => ({ currentRoute, setCurrentRoute }),
    [currentRoute, setCurrentRoute],
  )

  const refresh = useCallback(async () => {
    const token = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const res = await fetch('http://localhost:3010/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ refreshToken }),
    })
    const result = await res.json()

    localStorage.setItem('accessToken', result.token)

    localStorage.setItem('refreshToken', result.refreshToken)
  }, [])

  useEffect(() => {
    setInterval(refresh, 300000)
  }, [])

  return (
    <div className="app">
      <LocationContext.Provider value={contextValue}>
        <Route route="">
          <TodoPage />
        </Route>
        <Route route="login">
          <LoginPage />
        </Route>
        <Route route="registration">
          <RegistrationPage />
        </Route>
      </LocationContext.Provider>
    </div>
  )
}

export default App
