import React from 'react';

function Pagenation({
  currentPage,
  totalPages,
  startPage,
  endPage,
  handleClick,
}) {
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination" style={{ justifyContent: 'center' }}>
          {currentPage !== 1 && (
            <li className="page-item">
              <button
                onClick={() => handleClick(1)}
                disabled={currentPage === 1}
                to="/assets/adminassets"
                className="page-link"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
          )}
          {currentPage - 10 >= 1 && (
            <li className="page-item">
              <button
                onClick={() => handleClick(currentPage - 10)}
                disabled={currentPage < 11}
                to="/assets/adminassets"
                className="page-link"
                aria-label="Previous"
              >
                <span aria-hidden="true">&lt;</span>
              </button>
            </li>
          )}
          {[...Array(endPage - startPage)].map((_, i) => (
            <li className="page-item" key={i}>
              <button
                className="page-link"
                onClick={() => handleClick(startPage + i + 1)}
                style={
                  startPage + i + 1 === currentPage
                    ? { fontWeight: 'bold' }
                    : null
                }
              >
                <span aria-hidden="true">{startPage + i + 1}</span>
              </button>
            </li>
          ))}
          {currentPage + 10 <= totalPages && (
            <li className="page-item">
              <button
                onClick={() =>
                  handleClick(Math.min(currentPage + 10, totalPages))
                }
                className="page-link"
                aria-label="Next"
              >
                <span aria-hidden="true">&gt;</span>
              </button>
            </li>
          )}
          {currentPage !== totalPages && (
            <li className="page-item">
              <button
                onClick={() => handleClick(totalPages)}
                className="page-link"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Pagenation;
