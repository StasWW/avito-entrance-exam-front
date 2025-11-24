import React, {useEffect, useMemo} from "react";
import { usePagination, useDarkmode } from "../../store/storage.ts";
import getFooterStyles from "./styles/footer.ts";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const { pagination, setCurrentPage } = usePagination();
  const [isDarkmode] = useDarkmode();
  const styles = getFooterStyles(isDarkmode);
  const navigate = useNavigate();

  // Этот useEffect следит за изменения в URL
  // Иначе не происходит ререндер
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const p = Number(params.get("p"));
    console.log(pagination.totalPages)
    if (!p || p > pagination.totalPages) {
      navigate(`/?p=1`);
    } else {
      setCurrentPage(p)
    }
  }, [location.search]);

  const pagesEnum = useMemo(() => {
    const pagesEnum = Array.from({ length: pagination.totalPages }, (_, i) => i + 1);
    if (pagesEnum.length <= 5) return pagesEnum;
    if (pagination.currentPage <= 3) return [...pagesEnum.slice(0, 4), pagesEnum.at(-1)!];
    if (pagination.currentPage >= pagesEnum.length - 2) return [pagesEnum[0], ...pagesEnum.slice(-4)];
    return [
      pagesEnum[0],
      ...pagesEnum.slice(pagination.currentPage - 2, pagination.currentPage + 1),
      pagesEnum.at(-1)!,
    ];
  }, [pagination]);

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      navigate(`/?p=${pagination.currentPage - 1}`);
    }
  };

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      navigate(`/?p=${pagination.currentPage + 1}`);
    }
  };

  return (
    <footer>
      <div style={styles.container}>
        <button onClick={handlePrevPage} style={styles.button}>←</button>
        {pagesEnum.map((i) => (
          <a
            key={i}
            onClick={() => navigate(`/?p=${i}`)}
            style={{
              ...styles.linkBase,
              ...(pagination.currentPage === i ? styles.activeLink : {}),
            }}
          >
            {i}
          </a>
        ))}
        <button onClick={handleNextPage} style={styles.button}>→</button>
      </div>
      <p style={styles.allAdsCounter}>Всего объявлений: {pagination.totalItems}</p>
    </footer>
  );
}
