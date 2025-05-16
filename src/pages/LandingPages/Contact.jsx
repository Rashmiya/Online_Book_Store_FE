import React from "react";
import { Form, Input, Button, Typography } from "antd";
import FooterSection from "../../components/Footer/FooterSection";

const { Title, Paragraph } = Typography;

const Contact = () => {
  const onFinish = (values) => { 
    // You can handle form submission here (e.g., send to backend)
  };
  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-3xl px-6 py-12">
        <Title level={2} className="mb-6 text-center">
          Contact Us
        </Title>
        <Paragraph className="mb-10 text-center">
          Have questions or feedback? Feel free to reach out using the form
          below.
        </Paragraph>
        <Form
          layout="vertical"
          onFinish={onFinish}
          className="rounded-xl bg-gray-50 p-6 shadow-md"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Please enter your message" }]}
          >
            <Input.TextArea rows={4} placeholder="Write your message here..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Send Message
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-10 text-center text-sm text-gray-600">
          <p>📞 +1 234 567 890</p>
          <p>📧 contact@bookstore.com</p>
          <p>🏢 123 Book Street, NY, USA</p>
        </div>
      </div>

      {/* Footer section */}
      <div className="w-full">
        <FooterSection />
      </div>
    </div>
  );
};

export default Contact;
