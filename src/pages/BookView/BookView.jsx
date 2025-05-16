import React, { useContext, useEffect, useState } from "react";
import FooterSection from "../../components/Footer/FooterSection";
import {
  Carousel,
  ConfigProvider,
  Image,
  Input,
  InputNumber,
  Rate,
  Segmented,
  Skeleton,
  Typography,
} from "antd";
import UserIcon from "../../assets/images/svg/bookview/UserIcon";
import CustomButton from "../../components/buttons/CustomButton";
import ActionDialog from "../../components/popups/ActionDialog";
import OnlinEReadIcon from "../../assets/images/svg/bookview/OnlinEReadIcon";
import { NewRelease } from "../../utils/constent/BookDetails";
import HomeAndNotificationContext from "../../context/HomeAndNotificationContext";
import { useNavigate, useParams } from "react-router-dom";
import MasterCardIcon from "../../assets/images/svg/bookview/MasterCardIcon";
import VisaCard from "../../assets/images/svg/bookview/VisaCard";
import BookService from "../../services/BookService";
import { NotificationContext } from "../../context/NotificationContext";
import SkeletonComponent from "../../components/Skeleton/SkeletonComponent";
import { a, title } from "framer-motion/client";
import NoDataAnim from "../../components/nodataAnim/NoDataAnim";
import {
  getLocalStoragedata,
  setLocalStorageData,
} from "../helpers/StorageHelper";
import BackButtonIcon from "../../assets/images/common/BackButtonIcon";
import BookContext from "../../context/BookContext";
import { AuthContext } from "../../context/AuthContext";
import OnlineBook from "./component/OnlineBook";
import AddToWishlist from "./component/AddToWishlist";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeartSharp } from "react-icons/io5";
import WishListService from "../../services/WishListService";
const { Text, Title } = Typography;
const { TextArea } = Input;

