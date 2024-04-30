import MovieDetailCard from "./components/movie-detail-card.tsx";
import {movies} from "./data/movies.ts";
import {Button, Stack, Typography} from "@mui/material";
import Layout from "./components/layout.tsx";
import {useSidebar} from "./components/sidebar.tsx";
import {AnimatePresence} from "framer-motion";
import {useMemo} from "react";

const App = () => {
    const {toggleSidebar, languages, countries, genres, resetFilters} = useSidebar()

    const filteredMovies = useMemo(() => movies.filter((movie) => {
        const {movielanguages, moviecountries, moviegenres} = movie
        let isValid = true
        if (languages.length > 0 && !languages.some((language) => movielanguages.includes(language))) {
            isValid = false
        }
        if (countries.length > 0 && !countries.some((country) => moviecountries.includes(country))) {
            isValid = false
        }
        if (genres.length > 0 && !genres.some((genre) => moviegenres.includes(genre))) {
            isValid = false
        }
        return isValid
    }), [languages, countries, genres])

    return (
        <Layout>
            <Button
                onClick={() => toggleSidebar()}
            >
                Filter
            </Button>
            <Stack
                sx={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    mt: "100px",
                }}
                columnGap={2}
                rowGap={2}
            >
                <AnimatePresence>
                    {
                        filteredMovies.length > 0 ? filteredMovies.map((movie) => {
                                return <MovieDetailCard key={movie.imdbmovieid} movie={movie}/>
                            }
                        ) : <Stack>
                            <Typography
                                variant={"h2"}
                            >No Movies Found</Typography>
                            <Button
                                onClick={resetFilters}
                            >
                                Reset Filters
                            </Button>
                        </Stack>
                    }
                </AnimatePresence>
            </Stack>
        </Layout>
    )
}

export default App
