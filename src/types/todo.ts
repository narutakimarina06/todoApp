//Todoのステータス
export type TodoState = 'active' | 'completed' | 'deleted';

//Todoカード
export interface Todo  {
    id:number;
    title:string;
    description:string;
    state:TodoState;
    createdAt:Date;
    updatedAt:Date;
    completedAt?:Date;
    deletedAt?:Date;
    category?:string[];
}

//TodoItemコンポーネント
export interface TodoItemProps {
    todo:Todo;
    onToggle:(id:number) => void;
    onDelete:(id:number) => void;
}

//TodoListコンポーネント
export interface TodoListProps {
    todos:Todo[];
    onToggle:(id:number) => void;
    onDelete:(id:number) => void;
    onEdit:(id:number, title:string, description:string) => void;
    onFilterChange:(filter:string) => void;
    filter:string;
    categories:string[];
}

//TodoFormコンポーネント
export interface TodoFormProps {
    onAdd:(title:string, description:string) => void;
    onEdit:(id:number, title:string, description:string) => void;
    onDelete:(id:number) => void;
    onAddCategory:(category:string) => void;
}
