import React from 'react'
import loginService from '../services/login'

const Login = ({ username, password, setUsername, setPassword, setUser }) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // tänne setErrormessage notifikaatioille myöhemmin.
      console.log('wrong credentials')
      setTimeout(() => {
        // tänne errormessage nullaus
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Log in to application</h1>

      <div className="formContainer">
        <form onSubmit={handleLogin}>
          <div>
            username
          <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
          <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    </div>
  )
}

export default Login