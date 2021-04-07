
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = ({ show, setShow }) => {

  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const ShowNotification = () => {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }

  return (
    show === false ? null :
      <ShowNotification />
  )
}

export default Notification