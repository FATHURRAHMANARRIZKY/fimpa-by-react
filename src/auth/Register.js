import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [emailTaken, setEmailTaken] = useState(false);
  const [step, setStep] = useState(1); // Track current step
  const navigate = useNavigate();

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview image
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("fullName", fullName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("address", address);
      formData.append("file", profileImage); // Add image to form data

      const response = await api.post("/register-user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data === "Email already exists") {
          setEmailTaken(true);
          setError("Email is already taken. Please choose another one.");
        } else {
          setError("Error registering user. Please try again.");
        }
      }
      console.error("Registration error:", error);
    }
  };

  // Handle next and previous buttons
  const handleNext = () => {
    // Validate fields based on the step
    if (step === 1 && !username) {
      setError("Username is required.");
      return;
    } else if (step === 2 && !email) {
      setError("Email is required.");
      return;
    } else if (step === 3 && (!password || !confirmPassword)) {
      setError("Password and Confirm Password are required.");
      return;
    } else if (step === 3 && password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    } else if (step === 3 && !/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    } else if (step === 3 && !/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      return;
    } else if (step === 3 && !/[^A-Za-z0-9]/.test(password)) {
      setError("Password must contain at least one special character.");
      return;
    } else if (step === 4 && !phoneNumber) {
      setError("Phone Number is required.");
      return;
    } else if (step === 5 && !profileImage) {
      setError("Profile Image is required.");
      return;
    }

    setError(""); // Clear error
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Email validation with regex
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  return (
    <div className="body-login">
      <div className="login-container">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {emailTaken && (
          <p style={{ color: "red" }}>
            Email already taken. Please choose another one.
          </p>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="login-title">Register</h1>

          {/* Step 1: Username & Full Name */}
          {step === 1 && (
            <>
              <div className="input-box">
                <i className="bx bxs-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={4}
                />
              </div>
              {username.length < 4 && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  Username must be at least 4 characters long.
                </p>
              )}
              <div className="input-box">
                <i className="bx bxs-user"></i>
                <input
                  type="text"
                  placeholder="Full Name (optional)"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </>
          )}

          {/* Step 2: Email */}
          {step === 2 && (
              <div className="input-box-container">
                <div className="input-box">
                  <i className="bx bxs-envelope"></i>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {email && !isValidEmail(email) && (
                  <p style={{ color: "red", fontSize: "15px" }}>
                    Please enter a valid email address (e.g.,
                    example@fimpa.co).
                  </p>
                )}
              </div>
          )}

          {/* Step 3: Password and Confirm Password */}
          {step === 3 && (
            <>
              <div className="input-box">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <div className="input-box">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {/* Step 4: Address and Phone Number */}
          {step === 4 && (
            <>
              <div className="input-box">
                <i className="bx bxs-phone"></i>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              <div className="input-box">
                <i className="bx bxs-home"></i>
                <input
                  type="text"
                  placeholder="Address (optional)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </>
          )}

          {/* Step 5: Profile Image */}
          {step === 5 && (
            <>
              <div className="profile-image-input">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      padding: "5px 5px 5px 5px",
                      marginTop: "8px",
                      marginBottom: "8px"
                    }}
                  />
                )}
              </div>
            </>
          )}

          <div className="form-actions">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="previous-btn"
              >
                Previous
              </button>
            )}
            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-success py-2 mx-2 px-4"
              >
                Next
              </button>
            ) : (
              <button type="submit" className="register-btn">
                Register
              </button>
            )}
          </div>

          <p className="login my-4">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
