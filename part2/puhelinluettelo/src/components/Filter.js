import React from 'react'

const Filter = ({ filterText, handleChangeFilterText }) => <div><form>Filter: <input value={filterText} onChange={handleChangeFilterText} /></form></div>

export default Filter