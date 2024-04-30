import {Box, Stack, Tooltip, Typography} from "@mui/material";
import {Movie} from "../types/movie.type.ts";
import {motion} from "framer-motion";

interface MovieDetailCardProps {
    movie: Movie;
}

const MovieDetailCard = (props: MovieDetailCardProps) => {
    const {movie} = props;
    const {movietitle, moviemainphotos, moviegenres, movielanguages, moviecountries, imdbmovieid} = movie;

    const moviesInfo: {
        infoTitle: string,
        infoValues: string[],
    }[] = [
        {
            infoTitle: "Genres",
            infoValues: moviegenres.length ? moviegenres : ["No Data Available"],
        },
        {
            infoTitle: "Languages",
            infoValues: movielanguages.length ? movielanguages : ["No Data Available"],
        },
        {
            infoTitle: "Countries",
            infoValues: moviecountries.length ? moviecountries : ["No Data Available"],
        }
    ]

    return (
        <Box
            key={imdbmovieid}
            component={motion.div}
            layout
            sx={{
                position: "relative",
                width: "300px",
                height: "500px",
                borderRadius: "10px",
                boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                "&:before": {
                    content: "''",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    transition: "all 0.2s ease-in-out",
                    zIndex: 1,
                },
                "&:after": {
                    content: "''",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${moviemainphotos[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    transition: "all 1.2s ease-in-out",
                    zIndex: 0,
                },
                "&:hover": {
                    "&:before": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                    },
                    "&:after": {
                        transform: "scale(1.1)",
                    }
                }
            }}>
            <Box sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backdropFilter: "blur(4px)",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                p: 2,
                zIndex: 2
            }}>
                <Typography variant={"h4"} fontWeight={800} mb={1}
                            textOverflow={"ellipsis"}
                            overflow={"hidden"}
                            whiteSpace={"nowrap"}
                            title={movietitle}
                >{movietitle}</Typography>
                {moviesInfo.map((info) => {
                    const {infoTitle, infoValues} = info;
                    const infoValueToString = infoValues.join(", ");

                    return (
                        <Tooltip
                            key={infoTitle}
                            title={
                                <>
                                    <b>
                                        {infoTitle}:&nbsp;
                                    </b>
                                    {infoValueToString}
                                </>
                            }
                            arrow
                            placement={"top-start"}
                            sx={{
                                mb: 0.5,
                            }}
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        backgroundColor: "common.black",
                                    }
                                }
                            }}

                        >
                            <Stack>
                                <Typography variant={"body2"} fontWeight={800}>{infoTitle}:</Typography>
                                <Typography variant={"body2"}
                                            textOverflow={"ellipsis"}
                                            overflow={"hidden"}
                                            whiteSpace={"nowrap"}
                                >{infoValueToString}</Typography>
                            </Stack>
                        </Tooltip>
                    )
                })}
            </Box>
        </Box>
    );
};

export default MovieDetailCard;
