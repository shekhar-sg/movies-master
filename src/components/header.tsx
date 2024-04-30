import {AppBar, Toolbar, Typography} from "@mui/material";

const Header = () => {
    return (
        <AppBar
            position={"sticky"}
            sx={{
                justifyContent: "center",
                alignItems: "center",
                height: "64px",
                backgroundColor: "black",
                color: "white",
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}>
            <Toolbar>
                <Typography variant={"h3"}>Movie Master</Typography>
            </Toolbar>
        </AppBar>
    )
        ;
};

export default Header;
