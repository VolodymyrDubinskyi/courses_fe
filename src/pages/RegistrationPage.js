import { useContext, useCallback, useState } from 'react'
import { LocationContext } from '../App'

function RegistrationPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setCurrentRoute } = useContext(LocationContext)

  const goToLogin = useCallback(() => {
    setCurrentRoute('login')
  }, [setCurrentRoute])

  const onChangeEmail = useCallback(e => {
    setEmail(e.target.value)
  }, [])

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value)
  }, [])

  const register = useCallback(async () => {
    const res = await fetch('http://localhost:3010/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const result = await res.json()
  }, [email, password])

  return (
    <div className="login">
      <input value={email} onChange={onChangeEmail} />

      <input value={password} onChange={onChangePassword} />
      <button onClick={register}>Register</button>
      <span onClick={goToLogin} className="link">
        Go to login
      </span>
    </div>
  )
}

export default RegistrationPage
