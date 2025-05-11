import React from "react";
import FooterSection from "../../components/Footer/FooterSection";
import { Typography, Row, Col, Card } from "antd";
const { Title, Paragraph } = Typography;

const AboutUs = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Section */}
      <div className="flex-1 bg-white px-4 py-12 sm:px-8 md:px-16">
        <Row gutter={[32, 32]} justify="center">
          <Col span={24}>
            <Typography className="text-center">
              <Title level={2}>About Our Bookstore</Title>
              <Paragraph className="mx-auto max-w-3xl text-base text-gray-600">
                Welcome to our online bookstore – your one-stop shop for all
                your reading needs! We are passionate about connecting readers
                with their next great read. Whether you're into fiction,
                non-fiction, academic books, or children's stories, we’ve got
                something for everyone.
              </Paragraph>
            </Typography>
          </Col>

          <Col xs={24} md={12}>
            <Card title="Our Mission" bordered={false}>
              <Paragraph>
                Our mission is to promote the joy of reading by offering a wide
                variety of books at affordable prices. We strive to deliver a
                smooth and secure shopping experience for all book lovers.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title="Why Choose Us?" bordered={false}>
              <Paragraph>
                - Thousands of curated titles <br />
                - Fast and reliable delivery <br />
                - User-friendly interface <br />
                - Secure payment gateway <br />- Excellent customer support
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Footer */}
      <div className="w-full">
        <FooterSection />
      </div>
    </div>
  );
};

export default AboutUs;
