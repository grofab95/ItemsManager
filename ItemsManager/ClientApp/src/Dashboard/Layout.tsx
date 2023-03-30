import { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ensureNonExpiredTokens from "../utils/ensureNonExpiredTokens";
import AuthenticationHoc from "./AuthenticationHoc";

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
    useEffect(() => {
        ensureNonExpiredTokens();
    }, []);

    return (
        <AuthenticationHoc>
            <header>
                <Header />
            </header>
            <main>{props.children}</main>
            <footer>
                <Footer />
            </footer>
        </AuthenticationHoc>
    );
};
export default Layout;
