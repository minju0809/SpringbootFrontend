import './App.css';
import axios from 'axios';

import { useEffect, useState } from 'react';

function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios({ method: 'get', url: 'http://127.0.0.1:8081/getGuestbookList.do' }).then((res) => {
      console.log("response: ", res.data);
      setList(res.data);
    })
  }, []);

  return (
    <div className="App">
      {list.map(item => <div key={item.guestbook_idx}>{item.guestbook_idx}</div>)}
      <div>
        <h2>방명록 목록</h2>
        <table border="1">
          <thead>
            <tr>
              <th>번호</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {list.map(item => (
              <tr key={item.guestbook_idx}>
                <td>{item.guestbook_idx}</td>
                {/* Add more table cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
