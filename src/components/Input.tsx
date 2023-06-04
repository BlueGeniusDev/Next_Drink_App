"use client";

import styled from "styled-components";
import { FC, InputHTMLAttributes } from "react";
import SearchIcon from "@/icons/SearchIcon";
import { MdCancel } from "react-icons/md";

const Container = styled.div`
  position: relative;
`;

const IconContainer = styled.div`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`;

const CloseContainer = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: #aaa;
  border-radius: 8px;
  color: #fff;
`;

const InputElement = styled.input`
  width: 100%;
  padding: 12px 20px 12px 32px;
  margin: 8px 0;
  border-radius: 8px;
  background: #eee;
  border: none;
  outline: none;
`;

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

const Input: FC<IProps> = (props) => {
  const { onClear, value, ...rest } = props;

  return (
    <Container>
      <IconContainer>
        <SearchIcon />
      </IconContainer>
      <InputElement value={value} {...rest} />
      {value ? (
        <CloseContainer onClick={onClear}>
          <MdCancel />
        </CloseContainer>
      ) : (
        ""
      )}
    </Container>
  );
};

export default Input;
