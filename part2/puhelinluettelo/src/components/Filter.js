import React from 'react'

const Filter = ({ filterText, handleChangeFilterText }) => <div>Filter: <input value={filterText} onChange={handleChangeFilterText} /></div>

export default Filter