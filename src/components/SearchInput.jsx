import React from 'react';
export const SearchInput = ({ onChange }) => {
  return (
    <React.Fragment>
      <input className='todo-search' onChange={onChange} ></input>
    </React.Fragment>
  )
}