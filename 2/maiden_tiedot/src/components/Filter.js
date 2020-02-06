import React from "react";

const Filter = ({filter, setFilter}) => {


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <p>Filter names</p>
      <form>
        <input value={filter} onChange={handleFilterChange}>
        </input>
      </form>
    </div>
  )
}

export default Filter