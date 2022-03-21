import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Todo from './Pages/Todo';
import Header from './Components/Header';
import Logout from './Pages/Logout';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="todo" element={<Todo />} />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
