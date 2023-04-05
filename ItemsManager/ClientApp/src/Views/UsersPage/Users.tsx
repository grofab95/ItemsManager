import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Column, useTable } from "react-table";
import BTable from "react-bootstrap/Table";
import User from "../../interfaces/Users/User";
import { useAppSelector } from "../../app/hooks";
import { ApplicationState } from "../../store";
import { shallowEqual, useSelector } from "react-redux";

const Users: React.FC = () => {
    const users = useSelector(
        (state: ApplicationState) => state.user.userList,
        shallowEqual
    );

    const columns = React.useMemo(
        () => [
            {
                Header: "Id",
                accessor: "id",
            } as Column,
            {
                Header: "Email",
                accessor: "email",
            } as Column,
            {
                Header: "Is Active",
                accessor: "isActive",
            } as Column,
            {
                Header: "Is Online",
                accessor: "isOnline",
            } as Column,
        ],
        []
    );

    // console.log("users:", users);

    const data = React.useMemo(() => users, [users]);

    // const data = React.useMemo(
    //     () => [
    //         {
    //             col1: "Hello",
    //             col2: "World",
    //         },
    //         {
    //             col1: "react-table",
    //             col2: "rocks",
    //         },
    //         {
    //             col1: "whatever",
    //             col2: "you want",
    //         },
    //     ],
    //     []
    // );

    const tableInstance = useTable({ columns, data });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

    return (
        // apply the table props
        <BTable {...getTableProps()}>
            <thead>
                {
                    // Loop over the header rows
                    headerGroups.map((headerGroup) => (
                        // Apply the header row props
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                // Loop over the headers in each row
                                headerGroup.headers.map((column) => (
                                    // Apply the header cell props
                                    <th {...column.getHeaderProps()}>
                                        {
                                            // Render the header
                                            column.render("Header")
                                        }
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
                {
                    // Loop over the table rows
                    rows.map((row) => {
                        // Prepare the row for display
                        prepareRow(row);
                        return (
                            // Apply the row props
                            <tr {...row.getRowProps()}>
                                {
                                    // Loop over the rows cells
                                    row.cells.map((cell) => {
                                        // Apply the cell props
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {
                                                    // Render the cell contents
                                                    cell.render("Cell")
                                                }
                                            </td>
                                        );
                                    })
                                }
                            </tr>
                        );
                    })
                }
            </tbody>
        </BTable>
    );
};

export default Users;
