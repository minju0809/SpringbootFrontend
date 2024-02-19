import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Link to={"/guestbookListPage"}><h1>방명록 목록</h1></Link>
    </div>
  );
}

export default App;