const BookView = () => {
  const [selectedView, setSelectedView] = useState("description");
  const [bookDetails, setBookDetails] = useState({
    title: "Sample Book Title",
    author: "Author Name",
    price: "Rs. 100.00",
    rating: 4.5,
  });
  const [loading, setLoading] = useState(false);
  const [allBookDetails, setAllBookDetails] = useState(false);
  const [relatedBookDetails, setRelatedBookDetails] = useState([]);
  const [itemCount, setItemCount] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistData, setWishlistData] = useState(false);

  const [registerToProceed, setRegisterToProceed] = useState(false);
  const [addToWishlist, setAddToWishlist] = useState(false);
  const [readOnlineBookModalOpen, setReadOnlineBookModalOpen] = useState(false);
  const [isMobileSize, setIsMobileSize] = useState(false);
  const [wishListType, setWishListType] = useState(false);
  const [createReviewModalOpen, setCreateReviewModalOpen] = useState(false);
  const { setOpenCartDrawer } = useContext(HomeAndNotificationContext);
  const { openNotification, handleError } = useContext(NotificationContext);
  const { orderDetails, setOrderDetails } = useContext(BookContext);
  const { user, isAuthChack } = useContext(AuthContext);

  const navigateTo = useNavigate();
  const { id } = useParams();
  const { getBookById, getAllBooks, addNewReview } = BookService();
  const { checkWishlistService } = WishListService();

  useEffect(() => {
    const initialFetch = async () => {
      await fetchBooks();
      isAuthChack && (await checkWishlist());
    };
    initialFetch();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    const data = { bookId: id };
    const response = await getBookById(data);
    try {
      if (response) {
        if (response.responseType === "success") {
          setAllBookDetails(response.output.data);
          await fetchAllBooks(response.output.data?.types);
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

  const checkWishlist = async () => {
    setLoading(true);
    const data = { bookId: id, userId: user?.id };
    const response = await checkWishlistService(data);
    try {
      if (response) {
        if (response.responseType === "success") {
          if (response.output.data) {
            setIsWishlisted(true);
            setWishlistData(response.output.data);
          } else {
            setIsWishlisted(false);
            setWishlistData(null);
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
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const fetchAllBooks = async (data) => {
    const response = await getAllBooks({ types: data });
    try {
      if (response) {
        if (response.responseType === "success") {
          setRelatedBookDetails(
            response.output.data.books.filter((book) => book.bookId !== id),
          );
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
    }
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const images = [
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  ];
  const reviews = [
    {
      userName: "saman",
      rating: 4,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    },
    {
      userName: "Amara",
      rating: 5,
      content:
        "Fantastic product! The quality exceeded my expectations. Will definitely recommend it to others.",
    },
    {
      userName: "Kavindu",
      rating: 3,
      content:
        "It's decent for the price, but there are a few improvements that could be made. Delivery was quick though.",
    },
    {
      userName: "Nimal",
      rating: 4,
      content:
        "Good product, but the packaging could have been better. Happy with my purchase overall.",
    },
    {
      userName: "Tharushi",
      rating: 5,
      content:
        "Absolutely love it! The design and functionality are perfect. I will be buying again.",
    },
    {
      userName: "Ravindu",
      rating: 2,
      content:
        "Not very satisfied. The item arrived with a small defect. Customer support was helpful, but still disappointed.",
    },
  ];

  const CreateReviewBody = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState(null);
    const [reviewLoading, setReviewLoading] = useState(false);

    const submitReview = async () => {
      setReviewLoading(true);
      const data = {
        bookId: id,
        rating: rating,
        comment: review.trim(),
        userName: user?.username,
      };

      const response = await addNewReview(data);
      try {
        if (response) {
          if (response.responseType === "success") {
            fetchBooks();
            setCreateReviewModalOpen(false);
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
        setReviewLoading(false);
      }
    };

    return (
      <div className="mt-4 flex w-full flex-col items-start justify-start gap-4">
        <Rate value={rating} onChange={(e) => setRating(e)} />
        <TextArea
          rows={4}
          placeholder="Write a review"
          maxLength={200}
          className="w-full"
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <div className="items center flex w-full flex-row justify-end gap-3">
          <CustomButton
            buttonName="Cancel"
            onClick={() => setCreateReviewModalOpen(false)}
            disabled={reviewLoading}
          />
          <CustomButton
            type="primary"
            buttonName="Submit"
            loading={reviewLoading}
            disabled={!review}
            onClick={() => {
              submitReview();
            }}
          />
        </div>
      </div>
    );
  };

  const addToCart = () => {
    setOpenCartDrawer(true);
  };

  const RegisterWarning = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <Text className="text-center">
          You need to be signed in to purchase books. Please{" "}
          <span
            className="cursor-pointer text-primary"
            onClick={() => {
              navigateTo(`/onboarding/sign-in/${id}`);
            }}
          >
            log in
          </span>{" "}
          or{" "}
          <span
            className="cursor-pointer text-primary"
            onClick={() => {
              navigateTo(`/onboarding/sign-up/${id}`);
            }}
          >
            create an account
          </span>{" "}
          to continue.
        </Text>
      </div>
    );
  };
  const checkOutBook = () => {
    const userDetails = getLocalStoragedata("userDetails");

    const orderDetails = [
      {
        bookId: id,
        title: allBookDetails?.title,
        price: allBookDetails?.price,
        qty: itemCount,
      },
    ];
    setLocalStorageData("orderDetails", orderDetails);
    setOrderDetails(orderDetails);
    if (userDetails) {
      navigateTo(`/checkout-book/${id}`);
    } else {
      setRegisterToProceed(true);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileSize(window.innerWidth < 368);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pdfUrl = allBookDetails?.pdf_file;

  return (
    <div className="flex flex-col items-center justify-center">
      {loading ? (
        <div className="flex h-full w-full flex-col">
          <Skeleton
            active
            paragraph={false}
            className="mt-6 flex w-1/2 justify-start"
          />
          <Skeleton.Image active className="m-5 h-48 rounded-full" />
          <Skeleton active className="mt-2 flex justify-start" />
          <Skeleton active className="mt-4 flex justify-start" />
        </div>
      ) : (
        <>
          {/* Main area of book details */}
          <div className="relative flex h-fit w-full flex-col items-center justify-center border-b md:flex-row">
            <div className="absolute left-0 top-0 h-10 w-full pl-5 pt-2">
              <BackButtonIcon
                className="cursor-pointer"
                onClick={() => navigateTo(-1)}
              />
            </div>
            {/* Image area */}
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-10 md:w-[50%] lg:w-[40%]">
              <div className="h-fit w-full">
                <ConfigProvider
                  theme={{
                    token: {
                      colorBgContainer: "black",
                    },
                  }}
                >
                  <Carousel afterChange={onChange}>
                    {images.map((src, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center"
                      >
                        <Image
                          src={allBookDetails?.cover_images}
                          preview={false}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </Carousel>
                </ConfigProvider>
              </div>
            </div>

            <div className="flex h-full w-full flex-row items-start justify-start md:w-[50%] lg:w-[60%]">
              <div className="flex h-full w-full flex-col items-start justify-start p-5 lg:w-[60%]">
                <Text className="text-xl font-semibold">
                  {allBookDetails?.title}
                </Text>
                <ConfigProvider
                  theme={{
                    components: {
                      Rate: {
                        starSize: 18,
                      },
                    },
                  }}
                >
                  <Rate
                    defaultValue={2}
                    disabled
                    value={allBookDetails?.rating}
                  />
                </ConfigProvider>
                <Text
                  className={`mt-2 text-xs font-semibold text-green-500 ${allBookDetails?.qty > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {allBookDetails?.qty > 0 ? "In Stock" : "Out of Stock"}
                </Text>
                <Text className="mt-6 text-xs">
                  Auther: {allBookDetails?.author}
                </Text>
                <div className="flex flex-row items-center justify-between gap-2">
                  {allBookDetails?.discountPrice && (
                    <Text delete className="text-lg font-normal text-gray-500">
                      RS. {allBookDetails?.discountPrice}
                    </Text>
                  )}
                  <Text className="text-2xl font-semibold text-blue-500">
                    RS. {allBookDetails?.price}
                  </Text>
                </div>
                <div className="mt-5 flex w-[80%] flex-col items-center gap-5">
                  <div className="flex w-full flex-row">
                    <div className="w-[50%] text-sm text-gray-500">
                      Publisher :{" "}
                    </div>
                    <div className="w-[50%] text-sm text-gray-800">
                      {allBookDetails?.publisher}
                    </div>
                  </div>
                  <div className="flex w-full flex-row">
                    <div className="w-[50%] text-sm text-gray-500">
                      Year of Publishing :{" "}
                    </div>
                    <div className="w-[50%] text-sm text-gray-800">
                      {allBookDetails?.pub_year}
                    </div>
                  </div>
                  <div className="flex w-full flex-row">
                    <div className="w-[50%] text-sm text-gray-500">
                      Number of pages :{" "}
                    </div>
                    <div className="w-[50%] text-sm text-gray-800">
                      {allBookDetails?.number_of_pages}
                    </div>
                  </div>
                  <div className="flex w-full flex-row">
                    <div className="w-[50%] text-sm text-gray-500">ISBN : </div>
                    <div className="w-[50%] text-sm text-gray-800">
                      {allBookDetails?.ISBN_number}
                    </div>
                  </div>
                  <div className="flex w-full flex-row">
                    <div className="w-[50%] text-sm text-gray-500">
                      Format :{" "}
                    </div>
                    <div className="w-[50%] text-sm text-gray-800">
                      {allBookDetails?.format === "BOTH"
                        ? "Physical & Digital"
                        : allBookDetails?.format}
                    </div>
                  </div>
                </div>
                {/* button area */}
                <>
                  {(allBookDetails?.format === "BOTH" ||
                    allBookDetails?.format === "DIGITAL") && (
                    <CustomButton
                      className="mt-5"
                      size="medium"
                      icon={<OnlinEReadIcon color="#0094E8" />}
                      buttonName="Read Online"
                      onClick={() => setReadOnlineBookModalOpen(true)}
                    />
                  )}

                  <div className="mt-5 flex flex-col items-center justify-center gap-3 xs:flex-row">
                    <InputNumber
                      min={1}
                      max={allBookDetails?.qty}
                      defaultValue={1}
                      //value={itemCount}
                      onKeyDown={(event) => {
                        const allowedKeys = [
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                        ];

                        if (allowedKeys.includes(event.key)) return;

                        if (!/^\d$/.test(event.key)) {
                          event.preventDefault(); // Block non-numeric
                          return;
                        }

                        const newValue = `${itemCount}${event.key}`;
                        if (parseInt(newValue, 10) > allBookDetails?.qty) {
                          event.preventDefault(); // Prevent value > qty
                        }
                      }}
                      onPaste={(event) => {
                        event.preventDefault();
                        const paste = event.clipboardData.getData("text");
                        if (!/^\d+$/.test(paste)) return;

                        const combinedValue = parseInt(paste, 10);
                        if (combinedValue > allBookDetails?.qty) {
                          return; // Ignore paste
                        }
                        // Accept valid pasted value
                        setItemCount(combinedValue);
                      }}
                      onChange={(value) => {
                        if (value <= allBookDetails?.qty) {
                          setItemCount(value);
                        }
                      }}
                      disabled={allBookDetails?.qty === 0}
                      changeOnWheel
                      className=""
                    />

                    {isAuthChack &&
                      (isWishlisted ? (
                        <IoHeartSharp
                          className="cursor-pointer"
                          color="green"
                          size={40}
                          onClick={() => {
                            setWishListType("edit");
                            setAddToWishlist(true);
                          }}
                        />
                      ) : (
                        <IoMdHeartEmpty
                          className="cursor-pointer"
                          color="green"
                          size={40}
                          onClick={() => {
                            setWishListType("create");
                            setAddToWishlist(true);
                          }}
                        />
                      ))}
                    <CustomButton
                      type="primary"
                      size="medium"
                      buttonName="Buy Now"
                      onClick={checkOutBook}
                      className="w-full"
                      disabled={allBookDetails?.qty === 0 || itemCount === null}
                    />
                  </div>
                </>
                <div className="mt-4 flex h-[15%] w-full flex-row items-center justify-start gap-2 rounded-lg border p-2">
                  <Text className="font-semibold text-gray-500">
                    Payment Methods - Cash On Delivery | Koko
                  </Text>
                  <MasterCardIcon />
                  <VisaCard />
                </div>
                {/* Segmented area */}
                <div className="mt-4 flex w-full justify-start">
                  <Segmented
                    vertical={isMobileSize}
                    size="medium"
                    className="flex"
                    options={[
                      {
                        label: (
                          <div
                            className={`flex w-[150px] items-center justify-center p-1 text-xs`}
                          >
                            Description
                          </div>
                        ),
                        value: "description",
                      },
                      {
                        label: (
                          <div
                            className={`flex w-[150px] items-center justify-center p-1 text-xs`}
                          >
                            Reviews
                          </div>
                        ),
                        value: "reviews",
                      },
                    ]}
                    value={selectedView}
                    onChange={setSelectedView}
                  />
                </div>
              </div>
              {/* related books */}
              <div className="hidden h-[600px] w-[40%] flex-col items-center justify-between gap-6 overflow-y-scroll border-l py-4 scrollbar-none lg:flex">
                <Text className="flex w-full items-center justify-center text-primary">
                  Related Books
                </Text>
                {relatedBookDetails?.length !== 0 ? (
                  relatedBookDetails?.map((item, index) => (
                    <div
                      key={index}
                      className="flex h-[100%] w-full cursor-pointer flex-col items-center justify-evenly gap-2 rounded-md p-2 hover:bg-gray-100"
                      onClick={() => navigateTo(`/view-book/${item?.bookId}`)}
                    >
                      <Image
                        preview={false}
                        src={item?.cover_images}
                        height={"250px"}
                      />
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
                  ))
                ) : (
                  <div className="flex h-[100%] w-full items-center">
                    <NoDataAnim message={"No related books found."} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* description & review section */}
          <div className="mt-10 flex w-full flex-col items-center justify-center p-2">
            {selectedView === "description" ? (
              <Text className="w-[80%] px-4 text-start text-xs">
                {allBookDetails?.description}
              </Text>
            ) : (
              <div className="flex w-full flex-col items-center justify-center gap-2">
                <div className="w-[80%] rounded pb-4">
                  {user && (
                    <CustomButton
                      buttonName="Write a review"
                      onClick={() => setCreateReviewModalOpen(true)}
                    />
                  )}
                </div>
                {allBookDetails?.reviews?.length === 0 ? (
                  <NoDataAnim message={"No reviews found."} />
                ) : (
                  allBookDetails?.reviews?.map((review, index) => (
                    <div key={index} className="w-[80%] rounded border p-2">
                      <Rate defaultValue={review?.rating} disabled />
                      <div className="flex flex-row gap-2">
                        <UserIcon />
                        <Text>{review?.userName}</Text>
                      </div>
                      <Text className="text-xs">{review?.comment}</Text>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </>
      )}
      {/* footer section */}
      <div className="mt-10 w-full">
        <FooterSection />
      </div>

      {/* review write modal */}
      <ActionDialog
        title="Write a review"
        modelOpen={createReviewModalOpen}
        handleCancel={() => {
          setCreateReviewModalOpen(false);
        }}
      >
        <CreateReviewBody />
      </ActionDialog>

      {/* online read book modal */}
      <ActionDialog
        size={900}
        title={allBookDetails?.title}
        modelOpen={readOnlineBookModalOpen}
        handleCancel={() => {
          setReadOnlineBookModalOpen(false);
        }}
      >
        <OnlineBook pdfUrl={pdfUrl} />
      </ActionDialog>

      {/* Sign in/Sign up warning modal */}
      <ActionDialog
        size={400}
        title="Register to proceed"
        modelOpen={registerToProceed}
        handleCancel={() => {
          setRegisterToProceed(false);
        }}
      >
        <RegisterWarning />
      </ActionDialog>

      {/* Add to wishlist modal */}
      <ActionDialog
        size={400}
        title="Add to wishlist"
        modelOpen={addToWishlist}
        handleCancel={() => {
          setAddToWishlist(false);
        }}
      >
        <AddToWishlist
          book={allBookDetails}
          type={wishListType}
          data={wishlistData}
          handleCancel={async () => {
            await checkWishlist();
            setAddToWishlist(false);
          }}
        />
      </ActionDialog>
    </div>
  );
};

export default BookView;
