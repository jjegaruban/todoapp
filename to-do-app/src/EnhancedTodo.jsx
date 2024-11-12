import React, { useState } from "react";

function EnhancedTodo() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const AddTodo = () => {
    if (inputText.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputText,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const editTodo = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    const updatedTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editText } : todo 
    );
    setTodos(updatedTodo);
    setEditId(null);
    setEditText('');
  };

  const deleteTodo = (id) => {
    const UpdatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(UpdatedTodos);
  };

  return (
    <div id="todo-app">
      <h1 className="title">TO DO LIST</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="ADD YOUR TO-DO"
          className="todo-input"
        />
        <button onClick={AddTodo} className="add-btn">Add Todo</button> 
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {editId === todo.id ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="edit-input"
                />
                <button onClick={() => saveEdit(todo.id)} className="save-btn">SAVE</button>
              </div>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    setTodos(
                      todos.map((t) =>
                        t.id === todo.id ? { ...t, completed: !t.completed } : t
                      )
                    )
                  }
                  className="checkbox"
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} className="todo-text">
                  {todo.text}
                </span>
                <button onClick={() => editTodo(todo.id, todo.text)} className="edit-btn">EDIT</button>
                <button onClick={() => deleteTodo(todo.id)} className="delete-btn">DELETE</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EnhancedTodo;
