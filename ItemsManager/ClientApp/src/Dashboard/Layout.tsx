import Footer from "./Footer";
import Header from "./Header";

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
    return (
        <>
            <header>
                <Header />
            </header>
            <main>{props.children}</main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};
export default Layout;
