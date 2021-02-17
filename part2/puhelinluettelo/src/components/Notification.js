import React from 'react'


const Notification = ({ message }) => {

    const notificationAddStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const notificationDelStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }


    if (message === '') {
        return null
    }


    if (message.includes('Deleted') || message.includes('Information') || message.includes("failed")) {
        return (
            <div className="notification" style={notificationDelStyle}>
                {message}
            </div>
        )
    }
    

    return (
        <div className="notification" style={notificationAddStyle}>
            {message}
        </div>
    )
}



export default Notification