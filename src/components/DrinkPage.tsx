"use client";

import { FC, useContext, useEffect, useMemo } from "react";
import { DrinkContext } from "@/context/DrinkContext";
import { Caption, Container } from "@/components/layout/Container";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";
import { Drink, unit } from "@/hooks/useFetchDrinks";
import PieChart from "react-google-charts";
import { AiOutlineLeft } from "react-icons/ai";
import * as colorConvert from "color-convert";

const PreviousContainer = styled.div`
  height: 60px;
  align-items: center;
  display: flex;
  color: #498df6;
  left: 0px;
  position: absolute;
`;

const ImageContainer = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 48px;
  overflow: hidden;
  margin-top: 30px;
  align-self: center;

  img {
    object-fit: cover;
  }
`;

const Title = styled.p`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  align-self: center;
`;

const Label = styled.p`
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 17px;
  font-weight: bold;
  width: 100%;
`;

const IngredientContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  position: relatve;
  font-size: 17px;
  display: flex;
  align-items: flex-start;
`;

const IngredientLegend = styled.div`
  display: flex;
  flex-direction: column;
`;
const LegendItem = styled.div`
  font-size: 17px;
  overflow: auto;
  display: flex;
  align-items: flex-start;
`;
const LegendIcon = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 3px;
  margin-right: 5px;
  background-color: ${(props) => props.color};
  max-width: 20px;
  aspect-ratio: 1;
  margin-top: 2px;
`;

const InstructionsContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 17px;
`;

function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 90) + 150;
  const saturation = Math.floor(Math.random() * 41) + 30;
  const lightness = Math.floor(Math.random() * 31) + 60;
  const hslColor = [hue, saturation, lightness];
  const [r, g, b] = (colorConvert as any).hsl.rgb(hslColor);
  return `rgb(${r}, ${g}, ${b})`;
}

const pastelColor: Array<string> = Array.from({ length: 15 }, () =>
  getRandomPastelColor()
);

const DrinkPage: FC = () => {
  const router = useRouter();
  const { drink } = useContext(DrinkContext);

  useEffect(() => {
    if (!drink) {
      router.push("/");
    }
  }, [drink, router]);

  const ingredients = useMemo(() => {
    if (!drink) return [];

    const ingredients: Array<[string, any]> = [];

    ingredients.push(["Ingredient", "Measure"]);
    for (let i = 1; i <= 15; i++) {
      const title = drink[`strIngredient${i}` as keyof Drink];
      const measure = drink[`strMeasure${i}` as keyof Drink];

      if (title && measure) {
        let result = 0;
        measure.split(" ")?.map((item) => {
          if (parseInt(item[0]) >= 0 && parseInt(item[0]) <= 9) {
            if (item.length == 1) result += parseInt(item);
            else result += parseInt(item[0]) / parseInt(item[2]);
          } else if (unit[item]) {
            result = result * unit[item];
          }
        });
        ingredients.push([`${title} (${measure.trim()})`, result]);
      }
    }
    return ingredients;
  }, [drink]);

  if (!drink) {
    return null;
  }

  return (
    <div>
      <Caption>
        <PreviousContainer onClick={() => router.push("/")}>
          <AiOutlineLeft />
          Thirsty
        </PreviousContainer>
        {drink.strDrink}
      </Caption>
      <Container>
        <ImageContainer>
          <Image
            width={96}
            height={96}
            src={drink.strDrinkThumb!}
            alt={drink.strDrink!}
          />
        </ImageContainer>
        <Title>{drink?.strDrink}</Title>
        <Label>Ingredients:</Label>
        <IngredientContainer>
          <IngredientLegend>
            <>
              {ingredients.map((item, index) => {
                return index == 0 ? (
                  ""
                ) : (
                  <LegendItem key={index}>
                    <LegendIcon
                      key={item[0]}
                      color={pastelColor[index - 1]}
                    ></LegendIcon>
                    {item[0]}
                  </LegendItem>
                );
              })}
            </>
          </IngredientLegend>
          <PieChart
            chartType="PieChart"
            data={ingredients}
            options={{
              legend: "none",
              pieSliceText: "none",
              pieStartAngle: 90,
              tooltip: { trigger: "none" },
              colors: pastelColor,
              chartArea: {
                width: "100%",
                height: "90%",
                left: 50,
              },
            }}
            width={"100%"}
            height={"120px"}
          />
        </IngredientContainer>
        <InstructionsContainer>{drink.strInstructions}</InstructionsContainer>
      </Container>
    </div>
  );
};

export default DrinkPage;
