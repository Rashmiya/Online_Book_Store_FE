import React from "react";
import FooterSection from "../../components/Footer/FooterSection";
import { Typography, Collapse } from "antd";
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;
const HelpCenter = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-3xl px-6 py-12">
        <Title level={2} className="mb-6 text-center">
          Help Center
        </Title>
        <Paragraph className="mb-10 text-center">
          Here to help! Find answers to frequently asked questions and get the
          support you need.
        </Paragraph>

        <Collapse defaultActiveKey={["1"]} className="w-full">
          <Panel header="How do I register for an account?" key="1">
            <p>
              To register for an account, click on the "Sign Up" button in the
              top right corner of the page. Fill out the required details and
              submit the form.
            </p>
          </Panel>

          <Panel header="How do I make a purchase?" key="2">
            <p>
              After signing in, browse the books in our store, add them to your
              cart, and proceed to checkout. You will be able to enter payment
              details to complete your purchase.
            </p>
          </Panel>

          <Panel header="How can I contact customer support?" key="3">
            <p>
              If you need any assistance, feel free to reach out to us through
              our Contact page or email us directly at contact@bookstore.com.
            </p>
          </Panel>

          <Panel header="What should I do if I forget my password?" key="4">
            <p>
              If you've forgotten your password, go to the login page and click
              "Forgot Password?" to reset it via your registered email address.
            </p>
          </Panel>
        </Collapse>
      </div>

      {/* Footer section */}
      <div className="w-full">
        <FooterSection />
      </div>
    </div>
  );
};

export default HelpCenter;
