import React, { useState } from "react";
import { Table } from "react-bootstrap";

interface User {
    name: string;
    surname: string;
    age: number;
    email: string;
    [key: string]: any;
}

const users: User[] = [
    {
        name: "John",
        surname: "Doe",
        age: 30,
        email: "john.doe@example.com",
    },
    {
        name: "Jane",
        surname: "Doe",
        age: 28,
        email: "jane.doe@example.com",
    },
    {
        name: "Bob",
        surname: "Smith",
        age: 45,
        email: "bob.smith@example.com",
    },
    {
        name: "Alice",
        surname: "Johnson",
        age: 27,
        email: "alice.johnson@example.com",
    },
    {
        name: "David",
        surname: "Lee",
        age: 38,
        email: "david.lee@example.com",
    },
    {
        name: "Emily",
        surname: "Wang",
        age: 32,
        email: "emily.wang@example.com",
    },
    {
        name: "Tom",
        surname: "Wilson",
        age: 50,
        email: "tom.wilson@example.com",
    },
    {
        name: "Kate",
        surname: "Brown",
        age: 26,
        email: "kate.brown@example.com",
    },
    {
        name: "Chris",
        surname: "Johnson",
        age: 42,
        email: "chris.johnson@example.com",
    },
    {
        name: "Megan",
        surname: "Davis",
        age: 31,
        email: "megan.davis@example.com",
    },
];

const Users: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(4);
    const [sortField, setSortField] = useState<string>("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const sortedUsers = currentUsers.sort((a, b) => {
        if (sortOrder === "asc") {
            return a[sortField] > b[sortField] ? 1 : -1;
        } else {
            return a[sortField] < b[sortField] ? 1 : -1;
        }
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => (
        <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
        >
            <a
                href="#"
                className="page-link"
                onClick={() => setCurrentPage(number)}
            >
                {number}
            </a>
        </li>
    ));

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th onClick={() => handleSort("name")}>Name</th>
                    <th onClick={() => handleSort("surname")}>Surname</th>
                    <th onClick={() => handleSort("age")}>Age</th>
                    <th onClick={() => handleSort("email")}>Email</th>
                </tr>
            </thead>
            <tbody>
                {sortedUsers.map((user) => (
                    <tr key={user.email}>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.age}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={4}>
                        <nav>
                            <ul className="pagination justify-content-center">
                                {renderPageNumbers}
                            </ul>
                        </nav>
                    </td>
                </tr>
            </tfoot>
        </Table>
    );
};

export default Users;
