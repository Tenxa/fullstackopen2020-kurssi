import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'
//import { useDispatch } from 'react-redux'

const Filter = (props) => {
  //const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const filterInput = event.target.value
    props.filterChange(filterInput)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name='filter' onChange={handleChange} />
    </div>
  )
}

export default connect(
  null,
  { filterChange }
)(Filter)