import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  DatePicker,
  Input,
  Button,
  message,
  Space,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { CalendarOutlined, FileTextOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import CustomButton from "../../../components/buttons/CustomButton";
import { AuthContext } from "../../../context/AuthContext";
import { NotificationContext } from "../../../context/NotificationContext";
import WishListService from "../../../services/WishListService";

const { Text } = Typography;

const AddToWishlist = ({
  handleCancel,
  book,
  visible,
  onSetReminder,
  type,
  data,
}) => {
  const [reminderDate, setReminderDate] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { saveWishList, updateWishList } = WishListService();

  const handleOk = async () => {
    setLoading(true);
    const data = {
      userId: user?.id,
      email: user?.email,
      bookId: book?.bookId,
      reminderDate: reminderDate.toISOString(),
      note,
    };
    const response = await saveWishList(data);
    try {
      if (response) {
        if (response.responseType === "success") {
          setReminderDate(null);
          setNote("");
          handleCancel();
          openNotification("success", response?.output?.message);
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

  const handleEdit = async () => {
    console.log(data);
    setLoading(true);
    const dataObj = {
      wishlistId: data?._id,
      userId: user?.id,
      email: user?.email,
      bookId: book?.bookId,
      reminderDate: reminderDate.toISOString(),
      note: note,
    };
    const response = await updateWishList(dataObj);
    try {
      if (response) {
        if (response.responseType === "success") {
          setReminderDate(null);
          setNote("");
          handleCancel();
          openNotification("success", response?.output?.message);
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

  useEffect(() => {
    if (data) {
      setReminderDate(dayjs(data.reminderDate));
      setNote(data.note);
    }
  }, [data]);
  const { openNotification, handleError } = useContext(NotificationContext);
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        <div>
          <Text>
            <CalendarOutlined style={{ marginRight: 8 }} />
            Date & Time (optional):
          </Text>
          <DatePicker
            showTime={{ format: "hh:mm A", use12Hours: true }}
            style={{ width: "100%", marginTop: 8 }}
            value={reminderDate}
            onChange={(value) => setReminderDate(value)}
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />
        </div>

        <div>
          <Text>
            <FileTextOutlined style={{ marginRight: 8 }} />
            Note (optional):
          </Text>
          <TextArea
            rows={3}
            placeholder="e.g., Buy before next chemistry exam"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ marginTop: 8 }}
          />
        </div>
        <CustomButton
          type="primary"
          size="medium"
          disable={note === "" || loading}
          buttonName={type === "create" ? "Add to wishlist" : "Edit wishlist"}
          onClick={() => {
            if (type === "create") {
              handleOk();
            } else {
              handleEdit();
            }
          }}
          className="w-full"
        />
      </Space>
    </>
  );
};

export default AddToWishlist;
