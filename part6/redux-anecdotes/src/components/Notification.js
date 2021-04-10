
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  //const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const styleHide = {
    display: 'none'
  }

  return (
    props.notification === ''
      ? <div style={styleHide}>
        {props.notification}
      </div>

      : <div style={style}>
        {props.notification}
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotifications = connect(mapStateToProps)(Notification)

export default ConnectedNotifications