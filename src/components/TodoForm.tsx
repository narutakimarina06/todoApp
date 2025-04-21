import React, { useState } from "react";
import { TodoFormProps } from "../types/todo";
import { Fieldset, Stack, Box, Field, Input, Button, Select,createListCollection,Portal, NativeSelect,For, HStack } from "@chakra-ui/react";

const TodoForm:React.FC<TodoFormProps> = (props) => {
    const {onAdd,onEdit,onDelete,onAddCategory} = props;

    //フォーム状態
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [newCategory,setNewCategory] = useState('');
    const [selectedCategory,setSelectedCategory] = useState('');

    //カテゴリー
    const [categories,setNewCategories] = useState([]);

    //新規カテゴリー追加
    const handleAddCategory = () => {
        if(newCategory.trim() === '') {
            alert('カテゴリー名を入力してください');
            return;
        }
        const newCat = {
            label: newCategory,
            value: newCategory.toLowerCase().replace(/\s+/g, '-'),
        };

        setNewCategories([...categoriesList,newCat]);
        setNewCategory('');
    };

    //キャンセル
    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setNewCategory('');
        setSelectedCategory('');
    }

    //フォーム送信
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        onAdd(title,description);

        //リセット
        setTitle('');
        setDescription('');
        setSelectedCategory('');
    };

    const categoriesList = createListCollection({
        items:categories
    });

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <Fieldset.Root size='lg'>
                <Stack>
                    <Fieldset.Legend>Todoを追加</Fieldset.Legend>
                </Stack>
                <Field.Root>
                    <Field.Label>
                        タイトル<Field.RequiredIndicator />
                    </Field.Label>
                    <Input 
                        name="title"
                        placeholder="タイトル"
                        variant="subtle"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            if(e.target.value.trim() === '') {
                                alert('タイトルを入力してください');
                            }
                        }}
                    />
                </Field.Root>
                <Field.Root>
                    <Field.Label>説明</Field.Label>
                    <Input
                        name="description"
                        placeholder="テキスト"
                        variant="subtle"
                        value={description} 
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                </Field.Root>
                <Field.Root>
                    <Field.Label>カテゴリー</Field.Label>
                    <Input 
                        name="category" 
                        placeholder="新規カテゴリー"
                        variant="subtle"
                        value={newCategory}
                        onChange={(e) => {
                            setNewCategory(e.target.value);
                        }} 
                    />
                    <Button 
                        colorPalette="teal"
                        variant="surface"
                        onClick={handleAddCategory}
                    >新規カテゴリー追加</Button>
                    <NativeSelect.Root variant="subtle">
                        <NativeSelect.Field
                            name="category"
                            placeholder="カテゴリー選択"
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                            }}
                        >
                            <For each={categoriesList.items} key={(item) => item.value}>
                                {(item) => (
                                    <option value={item.value} key={item.value}>
                                        {item.label}
                                    </option>
                                )}
                            </For>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Field.Root>
                <HStack>
                    <Button 
                        colorPalette="teal"
                        variant="surface"
                        type="submit"
                    >追加
                    </Button>
                    <Button 
                        colorPalette="red"
                        variant="surface"
                        onClick={handleCancel}>
                        キャンセル
                    </Button>
                </HStack>
            </Fieldset.Root>
        </Box>
    )
}

export default TodoForm;