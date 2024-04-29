import {AppBar, CardContent, CardHeader, List, ListItem, ListItemIcon, Stack, Typography} from "@mui/material";

const Sidebar = () => {
    return (
        <AppBar sx={{
            left: 0,
            top: "64px",
            width: "400px",
            height: "100svh",
            backgroundColor: "gray",
            boxShadow: "0 0 5px 0 rgba(0,0,0,0.1)",
            borderRadius: "24px",

        }}>
            <List sx={{
                padding: "0",
                margin: "0",
                listStyle: "none",
                borderRadius: "15px",

            }}>
                <ListItem sx={{
                    padding: "0",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Stack sx={{width: "100%"}}>
                        <CardHeader title={"Languages"}
                                    titleTypographyProps={{
                                        variant: "h6"
                                    }}
                                    sx={{
                                        borderRadius: "24px 24px 0 0",
                                    }}
                        />
                        <CardContent>
                            <Stack>
                                <Typography></Typography>
                                <ListItemIcon></ListItemIcon>
                            </Stack>
                        </CardContent>
                    </Stack>
                </ListItem>
            </List>
        </AppBar>
    );
};

export default Sidebar;
