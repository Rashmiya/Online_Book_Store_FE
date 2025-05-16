import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Descriptions,
  Avatar,
  Typography,
  Divider,
  Spin,
  Badge,
  Tag,
  Row,
  Col,
  Space,
  Tabs,
  Form,
  Input,
  DatePicker,
  Button,
  message,
  ConfigProvider,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  ShoppingOutlined,
  CalendarOutlined,
  SaveOutlined,
  EditOutlined,
} from "@ant-design/icons";
import moment from "moment";
import UserColorProfile from "../../components/ColorProfile/UserColorProfile";
import { AuthContext } from "../../context/AuthContext";
import { NotificationContext } from "../../context/NotificationContext";
import SignInServices from "../../services/SignInServices";
import SkeletonComponentForComapnyLayout from "../../components/Skeleton/SkeletonComponentForComapnyLayout";
import dayjs from "dayjs";
import OrderService from "../../services/OrderService";
import SkeletonComponent from "../../components/Skeleton/SkeletonComponent";
import NoDataAnim from "../../components/nodataAnim/NoDataAnim";
import OrderCard from "./components/OrderCard";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

const MyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState("details");
  const [form] = Form.useForm();
  const { viewUser, updateUser } = SignInServices();
  const { getUserOrders } = OrderService();
  const { user } = useContext(AuthContext);
  const { openNotification, handleError } = useContext(NotificationContext);

  useEffect(() => {
    activeTabKey === "orders" ? fetchOrders() : fetchCustomerData();
  }, [activeTabKey]);

  const fetchCustomerData = async () => {
    try {
      setLoading(true);
      const response = await viewUser({
        email: user?.email,
      });
      if (response) {
        if (response.responseType === "success") {
          setCustomer(response.output.data);
        } else if (response.responseType === "fail") {
          openNotification("error", response?.output?.message);
        } else if (response.responseType === "error") {
          handleError(response.output);
        }
      } else {
        openNotification("error", "Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      const data = {
        userId: user?.id,
      };
      const response = await getUserOrders(data);
      if (response) {
        if (response.responseType === "success") {
          setOrders(response.output.data);
        } else if (response.responseType === "fail") {
          openNotification("error", response?.output?.message);
        } else if (response.responseType === "error") {
          handleError(response.output);
        }
      } else {
        openNotification("error", "Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
      setOrdersLoading(false);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (customer) {
      form.setFieldsValue({
        dob: customer.dob ? moment(customer.dob) : null,
        mobile_number: customer.mobile_number || "",
        address: customer.shippingAddress?.address || "",
        city: customer.shippingAddress?.city || "",
        postalCode: customer.shippingAddress?.postalCode || "",
        country: customer.shippingAddress?.country || "",
      });
    }
  }, [customer, form]);

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const data = {
        id: customer.companyProfileId,
        email: customer.email,
        dob: values.dob ? values.dob.toDate() : null,
        mobile_number: values.mobile_number,
        shippingAddress: {
          address: values.address,
          city: values.city,
          postalCode: values.postalCode,
          country: values.country,
        },
        updatedAt: new Date(),
      };
      const response = await updateUser(data);

      if (response) {
        if (response.responseType === "success") {
          setEditMode(false);
          openNotification("success", response?.output?.message);
          await fetchCustomerData();
        } else if (response.responseType === "fail") {
          openNotification("error", response?.output?.message);
        } else if (response.responseType === "error") {
          handleError(response.output);
        }
      } else {
        openNotification("error", "Something went wrong");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setLoading(false);
      message.error("Failed to update profile. Please try again.");
    }
  };

  // Render tabs content
  const DetailsContent = () => {
    return (
      <Card
        bordered
        title="Personal Information"
        extra={
          <Button
            type={editMode ? "primary" : "default"}
            icon={editMode ? <SaveOutlined /> : <EditOutlined />}
            onClick={() => {
              if (editMode) {
                form.submit();
              } else {
                setEditMode(true);
              }
            }}
          >
            {editMode ? "Save" : "Edit"}
          </Button>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          disabled={!editMode}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="mobile_number"
                label="Mobile Number"
                rules={[
                  {
                    pattern: /^[+\d\s-()]+$/,
                    message: "Please enter a valid phone number",
                  },
                ]}
              >
                <Input
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
                  prefix={<PhoneOutlined />}
                  placeholder="Enter your mobile number"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="dob" label="Date of Birth">
                <DatePicker
                  className="w-full"
                  disabledDate={(current) =>
                    current && current > dayjs().endOf("day")
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Shipping Address</Divider>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="address" label="Address">
                <TextArea rows={2} placeholder="Enter your street address" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="city" label="City">
                <Input placeholder="Enter your city" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="postalCode" label="Postal Code">
                <Input placeholder="Enter your postal code" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="country" label="Country">
                <Input placeholder="Enter your country" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  };

  const OrderDetailsContent = () => {
    return (
      <Card bordered>
        <div className="flex flex-col items-center justify-center p-6">
          {ordersLoading ? (
            <div className="flex flex-col gap-3 w-full">
              {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonComponent key={index} />
              ))}
            </div>
          ) : (
            <>
              {orders?.length !== 0 ? (
                <div className="mb-10 flex flex-col gap-3 overflow-y-hidden">
                  {orders?.map((order, index) => (
                    <OrderCard
                      order={order}
                      key={index}
                      fetchData={fetchOrders}
                    />
                  ))}
                </div>
              ) : (
                <NoDataAnim message="No orders to display." />
              )}
            </>
          )}
        </div>
      </Card>
    );
  };

  const getTextColor = (value) =>
    activeTabKey === value ? "#0d7cff" : "#939292";

  const tabItems = [
    {
      key: "details",
      label: (
        <div className="m-1 flex flex-row items-center gap-1">
          <Text
            className="segment-text font-medium"
            style={{ color: getTextColor("details") }}
          >
            Account Details
          </Text>
        </div>
      ),
      children: <DetailsContent />,
    },
    {
      key: "orders",
      label: (
        <div className="m-1 flex flex-row items-center gap-1">
          <Text
            className="segment-text font-medium"
            style={{ color: getTextColor("orders") }}
          >
            Order History
          </Text>
        </div>
      ),
      children: <OrderDetailsContent />,
    },
  ];

  return (
    <div className="p-6">
      {loading && !customer ? (
        <div className="mt-8 flex h-[80vh] w-full items-start justify-center p-4">
          <SkeletonComponentForComapnyLayout />
        </div>
      ) : (
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card bordered className="text-center">
              <div className="flex w-full items-center justify-center py-4">
                <UserColorProfile
                  name={customer?.username || "N Z"}
                  color={"lightgreen"}
                  size="96px"
                  textSize="44px"
                />
              </div>
              <Title level={3}>{customer?.username}</Title>
              <Badge
                status={customer?.role === "admin" ? "error" : "success"}
                text={
                  <Tag color={customer?.roleName === "admin" ? "red" : "green"}>
                    {customer?.roleName?.toUpperCase()}
                  </Tag>
                }
              />
              <Divider />
              <Space direction="vertical" size="small">
                <div className="flex items-center justify-start">
                  <MailOutlined className="mr-2" />
                  <Text>{customer?.email}</Text>
                </div>
                <div className="flex items-center justify-start">
                  <PhoneOutlined className="mr-2" />
                  <Text>{customer?.mobile_number || "Not provided"}</Text>
                </div>
                <div className="flex items-center justify-start">
                  <CalendarOutlined className="mr-2" />
                  <Text>
                    Born:{" "}
                    {customer?.dob ? formatDate(customer?.dob) : "Not provided"}
                  </Text>
                </div>
              </Space>
              <Divider />
              <div className="flex items-center justify-center">
                <ShoppingOutlined className="mr-2" />
                <Text strong>Orders: {customer.orderCount}</Text>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={16}>
            <Tabs
              defaultActiveKey="details"
              tabBarStyle={{ color: "black" }}
              items={tabItems}
              onChange={(key) => setActiveTabKey(key)}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default MyProfile;
