import React from "react";
import { TodoItemProps } from "../types/todo";
import { Button, Checkbox, Input } from "@chakra-ui/react";

const TodoItem:React.FC<TodoItemProps> = (props) => {
    const { todo,onToggle,onDelete } = props;

    //チェックボタンクリックでonToggle関数を呼び出す
    const handleToggle = () => {
        onToggle(todo.id);
    };

    //削除ボタンクリックでonDelete関数を呼び出す
    const handleDelete = () => {
        onDelete(todo.id);
    };

    //日付フォーマット
    const formatDate = (date:Date) => {
        return new Date(date).toLocaleDateString('ja-JP');
    }

    return (
        <div>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            {todo.category && todo.category.length > 0 && (
                <div>
                    <h4>カテゴリー</h4>
                    <ul>
                        {todo.category.map((cat,index) => (
                            <li key={index}>{cat}</li>
                        ))}
                    </ul>
                </div>
            )}
            <p>状態: {todo.state}</p>
            <p>作成日:{formatDate(todo.createdAt)}</p>
            <p>更新日:{formatDate(todo.updatedAt)}</p>
            {todo.completedAt && <p>完了予定日:{formatDate(todo.completedAt)}</p>}
            <Checkbox.Root isChecked={todo.state === 'completed'} onChange={handleToggle}>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>完了</Checkbox.Label>
            </Checkbox.Root>
            <Button onClick={handleDelete}>削除</Button>
        </div>
    )
}

export default TodoItem;