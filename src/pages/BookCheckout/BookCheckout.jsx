import { Checkbox, Form, Image, Input, Radio, Select, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import CorrectIcon from "../../assets/images/svg/checkout/CorrectIcon";
import CustomButton from "../../components/buttons/CustomButton";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import PhoneInput from "react-phone-input-2";
import FooterSection from "../../components/Footer/FooterSection";

import BackButtonIcon from "../../assets/images/common/BackButtonIcon";
import payHereBanner from "../../assets/images/png/payhere_long_banner.png";
import KokoIcon from "../../assets/images/png/logo1.7ff549c0.png";

import { useNavigate } from "react-router-dom";
import BookContext from "../../context/BookContext";
import { setLocalStorageData } from "../helpers/StorageHelper";
import OrderService from "../../services/OrderService";
import { AuthContext } from "../../context/AuthContext";
import { NotificationContext } from "../../context/NotificationContext";

const { Text } = Typography;
const BookCheckout = () => {
  const [loading, setLoading] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [shippingCost, setShippingCost] = useState();
  const [form] = Form.useForm();
  const image = "src/assets/images/png/payhere_long_banner.png";
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(1);
  const { orderDetails, setOrderDetails } = useContext(BookContext);
  const { openNotification, handleError } = useContext(NotificationContext);
  const { user } = useContext(AuthContext);
  const SHIPPING_FEE = 1000;
  const navigateTo = useNavigate();
  const { createOrder } = OrderService();

  const onChange = (e) => {
    setSelectedPaymentOption(e.target.value);
  };
  useEffect(() => {
    console.log(orderDetails);
    const totalAmount = orderDetails
      ?.map((item) => item.price * item.qty)
      .reduce((a, b) => a + b, 0);

    const shippingCost = orderDetails
      ?.map((item) => (item.price * 10) / 100)
      .reduce((a, b) => a + b, 0);

    setTotalAmount(totalAmount);
    setShippingCost(shippingCost);
  }, []);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const data = {
        customer_id: user?.id,
        order_details: orderDetails?.map((item) => {
          return {
            book_id: item?.bookId,
            qty: item?.qty,
          };
        }),
        shippingAddress: {
          address: values?.address,
          city: values?.cityOrSuburb,
          postalCode: values?.postalCode,
          country: values?.country,
        },
        paymentMethod: values?.paymentOption === 1 ? "Cash" : "Credit Card",
        phoneNumber: values?.phoneNumber,
      };
      console.log(data);
      const response = await createOrder(data);
      if (response) {
        if (response.responseType === "success") {
          openNotification("success", response?.output?.message);
          setLocalStorageData("orderDetails", null);
          setTimeout(() => {
            navigateTo(`/order-success/${response?.output?.data?._id}`);
          }, 1000);
        } else if (response.responseType === "fail") {
          openNotification("error", response?.output?.message);
        } else if (response.responseType === "error") {
          handleError(response.output);
        }
      } else {
        openNotification("error", "Something went wrong");
        setLoading(false);
      }
    } catch (e) {
      openNotification("error", "Something went wrong");
      setLoading(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex w-full flex-row items-center justify-center gap-3 rounded bg-green-400 p-4">
        <CorrectIcon />
        <Text className="text-sm text-gray-800">
          Order has been added to your cart.
        </Text>
      </div>

      <div className="relative flex h-full w-full flex-row items-center justify-center">
        <div className="absolute left-0 top-0 h-10 w-full pl-5 pt-2">
          <BackButtonIcon
            className="cursor-pointer"
            onClick={() => navigateTo(-1)}
          />
        </div>
        <div className="mt-4 flex h-full w-full justify-between py-4">
          <Form
            form={form}
            className="flex w-[100%] flex-col md:flex-row"
            layout="vertical"
            onFinish={onFinish}
            // initialValues={{
            //   fullName: billingData?.userName ? billingData?.userName : "",
            //   phoneNumber: billingData?.phoneNumber,
            //   addressLineOne: billingData?.addressLine01
            //     ? billingData?.addressLine01
            //     : "",
            //   addressLineTwo: billingData?.addressLine02
            //     ? billingData?.addressLine02
            //     : "",
            //   cityOrSuburb: billingData?.city ? billingData?.city : "",
            //   postalCode: billingData?.postalCode
            //     ? billingData?.postalCode
            //     : "",
            //   stateOrProvince: billingData?.states ? billingData?.states : "",
            //   country: billingData?.country ? billingData?.country : undefined, // Ensure this is set to undefined if not available
            //   companyTaxID: billingData?.taxId ? billingData?.taxId : "",
            //   businessRegistrationNumber: billingData?.brNumber
            //     ? billingData?.brNumber
            //     : "",
            // }}
            // onFieldsChange={(_, allFields) => {
            //   if (billingData === null) {
            //     if (
            //       allFields[0].value === "" &&
            //       allFields[1].value === "" &&
            //       allFields[2].value === "" &&
            //       allFields[3].value === "" &&
            //       allFields[4].value === "" &&
            //       allFields[5].value === "" &&
            //       allFields[6].value === "" &&
            //       allFields[7].value === ""
            //     ) {
            //       setButtonState(true);
            //     } else {
            //       setButtonState(false);
            //     }
            //   } else {
            //     if (
            //       allFields[0].value === billingData?.userName &&
            //       allFields[1].value.countryCode +
            //         allFields[1].value.areaCode +
            //         allFields[1].value.phoneNumber ===
            //         billingData?.phoneNumber &&
            //       allFields[2].value === billingData?.addressLine01 &&
            //       allFields[3].value === billingData?.addressLine02 &&
            //       allFields[4].value === billingData?.city &&
            //       allFields[5].value === billingData?.postalCode &&
            //       allFields[6].value === billingData?.states &&
            //       allFields[7].value === billingData?.country &&
            //       allFields[8].value === billingData?.taxId &&
            //       allFields[9].value === billingData?.brNumber
            //     ) {
            //       setButtonState(true);
            //     } else {
            //       setButtonState(false);
            //     }
            //   }
            // }}
          >
            {/* Billing Details */}
            <div className="w-full space-y-4 border-r px-6 py-4 md:w-[50%]">
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                className="w-full text-start"
                rules={[
                  {
                    required: true,
                    message: "Phone number is required!",
                  },
                  {
                    pattern: /^\d{10}$/,
                    message: "Phone number must be exactly 10 digits!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Phone Number"
                  maxLength={10}
                  onKeyDown={(e) => {
                    const isNumberKey = /^[0-9]$/.test(e.key);
                    const allowedKeys = [
                      "Backspace",
                      "Delete",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                    ];

                    if (!isNumberKey && !allowedKeys.includes(e.key)) {
                      e.preventDefault(); // Block non-numeric keys
                    }
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pastedText = e.clipboardData.getData("text/plain");
                    const sanitizedText = pastedText.replace(
                      /[^a-zA-Z0-9\s]/g,
                      "",
                    );
                    document.execCommand(
                      "insertText",
                      false,
                      sanitizedText.trim(),
                    );
                  }}
                />
              </Form.Item>

              <Form.Item
                name="address"
                label="Address"
                className="w-full text-start"
                rules={[
                  {
                    required: true,
                    message: "Address Line 01 is required!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Address Line 01 "
                  maxLength={60}
                  onKeyDown={(e) => {
                    const key = e.key;
                    const { value } = e.target;

                    if (key === " " && value.length === 0) {
                      e.preventDefault();
                    }

                    if (key === " " && value.endsWith(" ")) {
                      e.preventDefault();
                    }
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pastedText = e.clipboardData.getData("text/plain");
                    const cleanedText = pastedText.replace(/\s\s+/g, " ");
                    const trimmedText = cleanedText.trim();
                    document.execCommand("insertText", false, trimmedText);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="cityOrSuburb"
                label="City or Suburb"
                className="w-full text-start"
                rules={[
                  {
                    required: true,
                    message: "City or Suburb is required!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="City or Suburb "
                  maxLength={60}
                  onKeyDown={(e) => {
                    const key = e.key;
                    const { value } = e.target;

                    if (key === " " && value.length === 0) {
                      e.preventDefault();
                    }

                    if (key === " " && value.endsWith(" ")) {
                      e.preventDefault();
                    }
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pastedText = e.clipboardData.getData("text/plain");
                    const cleanedText = pastedText.replace(/\s\s+/g, " ");
                    const trimmedText = cleanedText.trim();
                    document.execCommand("insertText", false, trimmedText);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="postalCode"
                label="Postal Code"
                className="w-full text-start"
                rules={[
                  {
                    required: true,
                    message: "Postal Code is required!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Postal Code "
                  maxLength={10}
                  onKeyDown={(e) => {
                    const key = e.key;

                    // Prevent typing special characters
                    if (/[^a-zA-Z0-9]/.test(key)) {
                      e.preventDefault();
                    }

                    const { value } = e.target;
                    if (key === " " && value.length === 0) {
                      e.preventDefault();
                    }
                    if (key === " " && value.endsWith(" ")) {
                      e.preventDefault();
                    }
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pastedText = e.clipboardData.getData("text/plain");
                    const sanitizedText = pastedText.replace(
                      /[^a-zA-Z0-9\s]/g,
                      "",
                    );
                    document.execCommand(
                      "insertText",
                      false,
                      sanitizedText.trim(),
                    );
                  }}
                />
              </Form.Item>

              <Form.Item
                name="country"
                label="Select Country"
                className="w-full text-start"
                rules={[
                  {
                    required: true,
                    message: "Country is required!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Country "
                  maxLength={60}
                  onKeyDown={(e) => {
                    const key = e.key;
                    const { value } = e.target;

                    if (key === " " && value.length === 0) {
                      e.preventDefault();
                    }

                    if (key === " " && value.endsWith(" ")) {
                      e.preventDefault();
                    }
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pastedText = e.clipboardData.getData("text/plain");
                    const cleanedText = pastedText.replace(/\s\s+/g, " ");
                    const trimmedText = cleanedText.trim();
                    document.execCommand("insertText", false, trimmedText);
                  }}
                />
              </Form.Item>
            </div>

            {/* Order Details */}
            <div className="w-full px-6 py-4 md:w-[50%]">
              <div className="flex h-full flex-col rounded-lg bg-gray-100 p-4">
                <Text className="w-full text-center text-lg">Your Order</Text>
                <div className="mt-2 flex w-full flex-col gap-4 bg-white p-4">
                  <Text className="flex w-full flex-row justify-between border-b py-2">
                    <span>PRODUCT</span>
                    <span>SUBTOTAL</span>
                  </Text>
                  {orderDetails?.map((item, index) => (
                    <Text
                      key={index}
                      className="flex w-full flex-row justify-between border-b text-xs"
                    >
                      <span className="flex flex-row gap-4">
                        <span className="w-[50%] text-secondary">
                          {" "}
                          {item?.title}{" "}
                        </span>
                        <span className="font-semibold text-red-500"> X </span>
                        <span className=""> {item?.qty} </span>
                      </span>
                      <span className="w-[50%] text-right text-primary">
                        Rs.{item?.price * item?.qty}
                      </span>
                    </Text>
                  ))}

                  <Text className="flex w-full flex-row justify-between border-b text-xs">
                    <span>Sub total</span>
                    <span className="text-primary">Rs.{totalAmount}</span>
                  </Text>
                  <Text className="flex w-full flex-row justify-between border-b text-xs">
                    <span>Shipping</span>
                    <span className="text-primary">Rs.{SHIPPING_FEE}</span>
                  </Text>
                  <Text className="flex w-full flex-row justify-between border-b py-2">
                    <span className="font-semibold text-primary">Total</span>
                    <span className="font-semibold text-primary" font-semibold>
                      Rs.{totalAmount + SHIPPING_FEE}
                    </span>
                  </Text>
                </div>
                <div className="mt-2 flex w-full flex-col gap-4 bg-white p-4">
                  <Form.Item
                    required
                    rules={[
                      {
                        required: true,
                        message: "Payment Option is required!",
                      },
                    ]}
                    name="paymentOption"
                  >
                    <Radio.Group
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 20,
                      }}
                      // onChange={onChange}
                      // value={selectedPaymentOption}
                      className="flex flex-col gap-4"
                      options={[
                        {
                          value: 1,
                          label: "Cash on delivery",
                        },
                        {
                          value: 2,
                          label: "Direct Bank Transfer",
                        },
                        {
                          value: 3,
                          disabled: true,
                          label: (
                            <div className="flex flex-col gap-0">
                              <Text>Credit card installments</Text>
                              <Image src={payHereBanner} preview={false} />
                            </div>
                          ),
                        },
                        {
                          value: 4,
                          disabled: true,
                          label: (
                            <div className="flex flex-col gap-0">
                              <Image
                                style={{ width: "25%" }}
                                src={KokoIcon}
                                preview={false}
                              />
                            </div>
                          ),
                        },
                      ]}
                    />
                  </Form.Item>
                </div>
                <Text className="mt-5 text-xs">
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our privacy policy.
                </Text>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Terms and conditions is required!",
                    },
                  ]}
                  valuePropName="checked"
                  name="isAgreedTotermsAndConditions"
                >
                  <Checkbox onChange={onChange}>
                    I have read and agree to the website terms and conditions *
                  </Checkbox>
                </Form.Item>
                <Form.Item className="mt-2 h-full w-full">
                  <div className="flex h-full w-full items-center justify-start">
                    <CustomButton
                      type="primary"
                      htmlType="submit"
                      size="large"
                      loading={loading}
                      className="w-[25%] text-xs"
                      buttonName="PLACE ORDER"
                    />
                  </div>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>

      {/* footer section */}
      <div className="w-full">
        <FooterSection />
      </div>
    </div>
  );
};

export default BookCheckout;
