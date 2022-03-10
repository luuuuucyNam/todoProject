import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState, categoryState, toDoState } from "./atoms";

interface IForm {
  category: string;
}

const ToDoInput = styled.input`
  outline-style: none;
  width: 20vw;
  padding: 0.8em 0.5em;
  margin-right: 0.8em;
  margin-top: 1em;
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

function CreateCategory() {
  const setCategory = useSetRecoilState(categoriesState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ category }: IForm) => {
    setCategory((oldCategory) => {
      const categoryArr = [category, ...oldCategory];
      localStorage.setItem("categories", JSON.stringify(categoryArr));
      return categoryArr;
    });
    setValue("category", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <ToDoInput
        {...register("category", { required: "Please write a Category" })}
        placeholder="Write a Category"
      />
      <AddBtn>+</AddBtn>
    </form>
  );
}

export default CreateCategory;
