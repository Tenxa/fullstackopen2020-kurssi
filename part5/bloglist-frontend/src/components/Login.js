import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ setUser, createNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      createNotification('red', 'Wrong username or password')
    }
  }

  return (
    <div className="loginFormContainer">
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            id='username'
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            id='password'
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='loginButton' type="submit">login</button>
      </form>
    </div>
  )
}

export default Login