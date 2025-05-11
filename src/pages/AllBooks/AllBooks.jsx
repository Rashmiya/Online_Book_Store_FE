import React, { useContext, useEffect, useState } from "react";
import FooterSection from "../../components/Footer/FooterSection";
import {
  Collapse,
  ConfigProvider,
  Flex,
  Image,
  Input,
  InputNumber,
  Pagination,
  Rate,
  Slider,
  Switch,
  Tag,
  Typography,
} from "antd";
import { allBooks } from "../../utils/constent/BookDetails";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../context/NotificationContext";
import BookService from "../../services/BookService";
import BookContext from "../../context/BookContext";
import SearchOutline from "../../assets/images/common/SearchOutline";
import LoadingAnim from "../../components/loader/LoadingAnim";
import SkeletonComponent from "../../components/Skeleton/SkeletonComponent";
import NoDataAnim from "../../components/nodataAnim/NoDataAnim";
const { Text } = Typography;

const AllBooks = () => {
  const navigateTo = useNavigate();
  const [bookType, setBookType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { openNotification, handleError } = useContext(NotificationContext);
  const { filters, updateFilters } = useContext(BookContext);
  const [loading, setLoading] = useState(false);
  const [searchingValue, setSearchingValue] = useState("");
  const [allBookDetails, setAllBookDetails] = useState(false);
  const [searchedFilters, setSearchedFilters] = useState([]);
  const [filterdPrice, setFilterdPrice] = useState({
    min: 1000,
    max: 15000,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalCount: 0,
    perPage: 10,
  });

  const { getAllBooks } = BookService();

  useEffect(() => {
    fetchBooks();
  }, [filters]);

  const fetchBooks = async () => {
    setLoading(true);
    const response = await getAllBooks({ ...filters, defaultFilter: "" });
    try {
      if (response) {
        if (response.responseType === "success") {
          setAllBookDetails(response.output.data);
          setPagination((prevFilters) => ({
            ...prevFilters,
            page: response.output.data.page,
            totalCount: response.output.data.totalCount,
          }));
        } else if (response.responseType === "fail") {
          openNotification("error", response?.output?.message);
        } else if (response.responseType === "error") {
          handleError(response.output);
        }
      } else {
        openNotification("error", "Something went wrong");
      }
    } catch (error) {
      openNotification("error", "Something went wrong");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const bookTypeFilters = [
    {
      name: "Computer Science",
      color: "blue",
      type: "computer_science",
    },
    {
      name: "Software Engineering",
      color: "blue",
      type: "software_engineering",
    },
    {
      name: "Networking",
      color: "blue",
      type: "networking",
    },
    {
      name: "DevOps",
      color: "blue",
      type: "devops",
    },
    {
      name: "Artificial Intelligence",
      color: "blue",
      type: "artificial_intelligence",
    },
    {
      name: "Cybersecurity",
      color: "blue",
      type: "cybersecurity",
    },
    {
      name: "Data Science",
      color: "blue",
      type: "data_science",
    },
    {
      name: "Cloud Computing",
      color: "blue",
      type: "cloud_computing",
    },
    {
      name: "Data Structures & Algorithms",
      color: "blue",
      type: "data_structures_algorithms",
    },
  ];

  const onChange = (newValue) => {
    const newPrice = {
      min: newValue[0],
      max: newValue[1],
    };
    setFilterdPrice(newPrice);

    const updatedFilters = searchedFilters.filter((f) => f.type !== "price");

    if (newValue[0] !== "" && newValue[1] !== "") {
      updatedFilters.push({
        name: `RS. ${newValue[0]} - RS. ${newValue[1]}`,
        color: "red",
        type: "price",
      });
    }

    setTimeout(() => {
      updateFilters({ priceMin: newValue[0], priceMax: newValue[1] });
    }, 1000);
    setSearchedFilters(updatedFilters);
  };

  const items = [
    {
      key: "1",
      label: "Availability",
      children: (
        <div className="flex w-full flex-row items-center justify-center gap-2">
          <Switch
            size="small"
            onChange={(e) => {
              updateFilters({ availability: e });
            }}
          />{" "}
          In stock
        </div>
      ),
    },
    {
      key: "2",
      label: "Price",
      children: (
        <div className="flex w-full flex-col">
          <Slider
            className="w-full"
            range
            defaultValue={[1000, 15000]}
            onChangeComplete={onChange}
            max={50000}
          />
          <div className="w-ful flex flex-row gap-2">
            <Text className="flex w-full text-gray-600">
              RS. {filterdPrice?.min}
            </Text>
            -
            <Text className="flex w-full justify-end text-gray-600">
              Rs. {filterdPrice?.max}
            </Text>
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: "Book Types",
      children: (
        <Flex wrap="wrap" className="w-full gap-2">
          {bookTypeFilters?.map((item, index) => (
            <Tag
              key={index}
              className="cursor-pointer"
              onClick={() => {
                setBookType(item?.type);
                const selectedType = item?.name;
                setSearchedFilters((prev) => {
                  const exists = prev?.find((f) => f.type === item.type);
                  if (exists) return prev;
                  return [...prev, item];
                });
                const currentTypes = filters.types || [];
                const newTypes = currentTypes.includes(selectedType)
                  ? currentTypes
                  : [...currentTypes, selectedType];

                updateFilters({ types: newTypes });
              }}
              color={item?.color}
            >
              {item?.name}
            </Tag>
          ))}
        </Flex>
      ),
    },
  ];

  const onPageChange = (page, pageSize) => {
    setPagination((prevFilters) => ({
      ...prevFilters,
      perPage: pageSize,
    }));
    updateFilters({ page: page, perPage: pageSize });
  };

  const handleSearchBook = (e) => {
    const value = e.target.value.trim();
    setSearchingValue(value);
    const updatedFilters = searchedFilters.filter((f) => f.type !== "search");

    if (value !== "") {
      updatedFilters.push({
        name: value,
        color: "red",
        type: "search",
      });
    }

    setSearchedFilters(updatedFilters);
    setTimeout(() => {
      updateFilters({ searchTerm: e.target.value?.trim() });
    }, 1000);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex h-full w-[100%] flex-col items-center justify-center">
        <div className="flex h-[10%] w-full flex-col items-center justify-center gap-4 py-2 sm:flex-row">
          <Text className="px-2 text-xl font-normal">All Books</Text>
          <div className="f">
            <Input
              className="w-[300px] rounded-2xl"
              size="default"
              value={searchingValue}
              placeholder="Search Books"
              maxLength={60}
              suffix={<SearchOutline className="flex w-[20px]" />}
              onChange={handleSearchBook}
            />
          </div>
        </div>
        <div className="flex h-[90vh] w-full flex-row items-center justify-center">
          <div className="border-basicBorder hidden h-full w-[20%] items-start justify-center border-r p-2 md:flex">
            <Collapse className="w-full" ghost items={items} />
          </div>
          <div className="relative flex h-full w-[80%] flex-col items-center justify-center">
            {/* searched filters */}
            {searchedFilters?.length !== 0 && (
              <Flex
                wrap
                gap={2}
                className="flex w-full flex-row items-center justify-start p-4"
              >
                {searchedFilters?.map((item, index) => (
                  <Tag
                    closable
                    key={index}
                    className="cursor-pointer"
                    onClose={(e) => {
                      e.stopPropagation();
                      if (item.type === "search") {
                        updateFilters({ searchTerm: "" });
                        setSearchingValue("");
                      } else if (item.type === "price") {
                        setFilterdPrice({ min: 1000, max: 15000 });
                        updateFilters({ priceMin: "", priceMax: "" });
                      } else {
                        const updatedTypes = (filters.types || []).filter(
                          (t) => t !== item.name,
                        );
                        updateFilters({
                          types:
                            updatedTypes.length > 0 ? updatedTypes : undefined,
                        });
                      }
                    }}
                    color={"green"}
                  >
                    {item?.name}
                  </Tag>
                ))}
              </Flex>
            )}

            {/* fillered books */}
            {loading ? (
              <div className="w-full">
                {Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonComponent key={index} />
                ))}
              </div>
            ) : allBookDetails?.books?.length === 0 ? (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <NoDataAnim message="No books to display." />
              </div>
            ) : (
              <div className="my-2 grid w-full gap-4 overflow-y-scroll px-4 scrollbar-none xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {allBookDetails?.books?.map((item, index) => (
                  <div
                    key={index}
                    className="flex h-[100%] w-full cursor-pointer flex-col items-center justify-evenly gap-4 rounded-md p-2 hover:bg-gray-100"
                    onClick={() => navigateTo(`/view-book/${item?.bookId}`)}
                  >
                    <Image
                      preview={false}
                      src={item?.cover_images}
                      height={"250px"}
                    />
                    <Text className="w-[80%] text-ellipsis text-center">
                      {item?.title}
                    </Text>
                    <Rate defaultValue={item?.rating} disabled />
                    <Text>Rs. {item?.price}</Text>
                    <Text
                      className={`${item?.qty > 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {item?.qty > 0 ? "In Stock" : "Out of Stock"}
                    </Text>
                  </div>
                ))}
              </div>
            )}

            {/* pagination */}
            <div className="bottom-0 left-0 z-50 flex w-full justify-end p-4 px-4 md:px-12">
              {pagination.totalCount > 10 && (
                <Pagination
                  current={pagination.page}
                  onChange={onPageChange}
                  total={pagination?.totalCount}
                  showSizeChanger={true}
                  pageSize={pagination?.perPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* footer section */}
      <div className="w-full">
        <FooterSection />
      </div>
    </div>
  );
};

export default AllBooks;
