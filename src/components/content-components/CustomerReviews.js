import React, { useState, useEffect, useContext } from "react";
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
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

const CustomerReviews = ({ role, token }) => {
  const [customerReviews, setCustomerReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [editingReview, setEditingReview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useContext(AuthContext); // Get user data from context
  const navigate = useNavigate();

  // Calculate the average rating from reviews
  const calculateAverageRating = (reviews) => {
    if (!Array.isArray(reviews) || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(2);
  };

  const reviewCount = customerReviews.length;

  useEffect(() => {
    // Fetch customer reviews from the server
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

  // Handle review submission
  const handleSubmit = () => {
    if (!comment || rating === 0) {
      notification.error({
        message: "Validation Error",
        description: "Please fill in all fields.",
      });
      return;
    }

    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    setSubmitting(true);
    const newReview = {
      name: user?.username || "Guest", // Ensure username is fetched from context
      email: user?.email || "No Email", // Ensure email is fetched from context
      comment,
      rating,
      createdAt: new Date().toISOString(),
    };

    api
      .post("/ratings", newReview)
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
        notification.error({
          message: "Submission Error",
          description:
            "There was an issue submitting your review. Please try again later.",
        });
      })
      .finally(() => setSubmitting(false));
  };

  // Handle editing a review
  const handleEdit = (review) => {
    setEditingReview(review);
    setComment(review.comment);
    setRating(review.rating);
    setShowForm(true);
  };

  // Handle update of an existing review
  const handleUpdate = () => {
    if (!comment || rating === 0) {
      notification.error({
        message: "Validation Error",
        description: "Please fill in all fields.",
      });
      return;
    }

    setSubmitting(true);
    const updatedReview = {
      ...editingReview,
      comment,
      rating,
    };

    api
      .put(`/ratings/${editingReview.id}`, updatedReview) // Ensure correct field (_id or id)
      .then((response) => {
        // Correctly update the review in the list
        setCustomerReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === editingReview.id ? response.data : review
          )
        );
        setShowForm(false);
        setComment("");
        setRating(0);
        setEditingReview(null);
        notification.success({
          message: "Review Updated",
          description: "Your review has been successfully updated.",
        });
      })
      .catch((error) => {
        notification.error({
          message: "Update Error",
          description:
            "There was an issue updating your review. Please try again later.",
        });
      })
      .finally(() => setSubmitting(false));
  };

  const handleUnauthenticatedSubmit = () => {
    setShowLoginPrompt(true);
  };

  // Fixing the check for user submission:
  const isUserReviewSubmitted = user
    ? customerReviews.some((review) => review.email === user?.email)
    : false;

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
                <h6>{review.email}</h6>
                <Rate disabled value={review.rating} />
                <p>{review.comment}</p>
                <p className="text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
                {review.email === user?.email && (
                  <Button onClick={() => handleEdit(review)} type="link">
                    Edit
                  </Button>
                )}
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">Tidak ada ulasan ditemukan.</p>
        )}
      </Row>

      {/* Correctly handle "Submit Review" button */}
      {role === "USER" && !isUserReviewSubmitted ? (
        <div className="text-center mt-8">
          <Button type="primary" onClick={() => setShowForm(true)}>
            Submit Review
          </Button>
        </div>
      ) : user && isUserReviewSubmitted ? (
        <div className="text-center mt-8">
          <Button type="primary" disabled>
            You have already submitted a review
          </Button>
        </div>
      ) : (
        <div className="text-center mt-8">
          <Button type="primary" onClick={handleUnauthenticatedSubmit}>
            Please login to submit a review
          </Button>
        </div>
      )}

      <Modal
        title={editingReview ? "Edit Your Review" : "Submit a Review"}
        open={showForm}
        onCancel={() => setShowForm(false)}
        onOk={editingReview ? handleUpdate : handleSubmit}
      >
        <Form layout="vertical">
          <Form.Item label="Username">
            <Input value={user?.username || "Guest"} readOnly />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={user?.email || "No Email"} readOnly />
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
              navigate("/login");
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