import Footer from "./Footer";
import Header from "./Header";
import AuthenticationHoc from "./AuthenticationHoc";
import PageWrapper from "../Views/PageWrapper";

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
    return (
        <AuthenticationHoc>
            <header>
                <Header />
            </header>
            <main>
                <PageWrapper>{props.children}</PageWrapper>
            </main>
            <footer>
                <Footer />
            </footer>
        </AuthenticationHoc>
    );
};
export default Layout;
