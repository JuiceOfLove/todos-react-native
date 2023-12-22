import { useState, useRef  } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const editTextInputRef = useRef(null);
  const addTodo = () => {
    if (newTodo !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const editTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    setEditingTodo(null);
  };

  const startEditing = (id) => {
    setEditingTodo(id);
    editTextInputRef.current && editTextInputRef.current.focus();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new todo"
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.list}
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => toggleComplete(item.id)}>
              <Text style={item.completed ? styles.completedText : styles.itemText}>
                {item.completed ? '✓' : ' '}
              </Text>
            </TouchableOpacity>

            {editingTodo === item.id ? (
              <TextInput
                style={styles.editInput}
                value={item.text}
                onChangeText={(text) => editTodo(item.id, text)}
                onBlur={() => setEditingTodo(null)}
                ref={editTextInputRef}
              />
            ) : (
              <>
                <Text style={styles.itemText}>{item.text}</Text>
                <TouchableOpacity onPress={() => startEditing(item.id)}>
                  <Text style={styles.editButton}>✎</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity onPress={() => removeTodo(item.id)}>
              <Text style={styles.removeButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2b2b2b',
  },
  title: {
    margin: '5%',
    fontSize: 19,
    textColor: 'rgba(252, 26, 203)',
    textShadowColor: 'rgba(252, 26, 203, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    color: 'rgba(252, 26, 203, 1)',
    filter: 'drop-shadow(0 0 1px rgba(252, 26, 203, 0.5))',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(79, 241, 255, 1)',
    filter: 'drop-shadow(0 0 1px rgba(79, 241, 255, 0.5))',
    shadowColor: 'rgba(79, 241, 255, 1)',
    shadowRadius: 5,
    shadowOpacity: 1,
    color : '#fff',
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgba(79, 241, 255, 1)',
    borderWidth: 1,
    borderColor: 'rgba(79, 241, 255, 1)',
    shadowColor: 'rgba(79, 241, 255, 1)',
    shadowRadius: 5,
    shadowOpacity: 1,
    backgroundColor: 'transparent',
  },
  editInput: {
    flex: 1,
    color: '#fff',
    padding: 10,
  },
  editButton: {
    marginLeft: 10,
    color: 'rgba(79, 241, 255, 1)',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    shadowColor: '#ccc',
    shadowRadius: 2,
  },
  itemText: {
    textColor: 'rgba(255, 255, 255)',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    color: 'rgba(255, 255, 255, 1)',
    filter: 'drop-shadow(0 0 1px rgba(255, 255, 255, 0.5))',
  },
  removeButton: {
    fontWeight: 'bold',
    textColor: 'rgba(255, 0, 0)',
    textShadowColor: 'rgba(255, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    color: 'rgba(255, 0, 0, 1)',
    filter: 'drop-shadow(0 0 1px rgba(255, 0, 0, 0.5))',
  },
});

export default TodoApp;