import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import getData, { getLength } from './Data';
import Card from 'react-bootstrap/Card';
function App() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [items, setItems] = useState([]);
  const [inp, setInp] = useState(1);
  const [pageShow, setPageShow] = useState('01');
  useEffect(() => {
    setItems(getData(page, limit));
  }, [page, limit]);
  const handlePage = (data) => {
    setPage(data.selected + 1);
    const res = data.selected + 1;
    if (res < 10) {
      setPageShow(`0${res}`);
    } else {
      setPageShow(res);
    }
  };
  // console.log(items);
  return (
    <div className='container'>
      <h2 className='text-center mt-5 fw-bold'>
        React Pagination Page --- <span>{pageShow}</span>
      </h2>
      <div className='d-flex flex-wrap justify-content-center'>
        {items.map((item, i) => {
          return (
            <Card
              style={{ width: '30%', marginInline: '10px' }}
              key={i}
              className='mt-5 '
            >
              <Card.Header>
                <h5 className='text-center'>Id: {item.id}</h5>
              </Card.Header>
              <Card.Body>
                <h5>First_Name: {item.first_name}</h5>
                <h5>Last_Name: {item.last_name}</h5>
                <h5>Gender: {item.gender}</h5>
              </Card.Body>
              <Card.Footer>
                <h5>Email: {item.email}</h5>
              </Card.Footer>
            </Card>
          );
        })}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBlock: '2rem',
          alignItems: 'flex-start',
        }}
      >
        <div>
          <label htmlFor='inp' className='me-2'>
            Select number of card you want to see in this page:
          </label>
          <input
            type='number'
            onChange={(e) => {
              const result = parseInt(e.target.value);
              if (!isNaN(result) && result >= 1) {
                setInp(e.target.value);
                setLimit(e.target.value);
              } else {
                setInp(1);
              }
            }}
            value={inp}
            name='inp'
            id='inp'
          />
        </div>
        <ReactPaginate
          previousLabel={'<<'}
          nextLabel={'>>'}
          breakLabel={'...'}
          pageCount={getLength(limit)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePage}
          containerClassName='pagination justify-content-center'
          pageClassName='page-item'
          pageLinkClassName='page-link'
          activeClassName='active'
          previousClassName='page-item'
          nextClassName='page-item'
          previousLinkClassName='page-link'
          nextLinkClassName='page-link'
          breakLinkClassName='page-link'
          breakClassName='page-item'
        />
      </div>
    </div>
  );
}

export default App;
