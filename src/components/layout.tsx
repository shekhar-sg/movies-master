import {Box, BoxProps, styled} from "@mui/material";
import Header from "./header.tsx";
import {ReactNode} from "react";
import Sidebar, {useSidebar} from "./sidebar.tsx";

export interface LayoutProps {
    children: ReactNode
}

const Layout = (props: LayoutProps) => {
    const {children} = props

    return (
        <>
            <Header/>
            <Sidebar/>
            <Main>
                {children}
            </Main>
        </>
    );
};

export default Layout;

export const drawerWidth = 320;

const Main = styled((props: BoxProps) => {
    const {isOpen} = useSidebar()
    return <Box
        component={"main"}
        sx={(theme) => ({
            p: 3,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: 0,
            ...(isOpen && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: `${drawerWidth}px`,
            }),
        })}
        {...props}/>
})({});