import MovieDetailCard from "./components/movie-detail-card.tsx";
import {movies} from "./data/movies.ts";
import {Button, Stack} from "@mui/material";
import Layout from "./components/layout.tsx";
import {useSidebar} from "./components/sidebar.tsx";
import {AnimatePresence} from "framer-motion";

const App = () => {
    const {toggleSidebar, languages, countries, genres} = useSidebar()

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
                        movies.map((movie) => {
                                const {movielanguages, moviecountries, moviegenres} = movie
                                if (languages.length > 0 && !languages.some((language) => movielanguages.includes(language))) {
                                    return null
                                }
                                if (countries.length > 0 && !countries.some((country) => moviecountries.includes(country))) {
                                    return null
                                }
                                if (genres.length > 0 && !genres.some((genre) => moviegenres.includes(genre))) {
                                    return null
                                }
                                return <MovieDetailCard key={movie.imdbmovieid} movie={movie}/>
                            }
                        )
                    }
                </AnimatePresence>
            </Stack>
        </Layout>
    )
}

export default App
