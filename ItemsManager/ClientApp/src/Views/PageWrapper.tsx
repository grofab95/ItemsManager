import { Card, Tab, Tabs } from "react-bootstrap";

interface Props {
    children: React.ReactNode;
}

const PageWrapper: React.FC<Props> = (props) => {
    return (
        <>
            <Card className="h-100">{props.children}</Card>
        </>
    );
};
export default PageWrapper;
