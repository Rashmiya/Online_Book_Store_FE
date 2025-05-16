import { useContext, useEffect, useState } from "react";
import { Typography, Form, Input, Checkbox } from "antd";
import { AuthContext } from "../../../context/AuthContext";
import { NotificationContext } from "../../../context/NotificationContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  getLocalStoragedata,
  setLocalStorageData,
} from "../../helpers/StorageHelper";
import MailIcon from "../../../assets/images/svg/onBoarding/MailIcon";
import Password from "../../../assets/images/svg/onBoarding/Password";
import AppStore from "../../../assets/images/svg/onBoarding/AppStore";
import PlayStore from "../../../assets/images/svg/onBoarding/PlayStore";
import CustomButton from "../../../components/buttons/CustomButton";
import SignInServices from "../../../services/SignInServices";
import { emailFieldValidation } from "../../../utils/validations/validation";
const { Text, Link } = Typography;

const SignInView = () => {
  const { openNotification, handleError } = useContext(NotificationContext);
  const { setUser, user, setIsAuthChack } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { loginUser } = SignInServices();
  const { id } = useParams();
  useEffect(() => {
    // const rememberMe = localStorage.getItem("rememberMe") === "true";
    // setRememberMe(rememberMe);
  }, []);

  useEffect(() => {
    if (user !== null) {
      if (id) {
        window.location.replace(`/checkout-book/${id}`);
      } else {
        navigate("/");
      }
    }
  }, [user]);
  const handleClick = () => {
    setLoading(true);
    navigate("/onboarding/sign-up");
  };

  const LoginFormSubmission = async (e) => {
    setUploading(true);

    const data = {
      email: e?.email,
      password: e?.password,
    };

    if (rememberMe) {
      setLocalStorageData("rememberedEmail", e?.email);
      setLocalStorageData("rememberedPassword", e?.password);
      localStorage.setItem("rememberMe", rememberMe);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
      localStorage.removeItem("rememberMe");
    }

    const response = await loginUser(data);
    if (response) {
      if (response.responseType === "success") {
        setUser(response?.output?.data);
        setIsAuthChack(true);
        setLocalStorageData("authCheck", true);
        setLocalStorageData("userDetails", response?.output?.data);
      } else if (response.responseType === "fail") {
        openNotification("error", response?.output?.message);
      } else if (response.responseType === "error") {
        handleError(response?.output);
      }
    } else {
      openNotification("error", "Something went wrong");
    }
    setUploading(false);
  };

  return (
    <div
      className={
        "z-10 w-full rounded-3xl bg-white p-5 sm:w-[500px] md:px-10 md:py-7"
      }
      style={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        backgroundColor: "rgba(255, 255, 255, 0.57)",
      }}
    >
      <Text className="text-colorTextGray flex items-center justify-center pb-10 text-[20px] font-semibold">
        Log in to Continue
      </Text>
      <Form
        className="w-full"
        onFinish={LoginFormSubmission}
        initialValues={{
          email: getLocalStoragedata("rememberedEmail") || "",
          password: getLocalStoragedata("rememberedPassword") || "",
          remember: localStorage.getItem("rememberMe") === "true",
        }}
        layout="vertical"
      >
        <Form.Item
          name="email"
          layout="vertical"
          label={
            <div className="flex flex-row items-center gap-1 pb-1 capitalize">
              <MailIcon />
              <Text className="text-md font-medium">Email</Text>
            </div>
          }
          className="mb-3 text-start"
          rules={[
            {
              required: true,
              message: "Email is required!",
            },
            {
              type: "email",
              message: "Invalid Email!",
            },
          ]}
          validateTrigger="onBlur"
          style={{ textAlign: "left" }}
        >
          <Input
            size="large"
            placeholder="Enter email"
            className="ant-input-affix-wrapper-focused:!bg-white hover:!bg-white focus:!bg-white"
            maxLength={100}
            autoComplete="off"
            onKeyDown={(e) => {
              const key = e.key;
              if (!/^[A-Za-z+.@0-9]*$/.test(key) && key !== "Backspace") {
                e.preventDefault();
              }
            }}
            onPaste={(e) => {
              const clipboardData = e.clipboardData || window.clipboardData;
              const pastedText = clipboardData.getData("text");
              if (!/^[A-Za-z.@0-9]*$/.test(pastedText)) {
                e.preventDefault();
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          layout="vertical"
          label={
            <div className="flex flex-row items-center gap-1 pb-1 capitalize">
              <Password />
              <Text className="text-md font-medium">Password</Text>
            </div>
          }
          style={{ textAlign: "left" }}
          rules={[
            ({}) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error("Password is required!"));
                }
                if (value.length < 6) {
                  return Promise.reject(
                    new Error("Password must be at least 6 characters long!"),
                  );
                }
                if (!/(?=.*[A-Z])(?=.*[0-9])/.test(value)) {
                  return Promise.reject(
                    new Error(
                      "Password is invalid! Must contain at least one uppercase letter and one number.",
                    ),
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Set password"
            size="large"
            maxLength={60}
            minLength={6}
            onKeyDown={(e) => {
              const key = e.key;
              if (/^[\s]*$/.test(key) && key !== "Backspace") {
                e.preventDefault();
              }
            }}
            onPaste={(e) => {
              const pastedText = e.clipboardData.getData("text/plain");
              if (/\s/.test(pastedText)) {
                e.preventDefault();
              }
            }}
          />
        </Form.Item>

        <div className="flex flex-row justify-between">
          <Form.Item
            name="remember"
            valuePropName="checked"
            className="flex items-center justify-center"
          >
            <Checkbox
              checked={rememberMe}
              onChange={(e) => {
                setRememberMe(e.target.checked);
              }}
            >
              <Text className="text-xs font-medium">Remember me</Text>
            </Checkbox>
          </Form.Item>
        </div>
        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <CustomButton
            type="primary"
            className="w-full"
            size="large"
            htmlType="submit"
            loading={uploading}
            buttonName="Log In"
          />
        </Form.Item>
      </Form>
      {!id && (
        <Text className="flex items-center justify-center gap-1">
          Don’t have a company?
          <Link
            loading={loading.toString()}
            onClick={handleClick}
            style={{ color: "var(--primary)" }}
          >
            Sign up
          </Link>
        </Text>
      )}
      <div className="flex items-center justify-center">
        <div className="flex flex-row gap-3 pt-3">
          <AppStore />
          <PlayStore />
        </div>
      </div>
    </div>
  );
};

export default SignInView;
