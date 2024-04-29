import {AppBar, Typography} from "@mui/material";

const Header = () => {
    return (
        <AppBar sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "64px",
            backgroundColor: "black",
            color: "white",

        }}>
            <Typography variant={"h3"}>Movie Master</Typography>
        </AppBar>
    )
        ;
};

export default Header;
