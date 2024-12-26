import React, { useEffect, useState } from "react";
import ClassCard from "../../components/Cards/ClassCard";
import { FaFilter } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import useCategory from "../../hooks/useCategory";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState(menu);
  const [selectedCategory, setSelectedCategory] = useState([]); // Sử dụng mảng để lưu trữ nhiều lựa chọn
  const [currentItems, setCurrentItems] = useState([]);
  const { categories = [], isLoading } = useCategory();
  const [sortOption, setSortOption] = useState("-1");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [itemsPerPage] = useState(12); // Số lượng mục hiển thị mỗi trang
  const request = useAxios(); // Sử dụng hook
  const animatedComponents = makeAnimated();

  const categoriesOptions =
    !isLoading && categories
      ? categories.map((category) => ({
          value: category._id,
          label: category.name,
        }))
      : [];

  useEffect(() => {
    const page = currentPage || 1;
    const limit = itemsPerPage; // Sử dụng itemsPerPage từ state
    const sort = "createdAt";
    const order = sortOption;
    const filter = selectedCategory.length > 0 ? selectedCategory.map(cat => cat.value) : ""; // Lọc theo nhiều category

    const queryString = `?page=${page}&limit=${limit}&sort=${sort}&filter=${filter}&order=${order}`; // Chuyển đổi thành chuỗi
    const url = `/api/class${queryString}`;
    console.log(queryString);
    
    const fetchData = async () => {
      try {
        const response = await request("GET", url);
        setMenu(response.data);
        setCurrentItems(response.data.data.classes);
        setCurrentPage(page);
        setTotalPage(response.data.data.pageTotal); // Cập nhật tổng số trang
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [currentPage, sortOption, selectedCategory]); //request

  const handleCategoryChange = (selected) => {
    console.log(selected);
    if (!selected || selected.length === 0) {
      setSelectedCategory([]); // Đặt lại về mảng rỗng
    } else {
      setSelectedCategory(selected); // Lưu lại các lựa chọn
    }
    setCurrentPage(1); // Đặt lại trang hiện tại
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber); // Cập nhật trang hiện tại
  };

  // Phân trang với dấu "..."
  const renderPagination = () => {
    const paginationItems = [];
    const maxPagesToShow = 6;

    if (totalPage <= maxPagesToShow) {
      for (let i = 1; i <= totalPage; i++) {
        paginationItems.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`mx-1 px-3 py-1 w-8 h-8 rounded-full ${
              currentPage === i ? "bg-dark-blue text-white" : "bg-super-light-gray"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      // Hiển thị trang đầu
      paginationItems.push(
        <button key={1} onClick={() => paginate(1)} className={`mx-1 px-3 py-1 rounded-full ${currentPage === 1 ? "bg-dark-blue text-white" : "bg-light-blue"}`}>1</button>
      );

      // Hiển thị dấu "..."
      if (currentPage > 3) {
        paginationItems.push(<span key="start-dots">...</span>);
      }

      // Hiển thị các trang gần với trang hiện tại
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPage - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        paginationItems.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === i ? "bg-dark-blue text-white" : "bg-light-blue"
            }`}
          >
            {i}
          </button>
        );
      }

      // Hiển thị dấu "..."
      if (currentPage < totalPage - 2) {
        paginationItems.push(<span key="end-dots">...</span>);
      }

      // Hiển thị trang cuối
      paginationItems.push(
        <button key={totalPage} onClick={() => paginate(totalPage)} className={`mx-1 px-3 py-1 rounded-full ${currentPage === totalPage ? "bg-green text-white" : "bg-gray-200"}`}>{totalPage}</button>
      );
    }

    return paginationItems;
  };

  return (
    <div>
      {/* Cửa hàng menu */}
      <div className="home-container pt-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 w-full">
          {/* Nút lọc */}
          <div className="flex flex-row justify-center items-center gap-4 md:gap-8 mb-4 w-1/2">
            <Select
              className="w-full"
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={categoriesOptions}
              value={selectedCategory} // Gán giá trị từ state cho Select
              onChange={handleCategoryChange}
            />
          </div>

          {/* Lựa chọn sắp xếp */}
          <div className="flex items-center mb-4">
            <div className="bg-black p-2">
              <FaFilter className="text-white h-4 w-4" />
            </div>
            <select
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded-sm ml-2"
            >
              <option value="default">Default</option>
              <option value="-1">Latest</option>
              <option value="1">Oldest</option>
            </select>
          </div>
        </div>

        {/* Thẻ sản phẩm */}
        <div className="flex flex-wrap justify-center gap-4">
          {currentItems.map((item) => (
            <ClassCard key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* Phân trang */}
      <div className="flex justify-center my-8 flex-wrap gap-2">
        {renderPagination()}
      </div>
    </div>
  );
};

export default Menu;