import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import { Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext"; 
import { Rate, Button, notification, Input, Modal } from "antd";

const ProfilePage = () => {
  const { email } = useParams();
  const { user } = useAuth(); 

  const [userReview, setUserReview] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/users/${email}`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [email]);

  useEffect(() => {
    if (user) {
      api
        .get(`/ratings/user/${user.email}`)
        .then((response) => {
          setUserReview(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user review:", error);
        });
    }
  }, [user]);

  const handleEdit = (review) => {
    setEditingReview(review);
    setComment(review.comment);
    setRating(review.rating);
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/ratings/${editingReview.id}`, {
        rating,
        comment,
      });

      setUserReview(response.data);
      notification.success({ message: "Review updated successfully" });

      setShowForm(false);
      setEditingReview(null);
    } catch (error) {
      notification.error({ message: "Error updating review" });
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This action will delete your review permanently.",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await api.delete(`/ratings/${id}`);
          setUserReview(null);
          notification.success({ message: "Review deleted successfully" });
        } catch (error) {
          notification.error({ message: "Error deleting review" });
        }
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>User not found</p>;

  return (
    <>
    <Container className="flex justify-center items-center min-h-screen">
    <div className="absolute top-12 left-64 p-4">
  <Link to="/">
    <Button type="primary" icon={<i className="fa-solid fa-house fa-beat"></i>} size="large">
      Back to Home
    </Button>
  </Link>
</div>

      <div className="flex flex-col md:flex-row bg-white shadow-lg p-8 rounded-xl border border-gray-300 w-[800px]">
        {/* Bagian Kiri: Profil */}
        <div className="w-[350px] border-r border-gray-300 pr-6 flex flex-col items-center text-center">
          <img
            src={`http://localhost:8080${profile.profilePicture}`}
            alt="Profile"
            className="w-32 h-32 rounded-full border border-gray-300 shadow-md"
          />
          <h1 className="text-xl font-bold mt-4">{profile.username + " " + profile.fullName}</h1>
          <p className="mt-2 text-sm text-gray-500">Email: {profile.email}</p>
          <p className="text-sm text-gray-500">Phone: {profile.phoneNumber}</p>
          <p className="text-sm text-gray-500">Address: {profile.address}</p>
        </div>

        {/* Bagian Kanan: Review */}
        <div className="ml-6 flex-1">
          <h2 className="text-lg font-semibold mb-4">Your Review</h2>

          {userReview ? (
            <div className="p-4 border border-gray-300 shadow-md rounded-lg bg-gray-50">
                <h2 className="text-xl font-bold">{userReview.name}</h2>
                <h4 className="text-sm">{userReview.email}</h4>
                <hr/>
              <Rate disabled value={userReview.rating} />
              <p className="mt-2">{userReview.comment}</p>
              <div className="mt-4 flex gap-2">
                <Button type="primary" onClick={() => handleEdit(userReview)}>
                  Edit
                </Button>
                <Button danger onClick={() => handleDelete(userReview.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>

      {/* Modal untuk Edit Review */}
      <Modal
        title="Edit Review"
        open={showForm}
        onOk={handleSave}
        onCancel={() => setShowForm(false)}
        okText="Save"
      >
        <Rate value={rating} onChange={setRating}  className="py-3"/>
        <Input.TextArea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Modal>
    </Container></>
  );
};

export default ProfilePage;