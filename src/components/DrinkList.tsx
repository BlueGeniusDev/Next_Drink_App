"use client"

import {FC} from "react";
import styled from "styled-components";
import {Drink} from "@/hooks/useFetchDrinks";
import Image from "next/image";

const Container = styled.div``

const DrinkItem = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  border-top: 1px solid #eee;
  cursor: pointer;
  transition: background-color .2s;
  
  &:hover {
    background: #eee;
  }
  
  &:last-child {
    border-bottom: 1px solid #eee;
  }
`

const ImageContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  margin: 10px 15px 10px 10px;

  img {
    object-fit: cover;
  }
`

const Title = styled.div`
    font-size: 17px;
`

const DrinkList: FC<{
    items: Array<Drink>
    onSelect: (drink: Drink) => void
}> = (props) => {
    const {items, onSelect} = props

    return (
        <Container>
            {items.map((item) => (
                <DrinkItem key={item.idDrink} onClick={() => onSelect(item)}>
                    <ImageContainer>
                        <Image width={40} height={40} src={item.strDrinkThumb??""} alt={item.strDrink??""} />
                    </ImageContainer>
                    <Title>{item.strDrink}</Title>
                </DrinkItem>
            ))}
        </Container>
    )
}

export default DrinkList
