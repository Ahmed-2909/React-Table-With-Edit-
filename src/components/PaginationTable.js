import React, { useMemo, useState } from 'react'
import { useTable, usePagination, useGlobalFilter, useFilters } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import { GlobalFilter } from './GlobalFilter'
import './style.css'

const PaginationTable = () => {
    const [MockData, setMockData] = useState(MOCK_DATA)
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MockData, [MockData])
    const [editRow, setEditRow] = useState(null)
    const [editColumn, setEditColumn] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState("")
    const [objValue, setObjValue] = useState("")


    const editButtonHAndler = (id) => {
        setEdit(true);
        // console.log(id);
        setId(id);
    }

    const editHandler = (value, { row, column }, { id }) => {
        setInputValue(value)
        // console.log(value)
        setEditRow(row.index)
        // console.log(row.index)
        setEditColumn(column.id)
        setObjValue(column.id)
        // console.log(row.id)
    }
    const cancelHandler = () => {
        setEditRow(null);
        setEditColumn(null);
        // console.log("can");
        setEdit(false);
        // console.log(id);
    }
    const saveHandler = () => {
        // console.log(inputValue);
        const i = MockData.findIndex(x => x.id === +id + 1)
        // console.log(i);
        const allData = [...MockData]
        allData[i][objValue] = inputValue;
        setMockData(allData);
        // console.log(MockData);
        setEdit(false);

    }

    const inputValueTag = () => {
        // console.log(inputValue);

    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        prepareRow,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
        },

        useFilters,
        useGlobalFilter, usePagination,
    )
    const { pageIndex } = state
    const { globalFilter } = state

    // console.log(inputValue);

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                            <th>Action</th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (

                                    <td
                                        {...cell.getCellProps()}
                                        onClick={() => editHandler(cell.value, cell, row.original)}
                                    >
                                        {editRow === row.index && editColumn === cell.column.id && edit === true && editRow === +id ? (
                                            <> <input
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onMouseDown={inputValueTag}
                                            />
                                                <button onMouseDown={saveHandler}>Save</button>
                                                <button onMouseDown={cancelHandler}>Cancel</button>
                                            </>
                                        ) : (
                                            cell.render('Cell')
                                        )}
                                    </td>
                                ))}
                                <td>
                                    <button onClick={() => editButtonHAndler(row.id)}>Edit</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </button>
                <span>
                    {' '}
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
            </div>
        </>
    )
}

export default PaginationTable
