import { useEffect, useState } from "react";

export type Drink = {
    [props: string]: string | null,
}

export interface Unit {
  [key: string]: number;
}

export const unit: Unit = {
    oz: 1,
    cup: 8,
    tsp: 0.166667,
    tbsp: 0.5,
    cl: 0.33814,
    shot: 1.5,
    shots: 1.5,
    Shot: 1.5,
    part: 8,
    parts: 8,
    Part: 8,
  };

const useFetchDrinks: (query: string) => Array<Drink> = (query) => {
  const [drinks, setDrinks] = useState<Array<Drink>>([]);

  useEffect(() => {
    if (!query?.length) {
      setDrinks([]);
      return;
    }

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
      .then((res) => res.json())
      .then((res) => setDrinks(res?.drinks || []));
  }, [query]);

  return drinks;
};

export default useFetchDrinks;
