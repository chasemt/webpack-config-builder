import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
        },
      ]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>React Todo App</h1>
        <p>Webpack Config Builder - React Example</p>
      </header>
      <main style={styles.main}>
        <div style={styles.inputSection}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new todo..."
            style={styles.input}
          />
          <button onClick={addTodo} style={styles.addButton}>
            Add
          </button>
        </div>
        <ul style={styles.todoList}>
          {todos.map((todo) => (
            <li key={todo.id} style={styles.todoItem}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={styles.checkbox}
              />
              <span
                style={{
                  ...styles.todoText,
                  ...(todo.completed ? styles.completed : {}),
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {todos.length === 0 && (
          <p style={styles.emptyMessage}>No todos yet. Add one above!</p>
        )}
      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    textAlign: 'center' as const,
    color: 'white',
    marginBottom: '2rem',
  },
  main: {
    maxWidth: '600px',
    margin: '0 auto',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  inputSection: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
  input: {
    flex: 1,
    padding: '0.75rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '0.5rem',
    outline: 'none',
  },
  addButton: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '0.5rem',
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  todoList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    marginBottom: '0.5rem',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '0.5rem',
  },
  checkbox: {
    width: '1.5rem',
    height: '1.5rem',
    cursor: 'pointer',
  },
  todoText: {
    flex: 1,
    color: 'white',
    fontSize: '1rem',
  },
  completed: {
    textDecoration: 'line-through',
    opacity: 0.6,
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '0.5rem',
    background: 'rgba(255, 0, 0, 0.3)',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  emptyMessage: {
    textAlign: 'center' as const,
    color: 'white',
    opacity: 0.7,
    fontStyle: 'italic',
  },
};

export default App;

