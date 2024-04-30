import {Chip, Drawer, Stack, Theme, Toolbar, Typography, useMediaQuery} from "@mui/material";
import {movies} from "../data/movies.ts";
import {drawerWidth} from "./layout.tsx";
import {useCallback, useEffect, useMemo} from "react";
import {Clear} from "@mui/icons-material";
import {create} from "zustand";

interface UniqueData {
    languages: string[],
    countries: string[],
    genres: string[],
}

const Sidebar = () => {

    const {
        isOpen,
        toggleSidebar,
        toggleLanguage,
        toggleCountry,
        toggleGenre,
        resetLanguages,
        resetCountries,
        resetGenres,
        resetFilters,
        languages,
        countries,
        genres,
    } = useSidebar()
    const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"))

    useEffect(() => {
        if (!isMobile) {
            toggleSidebar(true)
        } else {
            toggleSidebar(false)
        }
    }, [isMobile, toggleSidebar]);

    const filterData = useMemo(() => movies.reduce((previousValue, currentValue) => {
        const {movielanguages, moviecountries, moviegenres} = currentValue;
        return {
            languages: previousValue.languages.concat(movielanguages),
            countries: previousValue.countries.concat(moviecountries),
            genres: previousValue.genres.concat(moviegenres),
        };
    }, {
        languages: [] as string[],
        countries: [] as string[],
        genres: [] as string[],
    }), [])

    const uniqueData = useMemo<UniqueData>(() => {
        const uniqueLanguages = Array.from(new Set(filterData.languages));
        const uniqueCountries = Array.from(new Set(filterData.countries));
        const uniqueGenres = Array.from(new Set(filterData.genres));
        return {
            genres: uniqueGenres,
            languages: uniqueLanguages,
            countries: uniqueCountries,
        }
    }, [])

    const setFilter = useCallback((key: keyof UniqueData) => {
        return (value: string) => {
            switch (key) {
                case "languages":
                    toggleLanguage(value)
                    break;
                case "countries":
                    toggleCountry(value)
                    break;
                case "genres":
                    toggleGenre(value)
                    break;
            }
        }
    }, [toggleCountry, toggleGenre, toggleLanguage])

    const resetFilter = useCallback((key: keyof UniqueData) => {
        switch (key) {
            case "languages":
                resetLanguages()
                break;
            case "countries":
                resetCountries()
                break;
            case "genres":
                resetGenres()
                break;
        }
    }, [])


    return (
        <Drawer
            anchor={"left"}
            variant={isMobile ? "temporary" : "persistent"}
            open={isOpen}
            onClose={() => toggleSidebar(false)}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Toolbar/>
            <Toolbar>
                <Typography variant={"h3"}>Filter
                    {(languages.length || countries.length || genres.length) > 0 && <Clear
                        onClick={resetFilters}
                    />}
                </Typography>
            </Toolbar>
            {
                Object.keys(uniqueData).map((key) => {
                    let isActivated = false;
                    if (key === "languages" && languages.length > 0) {
                        isActivated = true;
                    } else if (key === "countries" && countries.length > 0) {
                        isActivated = true;
                    } else if (key === "genres" && genres.length > 0) {
                        isActivated = true;
                    }
                    return (
                        <Stack
                            sx={{
                                width: "100%",
                            }}
                            key={key}>
                            <Typography
                                variant={"h4"}
                                textTransform={"capitalize"}
                                textAlign={"center"}
                                py={1}
                                bgcolor={"antiquewhite"}
                            >
                                {key}
                                {isActivated && <Clear
                                    onClick={() => resetFilter(key as keyof UniqueData)}
                                />}
                            </Typography>
                            <Stack
                                direction={"row"}
                                flexWrap={"wrap"}
                                p={2}
                                columnGap={1}
                                rowGap={1}
                            >
                                {
                                    uniqueData[key as keyof UniqueData].map((item) => {
                                        let isActived = false;
                                        if (key === "languages" && languages.includes(item)) {
                                            isActived = true;
                                        } else if (key === "countries" && countries.includes(item)) {
                                            isActived = true;
                                        } else if (key === "genres" && genres.includes(item)) {
                                            isActived = true;
                                        }
                                        return (
                                            <Chip
                                                key={item}
                                                variant={isActived ? "filled" : "outlined"}
                                                color={isActived ? "primary" : "default"}
                                                label={item}
                                                onClick={() => setFilter(key as keyof UniqueData)(item)}
                                            />
                                        )
                                    })
                                }
                            </Stack>
                        </Stack>
                    )
                })
            }
        </Drawer>
    )
        ;
};

export default Sidebar;

export interface SidebarStore {
    isOpen: boolean;
    toggleSidebar: (open?: boolean) => void;
    languages: string[];
    toggleLanguage: (languages: string) => void;
    countries: string[];
    toggleCountry: (countries: string) => void;
    genres: string[];
    toggleGenre: (genres: string) => void;
    resetLanguages: () => void;
    resetCountries: () => void;
    resetGenres: () => void;
    resetFilters: () => void;
}

export const useSidebar = create<SidebarStore>((set, get) => ({
    isOpen: false,
    toggleSidebar: (open) => {
        const isOpen = open ?? !get().isOpen
        set({isOpen})
    },
    languages: [],
    toggleLanguage: (language) => {
        const languages = get().languages
        set({
            languages: languages.includes(language) ? languages.filter((l) => l !== language) : [...languages, language]
        })
    },
    countries: [],
    toggleCountry: (country) => {
        const countries = get().countries
        set({
            countries: countries.includes(country) ? countries.filter((c) => c !== country) : [...countries, country]
        })

    },
    genres: [],
    toggleGenre: (genre) => {
        const genres = get().genres
        set({
            genres: genres.includes(genre) ? genres.filter((g) => g !== genre) : [...genres, genre]
        })
    },
    resetLanguages: () => set({languages: []}),
    resetCountries: () => set({countries: []}),
    resetGenres: () => set({genres: []}),
    resetFilters: () => set({languages: [], countries: [], genres: []}),
}));