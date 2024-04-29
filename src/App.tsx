import MovieDetailCard from "./components/movie-detail-card.tsx";
import Header from "./components/header.tsx";
import {movies} from "./data/movies.ts";
import {Stack} from "@mui/material";
import Sidebar from "./components/sidebar.tsx";

const App = () => {

    return (
        <>
            <Header/>
            <Sidebar/>
            <Stack sx={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                mt: "100px",
                ml: "400px",
            }}
                   columnGap={2}
                   rowGap={2}
            >
                {
                    movies.map((movie) => {
                            return <MovieDetailCard key={movie.imdbmovieid} movie={movie}/>
                        }
                    )}
            </Stack>
        </>
    )
}

export default App
