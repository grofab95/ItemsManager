import * as React from "react";

import {
    Column,
    CompactTable,
} from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import { TableNode } from "@table-library/react-table-library/types/table";
import { useAppSelector } from "./app/hooks";
import { ApplicationState } from "./store";

const key = "Compact Table";

interface User {
    name: string;
    surname: string;
    age: number;
}

const nodes = [
    {
        id: "0",
        name: "Shopping List",
        deadline: new Date(2020, 1, 15),
        type: "TASK",
        isComplete: true,
        nodes: 3,
    },
    {
        id: "0",
        name: "Shopping List",
        deadline: new Date(2020, 1, 15),
        type: "TASK",
        isComplete: true,
        nodes: 3,
    },
    {
        id: "0",
        name: "Shopping List",
        deadline: new Date(2020, 1, 15),
        type: "TASK",
        isComplete: true,
        nodes: 3,
    },
];

const Home = () => {
    const data = { nodes };
    const theme = useTheme(getTheme());
    const dattt = [{}] as Column<TableNode>[];

    const COLUMNS = [
        { label: "Task", renderCell: (item) => item.name },
        {
            label: "Deadline",
            renderCell: (item) =>
                item.deadline.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }),
        },
        { label: "Type", renderCell: (item) => item.type },
        {
            label: "Complete",
            renderCell: (item) => item.isComplete.toString(),
        },
        { label: "Tasks", renderCell: (item) => item.nodes?.length },
    ] as Column<TableNode>[];

    return <CompactTable columns={COLUMNS} data={data} theme={theme} />;
};
export default Home;
