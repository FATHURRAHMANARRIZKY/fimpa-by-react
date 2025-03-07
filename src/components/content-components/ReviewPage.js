import React, { useState, useEffect } from "react";
import { Rate, Card, Col, Row, Spin, Button } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // Pastikan path sesuai

const ReviewsPage = () => {
  const [customerReviews, setCustomerReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/ratings")
      .then((response) => {
        setCustomerReviews(response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Semua Ulasan</h2>
      <Button type="primary" className="mb-4" onClick={() => navigate("/")}>
        Kembali ke Home
      </Button>
      <Row gutter={[16, 16]}>
        {loading ? (
          <div className="flex justify-center items-center w-full">
            <Spin size="large" />
          </div>
        ) : customerReviews.length > 0 ? (
          customerReviews.map((review, index) => (
            <Col key={index} xs={24} md={8}>
              <Card>
                <h4>{review.name}</h4>
                <h6>{review.email}</h6>
                <Rate disabled value={review.rating} />
                <p>{review.comment}</p>
                <p className="text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">Tidak ada ulasan ditemukan.</p>
        )}
      </Row>
    </div>
  );
};

export default ReviewsPage;