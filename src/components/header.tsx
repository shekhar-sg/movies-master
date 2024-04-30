import {alpha, AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {Clear, Tune} from "@mui/icons-material";
import {useSidebar} from "./sidebar.tsx";

const Header = () => {
    const {isOpen, toggleSidebar} = useSidebar()
    return (
        <AppBar
            position={"sticky"}
            elevation={0}
            sx={{
                backdropFilter: "blur(4px)",
                backgroundColor: alpha(grey[300], 0.5),
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}>
            <Toolbar
                sx={{
                    justifyContent: "center"
                }}
            >
                <IconButton
                    onClick={() => toggleSidebar()}
                    sx={{
                        ml: 2
                    }}
                >{
                    isOpen ? <Clear/> : <Tune/>
                }
                </IconButton>
                <Typography
                    variant={"h4"}
                    fontWeight={"bolder"}
                    fontFamily={"cursive"}
                    color={"secondary.main"}
                    mx={"auto"}
                >
                    Movie Mania
                </Typography>
            </Toolbar>
        </AppBar>
    )
        ;
};

export default Header;
