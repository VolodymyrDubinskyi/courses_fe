import { useContext, useCallback, useState } from 'react'
import { LocationContext } from '../App'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setCurrentRoute } = useContext(LocationContext)

  const goToRegistration = useCallback(() => {
    setCurrentRoute('registration')
  }, [setCurrentRoute])

  const onChangeEmail = useCallback(e => {
    setEmail(e.target.value)
  }, [])

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value)
  }, [])

  const login = useCallback(async () => {
    const res = await fetch('http://localhost:3010/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    const result = await res.json()

    localStorage.setItem('accessToken', result.token)

    localStorage.setItem('refreshToken', result.refreshToken)
    setCurrentRoute('')
  }, [email, password, setCurrentRoute])

  return (
    <div className="login">
      <input value={email} onChange={onChangeEmail} />

      <input value={password} onChange={onChangePassword} />
      <button onClick={login}>Login</button>
      <span onClick={goToRegistration} className="link">
        Go to registration
      </span>
    </div>
  )
}

export default LoginPage
