import React, { useState, useEffect } from "react";
import { Rate, Card, Col, Row, Spin } from "antd";
import axios from "axios";
import { Layout } from 'antd';
import api from "../../api";

const { Content } = Layout;

const ViewReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch reviews from the backend
    useEffect(() => {
        api
            .get("/ratings") // Replace with actual backend URL
            .then((response) => {
                setReviews(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
                setLoading(false);
            });
    }, []);

    // Calculate average rating
    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return (totalRating / reviews.length).toFixed(2);
    };

    const reviewCount = reviews.length;
    const averageRating = calculateAverageRating(reviews);

    return (
        <Content style={{ padding: '20px', minHeight: '280px' }}>
            <div className="bg-white p-4 rounded-lg shadow-md">
                {/* Heading */}
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

                {/* Rating Summary */}
                <div className="flex items-center mb-8">
                    <h3 className="text-4xl font-bold mr-2">{averageRating}</h3>
                    <i className="bi bi-star-fill text-yellow-500 text-2xl"></i>
                    <p className="ml-3 text-gray-600">{reviewCount} Reviews</p>
                </div>

                {/* Divider */}
                <hr className="border-gray-300 mb-4" />

                {/* Review List */}
                <Row gutter={[16, 16]}>
                    {loading ? (
                        <div className="flex justify-center items-center w-full">
                            <Spin size="large" />
                        </div>
                    ) : (
                        reviews.map((review, index) => (
                            <Col key={index} xs={24} md={8}>
                                <Card>
                                    <h4>{review.name}</h4>
                                    <Rate disabled value={review.rating} />
                                    <p>{review.comment}</p>
                                    <p className="text-gray-500">
                                        {new Date(review.createdAt).toLocaleString()}
                                    </p>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </div>
        </Content>
    );
};

export default ViewReviews;