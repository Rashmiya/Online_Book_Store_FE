import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;
const PrivacyPolicy = () => {
  return (
    <div className="mx-auto min-h-screen max-w-4xl bg-white px-6 py-12">
      <Typography>
        <Title level={2}>Privacy Policy</Title>
        <Paragraph>
          We value your privacy and are committed to protecting your personal
          information. This policy outlines how we collect, use, and safeguard
          your data when you use our bookstore platform.
        </Paragraph>

        <Title level={4}>1. Information We Collect</Title>
        <Paragraph>
          - Personal details such as name, email, address, and payment info
          <br />
          - Browsing and purchase history
          <br />- Feedback or communication you provide
        </Paragraph>

        <Title level={4}>2. How We Use Your Information</Title>
        <Paragraph>
          - To process and deliver your orders
          <br />
          - To personalize your shopping experience
          <br />
          - To improve our services and support
          <br />- To send updates and promotional content (you can opt out
          anytime)
        </Paragraph>

        <Title level={4}>3. Data Protection</Title>
        <Paragraph>
          We implement industry-standard security measures to ensure your data
          is protected against unauthorized access or disclosure.
        </Paragraph>

        <Title level={4}>4. Cookies</Title>
        <Paragraph>
          We use cookies to enhance your browsing experience. You can manage
          cookie preferences in your browser settings.
        </Paragraph>

        <Title level={4}>5. Changes to This Policy</Title>
        <Paragraph>
          We may update this policy periodically. Changes will be reflected on
          this page with a revised effective date.
        </Paragraph>

        <Title level={4}>6. Contact Us</Title>
        <Paragraph>
          If you have any questions regarding this privacy policy, please
          contact us at{" "}
          <a href="mailto:support@bookstore.com">
            support@yourbookstore.com
          </a>
          .
        </Paragraph>
      </Typography>
    </div>
  );
};

export default PrivacyPolicy;
