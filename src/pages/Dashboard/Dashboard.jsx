import React, { useContext, useEffect, useRef, useState } from "react";
import DashBoardImageOne from "../../assets/images/svg/dashboard/DashBoardImageOne";
import { motion } from "framer-motion";
import { ConfigProvider, Image, Rate, Tabs, Typography } from "antd";
import {
  AwardWinners,
  BestSellers,
  CommingSoon,
  NewRelease,
} from "../../utils/constent/BookDetails";
import DashBoardImageTwo from "../../assets/images/svg/dashboard/DashBoardImageTwo";
import { UserDetails } from "../../utils/constent/UserDetails";
import FooterSection from "../../components/Footer/FooterSection";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../context/NotificationContext";
import BookContext from "../../context/BookContext";
import BookService from "../../services/BookService";
import LoadingAnim from "../../components/loader/LoadingAnim";
const { Text } = Typography;

const Dashboard = () => {
  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: -10 },
  };

  const quotes = [
    "Opportunities don’t happen. You create them. Opportunities are not random occurrences but are the result of proactive effort, planning, and taking initiative to shape your future.",
    "Success is not the key to happiness. Happiness is the key to success. True success comes from pursuing what makes you genuinely happy, as happiness drives motivation and passion in achieving your goals.",
    "The only way to do great work is to love what you do. When you are passionate about your work, you are naturally driven to put in effort, creativity, and dedication, leading to outstanding results.",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. Confidence and self-belief empower you to overcome challenges, helping you realize your potential and achieve greatness.",
  ];
  const navigateto = useNavigate();
  const [quote, setQuote] = useState(quotes[0]);
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);
  const [newReleases, setNewReleases] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [commingSoon, setCommingSoon] = useState([]);
  const [awardWinners, setAwardWinners] = useState([]);
  const { getAllBooks } = BookService();

  const intervalRef = useRef(null);
  const { filters, updateFilters, setBooks, setBookData } =
    useContext(BookContext);
  const { openNotification, handleError } = useContext(NotificationContext);

  useEffect(() => {
    let index = 0;
    intervalRef.current = setInterval(() => {
      setQuote(quotes[index]);
      index = (index + 1) % quotes.length;
    }, 6000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const getTextColor = (value) => (activeTab === value ? "#0d7cff" : "gray");
  const TabContent = ({ item, index }) => {
    return (
      <div
        key={index}
        className="flex h-[100%] w-full cursor-pointer flex-col items-center justify-evenly gap-2 rounded-md p-2 hover:bg-gray-100"
        onClick={() => navigateto(`/view-book/${item?.bookId}`)}
      >
        <Image preview={false} src={item?.cover_images} height={"250px"} />
        <Text className="w-[80%] text-center">
          {item?.title.length > 20
            ? `${item?.title.slice(0, 20)}...`
            : item?.title}
        </Text>
        <Rate defaultValue={item?.rating} disabled />
        <Text>Rs. {item?.price}</Text>
        <Text
          className={`${item?.avialability === "In Stock" ? "text-green-500" : "text-red-500"}`}
        >
          {item?.avialability}
        </Text>
      </div>
    );
  };
  const tabItems = [
    {
      key: "1",
      label: <Text style={{ color: getTextColor("1") }}>New Releases</Text>,
      content: (
        <div className="mt-5 flex h-[50vh] w-full flex-row items-center justify-between gap-4 px-4 py-2">
          {newReleases.slice(0, 4).map((item, index) => (
            <TabContent key={index} item={item} index={index} />
          ))}
        </div>
      ),
    },
    {
      key: "2",
      label: <Text style={{ color: getTextColor("2") }}>Award Winners</Text>,
      content: (
        <div className="mt-5 flex h-[50vh] w-full flex-row items-center justify-between gap-4 px-4 py-2">
          {awardWinners.slice(0, 4).map((item, index) => (
            <TabContent key={index} item={item} index={index} />
          ))}
        </div>
      ),
    },
    {
      key: "3",
      label: <Text style={{ color: getTextColor("3") }}>Best Sellers</Text>,
      content: (
        <div className="mt-5 flex h-[50vh] w-full flex-row items-center justify-between gap-4 px-4 py-2">
          {bestSellers.slice(0, 4).map((item, index) => (
            <TabContent key={index} item={item} index={index} />
          ))}
        </div>
      ),
    },
    {
      key: "4",
      label: <Text style={{ color: getTextColor("4") }}>Coming Soon</Text>,
      content: (
        <div className="mt-5 flex h-[50vh] w-full flex-row items-center justify-between gap-4 px-4 py-2">
          {commingSoon.slice(0, 4).map((item, index) => (
            <TabContent key={index} item={item} index={index} />
          ))}
        </div>
      ),
    },
  ];

  const hasLogged = useRef(false);

  useEffect(() => {
    // if (!hasLogged.current) {
    //   fetchBooks();
    //   hasLogged.current = true;
    // }
    fetchBooks();
  }, [filters]);

  const fetchBooks = async () => {
    setLoading(true);
    const response = await getAllBooks(filters);
    try {
      if (response) {
        if (response.responseType === "success") {
          setBookData(response.output.data);
          setBooks(response.output.data.books);
          const data = response.output.data.books;
          switch (activeTab) {
            case "1":
              setNewReleases(data);
              break;
            case "2":
              setAwardWinners(data);
              break;
            case "3":
              setBestSellers(data);
              break;
            case "4":
              setCommingSoon(data);
              break;
            default:
              break;
          }
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
      setLoading(false);
    }
  };
  const updateFilterOnAction = (value) => {
    updateFilters({
      ...filters,
      defaultFilter: value,
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {/* section one */}
        <div className="relative flex h-[92vh] w-[100%] items-center justify-center">
          <DashBoardImageOne />
          <div className="absolute left-24 top-0 top-32 flex flex-col items-center justify-center gap-5">
            <Text className="text-lg font-bold text-gray-700">
              Choose Your Book!
            </Text>
            <Text className="w-[80%] text-center text-5xl text-gray-700">
              Meet Favorite Authors
            </Text>

            <div
              className="mt-10 flex h-[10%] w-[70%] cursor-pointer items-center justify-center bg-cardGray p-2 text-white"
              onClick={() => navigateto("/all-books")}
            >
              DISCOVER YOUR NEXT BOOK
            </div>
          </div>
        </div>
        {/* section two */}
        <div className="flex h-[90vh] w-[100%] flex-col items-center justify-start gap-2 bg-white pt-10">
          <Text className="text-5xl font-normal text-black">
            Discover Your Next Book
          </Text>
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: "#FFFFFF",
                borderRadius: 8,
                itemColor: "#FFFFFF",
                colorBorderSecondary: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <Tabs
              defaultActiveKey="1"
              activeKey={activeTab}
              onChange={(key) => {
                setActiveTab(key);
                switch (key) {
                  case "1":
                    updateFilterOnAction("newRelease");
                    break;
                  case "2":
                    updateFilterOnAction("isAwarded");
                    break;
                  case "3":
                    updateFilterOnAction("bestSelling");
                    break;
                  case "4":
                    updateFilterOnAction("comingSoon");
                    break;
                  default:
                    break;
                }
              }}
              centered
              size="large"
              tabBarGutter={30}
              className="mt-10 w-[80%] max-w-[1200px]"
              tabBarStyle={{
                height: "40px",
                margin: 0,
                padding: "5px 5px 0px 5px",
                paddingTop: "5px",
                paddingLeft: "8px",
                borderStartStartRadius: "7px",
                borderStartEndRadius: "7px",
              }}
              items={tabItems.map((e, i) => {
                const id = String(i + 1);
                return {
                  label: e.label,
                  key: id,
                  children: e.content,
                };
              })}
            />
          </ConfigProvider>
        </div>
        {/* section three */}
        <div className="relative flex h-[90vh] w-[100%] items-center justify-center">
          <DashBoardImageTwo />
          <div className="absolute bottom-0 left-40 top-1 flex w-[600px] items-center justify-center sm:bottom-5">
            <motion.div
              key={quote}
              variants={headingVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 2 }}
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full text-center font-bold"
            >
              <div className="z-10 w-full text-center">
                <Text className="text-center text-lg font-semibold text-black">
                  {quote}{" "}
                </Text>
                <Text className="text-center text-lg font-normal italic text-black">
                  – Chris Grosser
                </Text>
              </div>
            </motion.div>
          </div>
        </div>
        {/* section four */}
        <div className="flex h-[80vh] w-[100%] flex-col items-center justify-start pt-10">
          <Text className="text-5xl font-normal text-black">
            Most Popular Authors
          </Text>
          <div className="mt-10 flex h-[50vh] w-[90%] flex-row items-center justify-between gap-4 px-4 py-2">
            {UserDetails.map((item, index) => (
              <div
                key={index}
                className="flex h-[100%] w-[20%] flex-col items-center justify-evenly"
              >
                <Image src={item?.source} height={"250px"} width={"200px"} />
                <Text className="text-lg font-semibold">{item?.name}</Text>
                <Rate defaultValue={item?.rating} disabled />
                <Text>{item?.role}</Text>
              </div>
            ))}
          </div>
        </div>
        {/* section five */}
        <div className="w-full">
          <FooterSection />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
