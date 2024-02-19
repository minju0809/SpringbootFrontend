import axios from 'axios';
import '../App.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function GuestbookList() {
  const [data, setData] = useState({
    totalCount: 0,
    start: 0,
    pageSize: 10,
    end: 0,
    totalPage: 0,
    currentPage: 0,
    lastPage: 0,
    pageListSize: 0,
    listStartPage: 0,
    listEndPage: 0,
    ch1: '',
    ch2: '',
    li: []
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const start = params.get('start');
    const ch1 = params.get('ch1');
    const ch2 = params.get('ch2');


    console.log('url',  {
      start, ch1, ch2
    });
    axios({
      method: 'get', url: 'http://localhost:8081/ReactGuestbookList', params: {
        start, ch1, ch2
      }
    }).then((res) => {
      console.log("response: ", res.data);
      setData(res.data);
    })
  }, []);

  return (
    <div className="App">
      <div>
        <Link to={"/"}><h1>홈으로</h1></Link> 
      </div>
      <div className="record-info">
        <div>1. 전체 레코드 수: {data.totalCount}</div>
        <div>2. 페이지 사이즈 : {data.pageSize}</div>
        <div>3. 페이지 List사이즈 : {data.pageListSize}</div>
      </div>

      <div className="record-info">
        <div>4. 전체 레코드 수 : {data.totalCount}</div>
        <div>5. 총 페이지 수 : {data.totalPage}</div>
        <div>6. 현재 레코드 : {data.start}</div>
      </div>

      <div className="record-info">
        <div>7. 현재 페이지 : {data.currentPage}</div>
        <div>8. 가로 하단 시작 : {data.listStartPage}</div>
        <div>9. 가로 하단 마지막 : {data.listEndPage}</div>
      </div>
      <h2>방명록 목록</h2>
      <table className='basic-table' align='center'>
        <thead>
          <tr>
            <th>rownum</th>
            <th>rnum</th>
            <th>번호</th>
            <th>이름</th>
            <th>메모</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {data.li.map(item => (
            <tr key={item.guestbook_idx}>
              <td>{item.rownum}</td>
              <td>{item.rnum}</td>
              <td>{item.guestbook_idx}</td>
              <td>{item.guestbook_name}</td>
              <td>{item.guestbook_memo}</td>
              <td>{item.guestbook_today}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ margin: '8px 0' }}>
        <a className="button" href={`guestbookListPage?start=1&ch1=${data.ch1}&ch2=${data.ch2}`}>처음으로</a>

        {data.start !== 1 && (
          <a className="button" href={`guestbookListPage?start=${data.start - data.pageSize}&ch1=${data.ch1}&ch2=${data.ch2}`}>이전</a>
        )}

        {data.start === 1 && <span>이전</span>}

        {Array.from({ length: data.listEndPage - data.listStartPage + 1 }, (_, i) => i + data.listStartPage).map(i => (
          i <= data.totalPage && (
            <span key={i}>
              <a className="button" href={`guestbookListPage?start=${(i - 1) * data.pageSize + 1}&ch1=${data.ch1}&ch2=${data.ch2}`}>{i}</a>&nbsp;
            </span>
          )
        ))}

        {data.currentPage !== data.totalPage && (
          <a className="button" href={`guestbookListPage?start=${data.start + data.pageSize}&ch1=${data.ch1}&ch2=${data.ch2}`}>다음</a>
        )}

        {data.currentPage === data.totalPage && <span>다음</span>}

        <a className="button" href={`guestbookListPage?start=${data.lastPage}&ch1=${data.ch1}&ch2=${data.ch2}`}>마지막으로</a>
      </div>
    </div>
  );
}

export default GuestbookList;
