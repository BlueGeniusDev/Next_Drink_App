"use client"

import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useState} from "react";
import {Drink} from "@/hooks/useFetchDrinks";

interface DrinkContextState {
    drink: Drink | null
    setDrink: Dispatch<SetStateAction<Drink | null>>
}

const initialState: DrinkContextState = {
    drink: null,
    setDrink: () => undefined
}

export const DrinkContext = createContext<DrinkContextState>(initialState)

export const DrinkContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [drink, setDrink] = useState<Drink | null>(null)

    return (
        <DrinkContext.Provider value={{drink, setDrink}}>
            {children}
        </DrinkContext.Provider>
    )
}
