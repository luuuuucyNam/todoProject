import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, toDoSelector, toDoState } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const [toDoError, setToDoError] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDoError("");
//     setToDo(value);
//   };

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoError("To do should be longer");
//     }
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//         <button>Add</button>
//         {toDoError !== "" ? toDoError : null}
//       </form>
//     </div>
//   );
// }

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.header`
  height: 10vh;
  align-items: center;
  display: flex;
  font-size: 30px;
`;

const ToDoSelect = styled.select`
  outline-style: none;
  padding: 0.8em 1em;
  margin-right: 0.8em;
  margin-bottom: 2em;
  border: 0;
  border-bottom: 1px solid grey;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <Wrapper>
      <Header>To Dos</Header>
      <hr />
      <form>
        <ToDoSelect value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </ToDoSelect>
      </form>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Wrapper>
  );
}

export default ToDoList;
