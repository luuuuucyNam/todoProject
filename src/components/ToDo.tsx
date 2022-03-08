import React from "react";
import styled from "styled-components";
import { IToDo } from "./atoms";

const ToDoWrapper = styled.li`
  margin-top: 2em;
  display: flex;
  align-items: center;
`;

const ToDoTitle = styled.span`
  font-size: 20px;
  width: 10vw;
  display: block;
`;

const StateBtn = styled.button`
  background: #1aab8a;
  color: #fff;
  border: none;
  position: relative;
  height: 40px;
  font-size: 1em;
  padding: 0 2em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  margin-right: 0.5em;
  &:hover {
    background: #fff;
    color: #1aab8a;
  }
`;

function ToDo({ text }: IToDo) {
  return (
    <ToDoWrapper>
      <ToDoTitle>{text}</ToDoTitle>
      <StateBtn>To Do</StateBtn> <StateBtn>Doing</StateBtn>{" "}
      <StateBtn>Done</StateBtn>
    </ToDoWrapper>
  );
}

export default ToDo;
