import React from "react";
import { Card, Descriptions, Tag, Button } from "antd";
import {
  formatDateMonthYear,
  formatTimeTo12Hour,
} from "../../helpers/DateFormatHelper";
import CustomButton from "../../../components/buttons/CustomButton";
import { useNavigate } from "react-router-dom";

const statusColorMap = {
  pending: "orange",
  completed: "green",
  cancelled: "red",
};

const OrderCard = ({ order, fetchData, key }) => {
  const {
    _id,
    createdAt,
    status,
    totalAmount,
    paymentMethod,
    order_details,
    shippingAddress,
  } = order;
  const navigateTo = useNavigate();

  return (
    <Card
      title={`Order #${_id}`}
      className="mb-4 rounded-2xl shadow"
      extra={
        <Tag color={statusColorMap[status] || "blue"}>
          {status?.toUpperCase()}
        </Tag>
      }
    >
      <Descriptions size="small" column={1}>
        <Descriptions.Item label="Order Date">
          {" "}
          {formatDateMonthYear(createdAt)},{"  "}
          {formatTimeTo12Hour(createdAt)}
        </Descriptions.Item>
        <Descriptions.Item label="Total Amount">
          ${totalAmount?.toFixed(2)}
        </Descriptions.Item>
        <Descriptions.Item label="Payment Method">
          {paymentMethod}
        </Descriptions.Item>
        {shippingAddress && (
          <Descriptions.Item label="Shipping Address">
            {shippingAddress.address}, {shippingAddress.city},{" "}
          </Descriptions.Item>
        )}
      </Descriptions>

      <div className="mt-4 text-right">
        <CustomButton
          type="primary"
          onClick={() => { 
            navigateTo(`/order-success/${_id}`);
          }}
          buttonName="View Details"
        />
      </div>
    </Card>
  );
};

export default OrderCard;
