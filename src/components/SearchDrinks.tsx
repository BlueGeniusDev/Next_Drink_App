"use client";

import { FC, useContext, useState } from "react";
import Input from "@/components/Input";
import useFetchDrinks, { Drink } from "@/hooks/useFetchDrinks";
import DrinkList from "@/components/DrinkList";
import { DrinkContext } from "@/context/DrinkContext";
import { useRouter } from "next/navigation";
import { Caption } from "./layout/Container";

const SearchDrinks: FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");

  const { setDrink } = useContext(DrinkContext);

  const drinks = useFetchDrinks(query);

  const onDrinkSelect = (drink: Drink) => {
    setDrink(drink);
    router.push("/drink");
  };

  return (
    <>
      <Caption>Thirsty</Caption>
      <Input
        placeholder="Find a drink"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClear={() => setQuery("")}
      />

      {!!drinks.length && <DrinkList items={drinks} onSelect={onDrinkSelect} />}
    </>
  );
};

export default SearchDrinks;
