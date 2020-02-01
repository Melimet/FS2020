import React from "react";

const Filter = ({newFilter, setNewFilter}) => {


  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <p>Filter names</p>
      <form>
        <input value={newFilter} onChange={handleFilterChange}>
        </input>
      </form>
    </div>
  )
}

export default Filter