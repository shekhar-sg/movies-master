import {CardContent, Checkbox, Drawer, FormControlLabel, Stack, Toolbar, Typography} from "@mui/material";
import {RadioButtonChecked, RadioButtonUnchecked} from "@mui/icons-material";
import {movies} from "../data/movies.ts";
import {drawerWidth} from "./layout.tsx";
import {create} from "zustand";
import {useCallback} from "react";

interface UniqueData {
    languages: string[],
    countries: string[],
    genres: string[],
}

const Sidebar = () => {

    const {isOpen, toggleSidebar, toggleLanguage, toggleCountry, toggleGenre} = useSidebar()

    const filterData = movies.reduce((previousValue, currentValue) => {
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
    })

    const uniqueLanguages = Array.from(new Set(filterData.languages));
    const uniqueCountries = Array.from(new Set(filterData.countries));
    const uniqueGenres = Array.from(new Set(filterData.genres));

    const uniqueData:UniqueData = {
        genres: uniqueGenres,
        languages: uniqueLanguages,
        countries: uniqueCountries,
    }

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


    return (
        <Drawer
            anchor={"left"}
            variant={"persistent"}
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
            {
                Object.keys(uniqueData).map((key) => {
                    return (
                        <Stack
                            sx={{
                                width: "100%",
                            }}
                            key={key}>
                            <Typography variant={"h4"}
                                        textTransform={"capitalize"}
                                        sx={{
                                            textAlign: "center",
                                            paddingY: "8px",
                                            backgroundColor: "antiquewhite"
                                        }}
                            >{key}</Typography>
                            <CardContent component={Stack} sx={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "center",
                                gap: "8px",
                                marginX: "auto",
                            }}>
                                {
                                    uniqueData[key as keyof UniqueData].map((item) => {
                                        return (
                                            <FormControlLabel
                                                key={item}
                                                label={item}
                                                labelPlacement={"start"}
                                                control={<Checkbox
                                                    icon={<RadioButtonUnchecked/>}
                                                    checkedIcon={<RadioButtonChecked/>}
                                                    sx={{
                                                        color: "black",
                                                        '&.Mui-checked': {
                                                            color: "black",
                                                        },
                                                    }}
                                                />}
                                                onChange={() => {
                                                    setFilter(key as keyof UniqueData)(item)
                                                }}
                                                sx={{
                                                    width: {
                                                        xs: "100%",
                                                        sm: "50%",
                                                        md: "48%",
                                                        lg: "45%",
                                                    },
                                                    backgroundColor: "antiquewhite",
                                                    borderRadius: "10px",
                                                    justifyContent: "space-between",
                                                    margin: 0,
                                                    padding: "2px 5px",
                                                }}
                                            />
                                        )
                                    })
                                }
                            </CardContent>
                        </Stack>
                    )
                })
            }
        </Drawer>
    );
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
    resetFilters: () => void;
}

export const useSidebar = create<SidebarStore>((set, get) => ({
    isOpen: true,
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
    resetFilters: () => set({languages: [], countries: [], genres: []}),
}));