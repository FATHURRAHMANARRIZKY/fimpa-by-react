import React, { useState, useEffect } from "react";
import {
  Rate,
  Input,
  Button,
  Card,
  Col,
  Row,
  Modal,
  Form,
  Spin,
  notification,
} from "antd";
import api from "../../api"; // Correct import path based on your folder structure
import { jwtDecode } from "jwt-decode"; // Correct import for jwtDecode
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CustomerReviews = ({ role, token }) => {
  const [customerReviews, setCustomerReviews] = useState([]); // Inisialisasi dengan array kosong
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate(); // Initialize navigate hook

  const calculateAverageRating = (reviews) => {
    if (!Array.isArray(reviews) || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(2);
  };

  const reviewCount = customerReviews.length;

  // Fetch CustomerReviews from the backend
  useEffect(() => {
    api
      .get("/ratings") // Using the custom Axios instance
      .then((response) => {
        setCustomerReviews(response.data || []); // Pastikan data selalu array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching CustomerReviews:", error);
        setLoading(false);
      });
  }, []);

  // Decode the token to get the username or email
  useEffect(() => {
    if (token && typeof token === "string") {
      const decodedToken = jwtDecode(token);
      setName(decodedToken.username || decodedToken.sub); // Sesuaikan sesuai struktur token Anda
      setEmail(decodedToken.email || decodedToken.sub); // Sesuaikan sesuai struktur token Anda
    }
  }, [token]);

  // Handle form submission
  const handleSubmit = () => {
    if (!comment || rating === 0) {
      notification.error({
        message: "Validation Error",
        description: "Please fill in all fields.",
      });
      return;
    }

    const newReview = {
      name,
      comment,
      rating,
      createdAt: new Date().toISOString(),
    };

    api
      .post("/ratings", newReview) // Post request using the custom Axios instance
      .then((response) => {
        setCustomerReviews([...customerReviews, response.data]);
        setShowForm(false);
        setComment("");
        setRating(0);
        notification.success({
          message: "Review Submitted",
          description: "Your review has been successfully submitted.",
        });
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        notification.error({
          message: "Submission Error",
          description:
            "There was an issue submitting your review. Please try again later.",
        });
      });
  };

  // Handle unauthenticated user trying to submit a review
  const handleUnauthenticatedSubmit = () => {
    setShowLoginPrompt(true);
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      <div className="flex items-center mb-8">
        <h3 className="text-4xl font-bold mr-2">
          {calculateAverageRating(customerReviews)}
        </h3>
        <Rate
          disabled
          value={parseFloat(calculateAverageRating(customerReviews))}
        />
        <p className="ml-3 text-gray-600">
          {reviewCount.toLocaleString()} Customer Reviews
        </p>
      </div>

      <hr className="border-gray-300 mb-4" />

      <Row gutter={[16, 16]}>
        {loading ? (
          <div className="flex justify-center items-center w-full">
            <Spin size="large" />
          </div>
        ) : Array.isArray(customerReviews) && customerReviews.length > 0 ? (
          customerReviews.map((review, index) => (
            <Col key={index} xs={24} md={8}>
              <Card>
                <h4>{review.name}</h4>
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

      {role === "USER" ? (
        <div className="text-center mt-8">
          <Button type="primary" onClick={() => setShowForm(true)}>
            Submit Review
          </Button>
        </div>
      ) : (
        <div className="text-center mt-8">
          <Button type="primary" onClick={handleUnauthenticatedSubmit}>
            Submit Review
          </Button>
        </div>
      )}

      <Modal
        title="Submit a Review"
        open={showForm}
        onCancel={() => setShowForm(false)}
        onOk={handleSubmit}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input value={name} readOnly />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={email} readOnly />
          </Form.Item>
          <Form.Item label="Comment" required>
            <Input.TextArea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review"
            />
          </Form.Item>
          <Form.Item label="Rating" required>
            <Rate
              value={rating}
              onChange={(value) => setRating(value)}
              tooltips={["Terrible", "Bad", "Normal", "Good", "Excellent"]}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Login Required"
        open={showLoginPrompt}
        onCancel={() => setShowLoginPrompt(false)}
        footer={[
          <Button
            key="login"
            type="primary"
            onClick={() => {
              setShowLoginPrompt(false);
              navigate("/login"); // Navigate to login page
            }}
          >
            Go to Login
          </Button>,
        ]}
      >
        <p>Please login to submit a review.</p>
      </Modal>
    </div>
  );
};

export default CustomerReviews;
