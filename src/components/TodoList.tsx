import React, { useState } from "react";
import { TodoListProps } from "../types/todo";
import { Select, Text, Portal,Box,Flex,createListCollection, Stack } from "@chakra-ui/react";
import TodoItem from "./TodoItem";

const TodoList:React.FC<TodoListProps> = (props) => {
    const {todos,onToggle,onDelete,onEdit,onFilterChange,filter,categories} = props;

    //フィルタリングされたTodoリストを取得
    const getFilteredTodos = () => {
        //状態でフィルタリング
        let filteredTodos = todos;

        if(filter === 'active') {
            filteredTodos = todos.filter(todo => todo.state === 'active');
        } else if (filter === 'completed') {
            filteredTodos = todos.filter(todo => todo.state === 'completed');
        } else if (filter === 'deleted') {
            filteredTodos = todos.filter(todo => todo.state === 'deleted');
        }

        return filteredTodos;
    };

    const filteredTodos = getFilteredTodos();

    //フィルター変更のハンドラ
    const handleFilterChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(e.target.value);
    }

    const frameworks = createListCollection({
        items:[
            {label:'すべて',value:'all'},
            {label:'未完了',value:'active'},
            {label:'完了済み',value:'completed'},
            {label:'削除済み',value:'deleted'}
        ]
    })

    return (
        <Box>
            <Flex justify="space-between" mb={4}>
                <Box>
                    <Select.Root 
                        collection={frameworks}
                        variant="subtle"
                        size="sm"
                        width="320px"
                        onChange={handleFilterChange}>
                        <Select.HiddenSelect />
                        <Select.Label>ステータス</Select.Label>
                        <Select.Control>
                            <Select.Trigger>
                            <Select.ValueText placeholder="ステータス" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                            <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                            <Select.Positioner>
                                <Select.Content>
                                    {frameworks.items.map((framework) => (
                                    <Select.Item item={framework} key={framework.value}>
                                        {framework.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>
                </Box>
                <Box>
                    <Select.Root 
                        collection={categoriesList}
                        variant="subtle"
                        size="sm"
                        width="320px"
                        onChange={handleFilterChange}
                    >
                        <Select.HiddenSelect />
                        <Select.Label>カテゴリー</Select.Label>
                        <Select.Control>
                            <Select.Trigger>
                            <Select.ValueText placeholder="カテゴリー" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                            <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                            <Select.Positioner>
                                <Select.Content>
                                    {categoriesList.items.map((category) => (
                                        <Select.Item item={category} key={category.value}>
                                            {category.label}
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>
                </Box>
            </Flex>
            {filteredTodos.length === 0 ? (
                    <Box>
                        <Text>Todoがありません</Text>
                    </Box>
                ) : (
                    <Stack spacing={4}>
                        {filteredTodos.map(todo => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onToggle={onToggle}
                                onDelete={onDelete}
                            />
                        ))}
                    </Stack>
                )}
        </Box>
    );
};

export default TodoList;