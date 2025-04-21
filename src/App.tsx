import React, { useEffect, useState } from 'react'
import './App.css'
import { Todo, TodoFormProps } from './types/todo'
import { toaster } from './components/ui/toaster';
import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App:React.FC = () => {
  //Todo一覧の状態
  const [todos,setTodos] = useState<Todo[]>([]);

  //フィルター状態
  const [filter,setFilter] = useState<string>('all');

  //カテゴリー一覧
  const [categories,setNewCategories] = useState<string[]>([]);

  //ローカルストレージからTodoを読み込む
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if(savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        //日付の文字列をDate型に変換
        const todosWidthDates = parsedTodos.map((todo:Todo) => ({
          ...todos,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
          completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined,
          deletedAt: todo.deletedAt ? new Date(todo.deletedAt) : undefined,
        }));
        setTodos(parsedTodos);

        //カテゴリー一覧の抽出
        const allcategories = todosWidthDates.reduce((acc:string[],todo:Todo) => {
          if(todo.category && todo.category.length > 0) {
            return [...acc,...todo.category.filter(cat => !acc.includes(cat))];
          }
          return acc;
        },[]);
        setNewCategories(allcategories);
      } catch (error) {
        console.error("Todoの読み込みに失敗しました", error);
        toaster.create({
          type: 'error',
          title: 'Todoの読み込みに失敗しました',
        });
      }
    }
  },[]);

  //Todoをローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todos));
  },[todos]);

  //Todoを追加
  const handleAddTodo = (title:string,description:string) => {
    const newTodo:Todo = {
      id:Date.now(),
      title,
      description,
      state:'active',
      createdAt:new Date(),
      updatedAt:new Date(),
      category:[]
    };
    setTodos([...todos,newTodo]);
    toaster.create({
      type:'success',
      title:'Todoを追加しました',
    })
  };

  //Todoの状態切り替え
  const handleToggleTodo = (id:number) => {
    setTodos(todos.map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          state:newState,
          updatedAt:new Date(),
          completedAt: newState === 'completed' ? new Date() : undefined,
        };
      }
      return todo;
    })
  );
  };

  //Todo削除
  const handleDeleteTodo = (id:number) => {
    setTodos(todos.map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          state:'deleted',
          updatedAt:new Date(),
          deletedAt:new Date()
        }
      }
      return todo;
    })
  );
  toaster.create({
    type:'info',
    title:'Todoを削除しました'
  });
  };

  //Todo編集
  const handleEditTodo = (id:number,title:string,description:string) => {
    setTodos(todos.map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          title,
          description,
          updatedAt:new Date()
        };
      }
      return todo;
    })
  );
  toaster.create({
    type:'success',
    title:'Todoを編集しました'
  });
  };

  //フィルター変更
  const handleFilterChange = (newFilter:string) => {
    setFilter(newFilter);
  }

  //カテゴリー追加
  const handleAddCategory = (newCategory:string) => {
    if(newCategory && !categories.includes(newCategory)) {
      setNewCategories([...categories,newCategory]);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" textAlign="center">Todoリスト</Heading>
        <Box>
          <TodoForm
            onAdd={handleAddTodo}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
            onAddCategory={handleAddCategory}
          />
        </Box>
        <Box>
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
            onFilterChange={handleFilterChange}
            filter={filter}
            categories={categories}
            />
        </Box>
      </VStack>
    </Container>
  );
};

export default App;