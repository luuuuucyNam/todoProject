import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

// export interface ICategory {
//   name: string;
//   id: number;
//   value: string;
// }

export const categoryState = atom<string>({
  key: "category",
  default: "TO_DO",
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: JSON.parse(localStorage.getItem("categories") as any) || [
    "TO_DO",
    "DOING",
    "DONE",
  ],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: JSON.parse(localStorage.getItem("todos") as any) || [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos?.filter((toDo) => toDo.category === category);
  },
});
