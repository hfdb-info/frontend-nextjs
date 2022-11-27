export const Pagination = ({itemsPerPage, totalItems, paginate}) => {
  
    const pageNumbers = [];

    for (let i=0;i<= Math.ceil(totalItems/itemsPerPage);i++){
        pageNumbers.push(i)
    }
  
    return (
        <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='pageItem'>
              <a onClick={() => paginate(number)} href='/search/' className='pageLink'>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
  )
}
