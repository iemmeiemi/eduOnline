import React, { useEffect, useState } from "react";
import ClassCard from "../../components/Cards/ClassCard";
import { FaFilter } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";

const Menu = () => {
  const [menu, setMenu] = useState([
    {
      id: 1,
      title: "Product Management Basic",
      des: "Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.",
      price: "380",
      tag: ["skills", "business"],
      img: "/images/home/PMclass.png",
    },
    {
      id: 2,
      title: "BM Data Science Professional",
      des: "Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.",
      price: "550",
      tag: ["technologies", "data"],
      img: "/images/home/BMclass.png",
    },
    {
      id: 3,
      title: "The Science of Well-Being",
      des: "Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.",
      price: "470",
      tag: ["skills", "business"],
      img: "/images/home/wellClass.png",
    },
    {
      id: 4,
      title: "Python for Everybody Specialization",
      des: "Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.",
      price: "280",
      tag: ["skills", "business"],
      img: "/images/home/pythonClass.png",
    },
    {
      id: 5,
      title: "Front-End Development",
      des: "Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.",
      price: "600",
      tag: ["skills", "business"],
      img: "/images/home/PMclass.png",
    },
    {
      id: 6,
      title: "UX/UI for Beginners",
      des: "Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.",
      price: "280",
      tag: ["skills", "business"],
      img: "/images/home/PMclass.png",
    },
    {
      id: 7,
      title: "BM Data Science Professional",
      des: "Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.",
      price: "550",
      tag: ["technologies", "data"],
      img: "/images/home/BMclass.png",
    },
    {
      id: 8,
      title: "The Science of Well-Being",
      des: "Product Management Masterclass, you will learn with Sarah Johnson - Head of Product Customer Platform Gojek Indonesia.",
      price: "470",
      tag: ["skills", "business"],
      img: "/images/home/wellClass.png",
    },
  ]);

  const [filteredItems, setFilteredItems] = useState(menu);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Số lượng mục hiển thị mỗi trang
  const request = useAxios(); // Sử dụng hook

  // useEffect để fetch data từ backend (nếu cần)
  // useEffect(() => {
  //   const fetchData = async () => {
  //       try {
  //           const response = await request('GET', '/api/class');
  //           setMenu(response.data);
  //       } catch (err) {
  //           setError(err);
  //       }
  //   };
  //   fetchData();
  // }, [request]);

  const filterItems = (tag) => {
    const filtered =
      tag === "all" ? menu : menu.filter((item) => item.tag.includes(tag)); // Sử dụng includes để kiểm tra tag

    setFilteredItems(filtered);
    setSelectedCategory(tag);
    setCurrentPage(1);
  };

  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // Logic phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>

      {/* Cửa hàng menu */}
      <div className="home-container pt-20">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-3 mb-8">
          {/* Nút lọc */}
          <div className="flex flex-row justify-center items-center gap-4 md:gap-8 flex-wrap mb-4">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => filterItems("skills")}
              className={selectedCategory === "skills" ? "active" : ""}
            >
              Skills
            </button>
            <button
              onClick={() => filterItems("business")}
              className={selectedCategory === "business" ? "active" : ""}
            >
              Business
            </button>
            <button
              onClick={() => filterItems("data")}
              className={selectedCategory === "data" ? "active" : ""}
            >
              Data
            </button>
          </div>

          {/* Lựa chọn sắp xếp */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2">
              <FaFilter className="text-white h-4 w-4" />
            </div>
            <select
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded-sm"
            >
              <option value="default"> Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* Thẻ sản phẩm */}
        <div className="flex flex-wrap justify-center gap-4">
          {currentItems.map((item) => (
            <ClassCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Phân trang */}
      <div className="flex justify-center my-8 flex-wrap gap-2">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
