import React from 'react'

export const ColumnFilter = ({ column }) => {
    const {filterValue,setFilterValue} = column
    return (
        <span>
            Search:{' '}
            <input value={filterValue || ""} onChange={e => setFilterValue(e.target.value)} />
        </span>
    )
}