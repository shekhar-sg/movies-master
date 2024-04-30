import {Box, BoxProps, styled, Theme, ThemeProvider, useMediaQuery, useTheme} from "@mui/material";
import Header from "./header.tsx";
import {ReactNode} from "react";
import Sidebar, {useSidebar} from "./sidebar.tsx";

export interface LayoutProps {
    children: ReactNode
}

const Layout = (props: LayoutProps) => {
    const {children} = props
    const theme = useTheme()

    return (
        <ThemeProvider
            theme={theme}
        >
            <Header/>
            <Sidebar/>
            <Main>
                {children}
            </Main>
        </ThemeProvider>
    );
};

export default Layout;

export const drawerWidth = 320;

const Main = styled((props: BoxProps) => {
    const {isOpen} = useSidebar()
    const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"))
    return <Box
        component={"main"}
        sx={(theme) => ({
            position: "relative",
            p: 3,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: 0,
            ...((isOpen) && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: isOpen&&!isMobile?`${drawerWidth}px`:0,
            }),
        })}
        {...props}/>
})({});