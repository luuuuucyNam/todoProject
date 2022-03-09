import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "./atoms";

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

const DeleteBtn = styled.button`
  background: #2c5530;
  color: #fff;
  border: none;
  position: relative;
  height: 40px;
  font-size: 1em;
  padding: 0 2em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  &:hover {
    background: #fff;
    color: #2c5530;
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newTodo = { text, id, category: name as any };
      const toDoArr = [
        ...oldToDos.slice(0, targetIndex),
        newTodo,
        ...oldToDos.slice(targetIndex + 1),
      ];
      localStorage.setItem("todos", JSON.stringify(toDoArr));
      return toDoArr;
    });
  };

  const onDelete = () => {
    setToDos((oldToDos) => {
      const toDoArr = [...oldToDos?.filter((f) => f.id !== id)];
      localStorage.setItem("todos", JSON.stringify(toDoArr));
      return toDoArr;
    });
  };
  return (
    <ToDoWrapper>
      <ToDoTitle>{text}</ToDoTitle>
      {category !== Categories.TO_DO && (
        <StateBtn name="TO_DO" onClick={onClick}>
          To Do
        </StateBtn>
      )}
      {category !== Categories.DOING && (
        <StateBtn name="DOING" onClick={onClick}>
          Doing
        </StateBtn>
      )}
      {category !== Categories.DONE && (
        <StateBtn name="DONE" onClick={onClick}>
          Done
        </StateBtn>
      )}
      <DeleteBtn onClick={onDelete}>X</DeleteBtn>
    </ToDoWrapper>
  );
}

export default ToDo;
