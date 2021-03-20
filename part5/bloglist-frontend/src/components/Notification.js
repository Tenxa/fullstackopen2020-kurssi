import React from 'react'

const Notification = ({ message, color }) => {
  const notificationBase = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    visibility: 'visible',
    transitionProperty: 'visibility',
    transitionDuration: '3s',
  }
  const notificationGreenStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const notificationRedStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  if (color === 'green' && message) {
    return (
      <div className="notification" style={notificationGreenStyle}>
        {message}
      </div>
    )
  }

  if (color === 'red' && message) {
    return (
      <div className="notification" style={notificationRedStyle}>
        {message}
      </div>
    )
  }

  return (
    <div className="notification" style={notificationBase}>
      {message}
    </div>
  )
}

export default Notification