import { Outlet, useLocation } from "react-router-dom";
import MainNav from "../components/ui/custom/navigation.tsx";
import Endbar from "../components/ui/custom/footer.tsx";


const BaseLayout = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const isSignupPage = location.pathname === "/signup";
    // const isHomePage = location.pathname === "/";
    const is404Page = location.pathname.includes('*');

    return (
        <>
            <MainNav />
            

            <main>
                <Outlet />
            </main>

            {!isLoginPage && !isSignupPage && !is404Page && <Endbar />}

        </>

    );
};

export default BaseLayout;