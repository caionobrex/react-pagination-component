import { useCallback, useEffect, useState } from "react";
import "./styles.css";

const Pagination = ({ page, totalOfPages }) => {
  const [currentPage, setCurrentPage] = useState(page | 1);
  const [pages, setPages] = useState([]);
  const n = 5;
  const selectedIndexStyle = (index) => ({
    backgroundColor: index === currentPage - 1 ? "red" : "transparent"
  });

  const handlePreviousPage = useCallback(() => {
    if (currentPage === 0) return;
    setCurrentPage((current) => current - 1);
  }, [setCurrentPage, currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage > totalOfPages) return;
    setCurrentPage((current) => current + 1);
  }, [setCurrentPage, currentPage]);

  const handleChangePage = useCallback((p) => () => {
    setCurrentPage(p)
  }, [setCurrentPage])

  const renderAllPages = () => pages.map((page, index) => (
    <li onClick={handleChangePage(page)} style={selectedIndexStyle(index)}>
      {page}
    </li>
  ));

  const renderFirstFourPagesPlusThreeDotsAndLastPage = () => (
    <>
      {pages.slice(0, n - 1).map((page, index) => (
        <li onClick={handleChangePage(page)} style={selectedIndexStyle(index)}>
          {page}
        </li>
      ))}
      <li>...</li>
      <li onClick={handleChangePage(totalOfPages)}>{totalOfPages}</li>
    </>
  )

  const renderFirstPagePlusThreeDotsAndLastPageFourPages = () => (
    <>
      <li onClick={handleChangePage(1)}>1</li>
      <li>...</li>
      {pages
        .slice(pages.length - (n - 1), pages.length)
        .map((page, index) => (
          <li
            onClick={handleChangePage(page)}
            style={selectedIndexStyle(totalOfPages - (n - 1) + index)}
          >
            {page}
          </li>
        ))}
    </>
  )

  const render = () => (
    <>
      <li onClick={handleChangePage(1)}>1</li>
      <li>...</li>
      {pages
        .slice(
          currentPage - (n - 1) / 2,
          currentPage + ((n - 1) / 2 + 1)
        )
        .map((page, index) => (
          <li
            onClick={handleChangePage(page)}
            style={{
              backgroundColor:
                index === (n - 1) / 2 ? "red" : "transparent"
            }}
          >
            {page}
          </li>
        ))}
      <li>...</li>
      <li onClick={handleChangePage(totalOfPages)}>{totalOfPages}</li>
    </>
  )

  const renderContentBasedOnConditions = useCallback(() => {
    if (pages.length < n)
      return renderAllPages()
    if (currentPage < n)
      return renderFirstFourPagesPlusThreeDotsAndLastPage()
    if (currentPage > totalOfPages - (n - 1))
      return renderFirstPagePlusThreeDotsAndLastPageFourPages()
    return render()
  }, [pages, currentPage, totalOfPages])

  useEffect(() => {
    const list = [];
    for (let i = 0; i < totalOfPages; i++) list.push(i + 1);
    setPages(list);
  }, []);

  return (
    <div style={{ display: "flex", columnGap: 8 }}>
      {currentPage > 1 && <button onClick={handlePreviousPage}>before</button>}
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          columnGap: "3px",
          margin: 0,
          padding: 0
        }}
      >
        {renderContentBasedOnConditions()}
      </ul>
      {currentPage !== totalOfPages && (
        <button onClick={handleNextPage}>next</button>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <Pagination totalOfPages={20} />
    </div>
  );
}
