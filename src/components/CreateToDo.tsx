import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "./atoms";

interface IForm {
  toDo: string;
}

const ToDoInput = styled.input`
  outline-style: none;
  width: 20vw;
  padding: 0.8em 0.5em;
  margin-right: 0.8em;
`;

const AddBtn = styled.button`
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
  &:hover {
    background: #fff;
    color: #1aab8a;
  }
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => {
      const toDoArr = [{ text: toDo, id: Date.now(), category }, ...oldToDos];
      localStorage.setItem("todos", JSON.stringify(toDoArr));
      return toDoArr;
    });
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <ToDoInput
        {...register("toDo", { required: "Please write a To Do" })}
        placeholder="Write a to do"
      />
      <AddBtn>+</AddBtn>
    </form>
  );
}

export default CreateToDo;
