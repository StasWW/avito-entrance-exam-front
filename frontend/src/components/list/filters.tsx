import React, {type ChangeEvent, useEffect, useMemo, useRef, useState} from "react";
import filtersGetStyle from "./styles/filters.ts";
import {useDarkmode, usePagination} from "../../store/storage.ts";
import searchIcon from "../../../public/searchIcon.png";
import loadAds, {getSavedSearchParams} from "../../pages/actions/loadAds.ts";
import {setCurrentPage} from "../../store/paginationSlice.ts";

type categoryType = "Электроника" | "Недвижимость" | "Транспорт" | "Работа" | "Услуги" | "Животные" | "Мода" | "Детское"
type statusType = "approved" | "rejected" | "requestChanges" | "";


export default function Filters() {
  const [isDarkmode] = useDarkmode();
  const styles = useMemo(() => filtersGetStyle(isDarkmode), [isDarkmode]);
  const {pagination} = usePagination()


  const [openCategory, setOpenCategory] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const saved = getSavedSearchParams() || {};
  const categories = [
    "Электроника",
    "Недвижимость",
    "Транспорт",
    "Работа",
    "Услуги",
    "Животные",
    "Мода",
    "Детское",
  ];

  const [selectedCategory, setSelectedCategory] = useState<categoryType | undefined>(
    saved.categorySelected !== undefined ? categories[saved.categorySelected] as categoryType : undefined
  );
  // @ts-ignore сохраненный статус всегда типа статус
  const [selectedStatuses, setSelectedStatuses] = useState<statusType[]>(saved.status ?? []);
  const [minPrice, setMinPrice] = useState<number | undefined>(saved.minPrice);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(saved.maxPrice);
  const [searchQuery, setSearchQuery] = useState<string>(saved.search ?? "");
  const [sortBy, setSortBy] = useState<"createdAt" | "price" | "priority">(saved.sortBy ?? "createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(saved.sortOrder ?? "asc");


  const statuses = [
    { label: "Модерация", value: "requestChanges", color: isDarkmode ? "#b59f00" : "#FFD700" },
    { label: "Принятые", value: "approved", color: isDarkmode ? "#2e8b57" : "#32CD32" },
    { label: "Отклоненные", value: "rejected", color: isDarkmode ? "#b22222" : "#FF4500" },
  ];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setIsModalVisible(prev => !prev);
        if (searchQuery.at(-1) === '/') setSearchQuery(searchQuery.slice(0, -1));
      } else if (e.key === "Enter")  {
        setIsModalVisible(false);
        handleSearch();
      }
    };
    document.addEventListener("keyup", handler);
    return () => {
      document.removeEventListener("keyup", handler);
    };
  }, []);

  useEffect(() => {
    handleSearch();
  }, [pagination.currentPage, searchQuery, sortBy, sortOrder]);

  useEffect(() => {
    if (isModalVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalVisible]);

  const clearFilters = () => {
    setOpenCategory(false);
    setSelectedCategory(undefined);
    setSelectedStatuses([]);
    setMaxPrice(undefined);
    setMinPrice(undefined);
    setSearchQuery('');
    setSortBy("createdAt");
    setSortOrder("asc");
    setCurrentPage(1);
    handleSearch();
  };

  const toggleStatus = (label: statusType) => {
    setSelectedStatuses(prev =>
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    );
  };

  const handleSearch = () => {
    loadAds({
      status: selectedStatuses,
      categorySelected: selectedCategory ? categories.indexOf(selectedCategory) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 : undefined,
      minPrice,
      maxPrice,
      search: searchQuery,
      currentPage: pagination.currentPage,
      sortBy,
      sortOrder
    });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value;
    setMinPrice(value === "" ? undefined : Number(value));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value;
    setMaxPrice(value === "" ? undefined : Number(value));
  };

  const handleChangeSearchQuery = (e: ChangeEvent<HTMLInputElement>)=> {
    const value = e.target.value;
    setSearchQuery(value);
  }

  return (
    <>
      <div style={styles.container}>
        <div style={styles.searchBox} role="search" onSubmit={e => e.preventDefault()}>
          <input style={styles.input} value={searchQuery} onChange={handleChangeSearchQuery} type="search" placeholder="Введите название" />
          <button style={styles.searchButton} onClick={handleSearch} type="submit">
            <img alt="Поиск" src={searchIcon} style={styles.searchIcon} />
          </button>
        </div>

        <section style={styles.params} aria-label="Фильтры">
          <div style={styles.priceBox}>
            <label style={styles.label} htmlFor="priceFrom">Цена</label>
            <div style={styles.priceGroup}>
              <input
                id="priceFrom"
                type="number"
                placeholder="от"
                value={minPrice ?? ""}
                onChange={handleMinPriceChange}
                max={maxPrice}
                min={0}
                style={styles.priceInput}
              />
              <input
                id="priceTo"
                type="number"
                placeholder="до"
                value={maxPrice ?? ""}
                onChange={handleMaxPriceChange}
                min={0}
                style={styles.priceInput}
              />
            </div>
          </div>

          <div style={styles.paramGroup}>
            <span style={styles.label}>Категория</span>
            <div style={styles.dropdownWrapper}>
              <button
                type="button"
                style={styles.dropdownButton}
                onClick={() => setOpenCategory(prev => !prev)}
              >
                {selectedCategory || "Выберите категорию"}
              </button>
              <ul
                style={{
                  ...styles.dropdownList,
                  maxHeight: openCategory ? "500px" : "0",
                  opacity: openCategory ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.3s ease, opacity 0.3s ease",
                }}
              >
                {categories.map(cat => (
                  <li
                    key={cat}
                    style={{
                      ...styles.dropdownItem,
                      fontWeight: selectedCategory === cat ? "bold" : "normal",
                      background: selectedCategory === cat ? "#ddd" : "transparent",
                      cursor: "pointer",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = isDarkmode ? "#333" : "#f0f0f0")}
                    onMouseLeave={e => (e.currentTarget.style.background = selectedCategory === cat ? "gray" : "transparent")}
                    onClick={() => {
                      setSelectedCategory(cat as categoryType);
                      setOpenCategory(false);
                    }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={styles.paramGroup}>
            <span style={styles.label}>Статус</span>
            <div style={styles.pillGroup}>
              {statuses.map(status => (
                <button
                  key={status.value}
                  type="button"
                  style={{
                    ...styles.pill,
                    background: selectedStatuses.includes(status.value as statusType) ? status.color : styles.pill.background,
                    color: selectedStatuses.includes(status.value as statusType) ? "#fff" : styles.pill.color,
                    border: selectedStatuses.includes(status.value as statusType) ? `1px solid ${status.color}` : styles.pill.border,
                  }}
                  onClick={() => toggleStatus(status.value as statusType)}
                >
                  {status.label}
                </button>
              ))}

            </div>
          </div>
          <div style={styles.buttonBox}>
            <button onClick={clearFilters} type="reset" style={styles.resetButton}>
              Сбросить
            </button>
          </div>
        </section>

      </div>
      <div
        style={{
          ...styles.modalSearch,
          opacity: isModalVisible ? 1 : 0,
          pointerEvents: isModalVisible ? "auto" : "none",
        }}
      >
        <div
          style={{
            ...styles.modalSearchBox,
            transform: isModalVisible ? "scale(1) translateY(-100px)" : "scale(0.2) translateY(-20px)",
            opacity: isModalVisible ? 1 : 0,
          }}
        >
          <label style={styles.modalText} htmlFor="modalSearch">Быстрый поиск</label>
          <input
            style={styles.modalSearchInput}
            ref={inputRef}
            id="modalSearch"
            value={searchQuery}
            placeholder="Начинайте вводить"
            onChange={handleChangeSearchQuery}
          />
        </div>
      </div>
      <div style={styles.sortBox}>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as "createdAt" | "price" | "priority")}
          style={styles.sortSelect}
        >
          <option value="createdAt" style={styles.sortOption}>По дате создания</option>
          <option value="price" style={styles.sortOption}>По цене</option>
          <option value="priority" style={styles.sortOption}>По срочности</option>
        </select>
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value as "asc" | "desc")}
          style={styles.sortSelect}
        >
          <option value="asc" style={styles.sortOption}>По возрастанию</option>
          <option value="desc" style={styles.sortOption}>По убыванию</option>
        </select>
      </div>
    </>
  );
}