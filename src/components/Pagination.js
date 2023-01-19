import Pagination from 'react-bootstrap/Pagination';

const PaginationBasic = (props) => {
  const items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === props.activePage}
        onClick={() => {
          props.handlePageChange(number)
        }}
      >
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  )
}

export default PaginationBasic;