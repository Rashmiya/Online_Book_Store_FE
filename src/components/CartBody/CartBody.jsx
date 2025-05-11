import React from "react";
import { NewRelease } from "../../utils/constent/BookDetails";
import { ConfigProvider, Image, Rate, Typography } from "antd";
import CloseOutline from "../../assets/images/svg/common/CloseOutline";
import SimpleClose from "../../assets/images/svg/common/SimpleClose";
import { useNavigate } from "react-router-dom";
import CustomButton from "../buttons/CustomButton";
const { Text } = Typography;
const CartBody = () => {
  const navigateTo = useNavigate();

  const removeBookFromCart = () => {
    console.log("remove this book");
  };

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex h-[600px] w-full flex-col items-center justify-between gap-6 overflow-y-scroll py-4 scrollbar-none">
        {NewRelease?.map((item, index) => (
          <div
            key={index}
            className="relative flex w-full flex-row items-center justify-evenly gap-4 border p-2 shadow"
          >
            <SimpleClose
              onClick={() => removeBookFromCart()}
              className="absolute right-0 top-0 cursor-pointer"
            />

            <Image
              src={
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              }
              height={"100px"}
              className="object-cover"
            />
            <div className="flex flex-col gap-2">
              <Text>{item?.name}</Text>
              <ConfigProvider
                theme={{
                  components: {
                    Rate: {
                      starSize: 12,
                    },
                  },
                }}
              >
                <Rate defaultValue={item?.rating} disabled />
              </ConfigProvider>
              <Text>$ {item?.price}</Text>
            </div>
          </div>
        ))}
      </div>
      <CustomButton
        onClick={() => navigateTo(`/checkout-book/${item?.id}`)}
        buttonName="Checkout"
      />
    </div>
  );
};

export default CartBody;
