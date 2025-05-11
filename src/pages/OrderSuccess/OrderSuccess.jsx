import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Descriptions,
  List,
  Divider,
  Typography,
  Steps,
  Button,
  Space,
  message,
  Skeleton,
} from "antd";
import { NotificationContext } from "../../context/NotificationContext";
import OrderService from "../../services/OrderService";
import { useParams } from "react-router-dom";
import StatusLabel from "../../components/statusLabel/StatusLabel";
import { ORDER_STATUS } from "../../enums/Order";
import CorrectIcon from "../../assets/images/svg/checkout/CorrectIcon";
const { Title, Text } = Typography;
const { Step } = Steps;
const statusEnum = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const OrderSuccess = ({ order }) => {
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { openNotification, handleError } = useContext(NotificationContext);
  //   const { isStatusUpdated, setIsStatusUpdated } = useContext(OrderContext);
  const { getOrderById, updateOrderStatus } = OrderService();
  const { id } = useParams();

  const statusStyles = {
    pending: {
      color: "bg-yellow-300",
      message: "Your order is pending.",
    },
    processing: {
      color: "bg-blue-300",
      message: "Your order is being processed.",
    },
    shipped: {
      color: "bg-purple-300",
      message: "Your order has been shipped.",
    },
    delivered: {
      color: "bg-green-400",
      message: "Your order has been delivered.",
    },
    cancelled: {
      color: "bg-red-400",
      message: "Your order has been cancelled.",
    },
  };
  const statusInfo = statusStyles[status] || {};

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    setLoading(true);
    const data = {
      orderId: id,
    };
    const response = await getOrderById(data);
    if (response) {
      if (response.responseType === "success") {
        setData(response.output.data);
        setStatus(response.output.data.status);
        setLoading(false);
      } else if (response.responseType === "fail") {
        openNotification("error", response?.output?.message);
        setLoading(false);
      } else if (response.responseType === "error") {
        handleError(response.output);
        setLoading(false);
      }
    } else {
      openNotification("error", "Something went wrong");
      setLoading(false);
    }
  };

  const getCurrentStep = () => {
    return statusEnum.indexOf(status);
  };
  return (
    <>
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
          <div
            className={`flex w-full flex-row items-center justify-center gap-3 rounded p-4 ${statusInfo.color}`}
          >
            <CorrectIcon />
            <Text className="text-sm text-gray-800">
              {statusInfo.message || "Unknown order status."}
            </Text>
          </div>
          <Card
            title={<Title level={3}>Order Details</Title>}
            className="!my-10 "
            style={{ maxWidth: 900, margin: "auto" }}
          >
            {/* Status Stepper */}
            <Steps
              current={getCurrentStep()}
              status={status === "cancelled" ? "error" : "process"}
            >
              {statusEnum.map((step) => (
                <Step
                  key={step}
                  title={step.charAt(0).toUpperCase() + step.slice(1)}
                />
              ))}
            </Steps>

            <Divider />

            {/* Customer Info */}
            <Descriptions
              title="Customer Info"
              bordered
              column={1}
              size="middle"
            >
              <Descriptions.Item label="Name">
                {data?.customer_id?.username}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {data?.customer_id?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                {data?.phoneNumber}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            {/* Shipping Address */}
            <Descriptions
              title="Shipping Address"
              bordered
              column={1}
              size="middle"
            >
              <Descriptions.Item label="Street Address">
                {data?.shippingAddress?.address}
              </Descriptions.Item>
              <Descriptions.Item label="City">
                {data?.shippingAddress?.city}
              </Descriptions.Item>
              <Descriptions.Item label="Postal Code">
                {data?.shippingAddress?.postalCode}
              </Descriptions.Item>
              <Descriptions.Item label="Country">
                {data?.shippingAddress?.country}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            {/* Order Details */}
            <Title level={5}>Ordered Items</Title>
            <List
              bordered
              dataSource={data?.order_details}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item?.book_id?.title}
                    description={`Author: ${item.book_id?.author}`}
                  />
                  <div>
                    <Text>Qty: {item?.qty}</Text> <br />
                    <Text>Price: Rs. {item?.price}</Text>
                  </div>
                </List.Item>
              )}
            />

            <Divider />

            {/* Summary */}
            <Descriptions title="Summary" bordered column={1} size="middle">
              <Descriptions.Item label="Total Amount">
                Rs. {data?.totalAmount}
              </Descriptions.Item>
              <Descriptions.Item label="Payment Method">
                {data?.paymentMethod}
              </Descriptions.Item>
              <Descriptions.Item label="Payment Status">
                {data?.paymentStatus}
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                {new Date(data?.createdAt).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Current Status">
                {/* <Text strong>{data?.status?.toUpperCase()}</Text> */}
                <div className="flex w-full items-center justify-start">
                  <StatusLabel status={ORDER_STATUS[data?.status]} />
                </div>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </>
      )}
    </>
  );
};

export default OrderSuccess;
