"use client";

import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { ref, set } from "firebase/database";
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function SignUp() {
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);

  // Debug CAPTCHA loading
  useEffect(() => {
    // Add a global callback for when reCAPTCHA is ready
    window.onRecaptchaLoaded = () => {
      console.log("reCAPTCHA has loaded successfully");
      setCaptchaLoaded(true);
    };

    // Add script to detect if reCAPTCHA fails to load
    const checkRecaptchaLoading = setTimeout(() => {
      if (!captchaLoaded) {
        console.warn("reCAPTCHA might not have loaded properly");
      }
    }, 5000);

    return () => clearTimeout(checkRecaptchaLoading);
  }, [captchaLoaded]);

  const validateForm = () => {
    const newErrors = {};
    if (!registerData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!registerData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!registerData.password) {
      newErrors.password = "Password is required";
    } else if (registerData.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters";
    }
    if (!captchaVerified) {
      newErrors.captcha = "Please verify you are not a robot";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInput = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
    }
  };

  const handleCaptchaChange = (value) => {
    console.log("CAPTCHA verified:", !!value);
    setCaptchaVerified(!!value);
    if (errors.captcha) {
      setErrors({
        ...errors,
        captcha: null,
      });
    }
  };

  const handleCaptchaExpired = () => {
    console.log("CAPTCHA expired");
    setCaptchaVerified(false);
  };

  const handleCaptchaError = (error) => {
    console.error("CAPTCHA error:", error);
    setErrors({
      ...errors,
      captcha: "Error loading CAPTCHA. Please refresh the page.",
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerData.email,
        registerData.password
      );

      await updateProfile(auth.currentUser, {
        displayName: registerData.fullName,
      });

      await sendEmailVerification(auth.currentUser);

      await set(ref(db, "users/" + userCredential.user.uid), {
        fullname: registerData.fullName,
        email: registerData.email,
        emailVerified: false,
        createdAt: new Date().toISOString(),
      });

      await signOut(auth);

      setSuccessMessage(
        `Registration successful! Verification email sent to ${registerData.email}. 
        Please verify your email before logging in.`
      );

      setRegisterData({ fullName: "", email: "", password: "" });
      setCaptchaVerified(false);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      navigate("/login");
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email is already in use. Try logging in instead.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address format.";
          break;
        case "auth/weak-password":
          errorMessage = "Password must be at least 6 characters.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Check your internet connection.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Try again later.";
          break;
        default:
          console.error("Firebase error:", error);
      }
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-66px)] items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center">Create an account</h2>
        <p className="text-gray-500 font-medium text-center mb-6 mt-3">
          Enter your information to create your account
        </p>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errors.general}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSignUp}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={registerData.fullName}
              onChange={handleInput}
              placeholder="Enter your Full Name"
              className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none ${
                errors.fullName
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-pink-500"
              }`}
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">{errors.fullName}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleInput}
              placeholder="Enter Your Email Address"
              className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none ${
                errors.email
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-pink-500"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleInput}
              placeholder="Create a password (min. 6 characters)"
              className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none ${
                errors.password
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-pink-500"
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

          <div className=" w-full">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" 
              onChange={handleCaptchaChange}
              onExpired={handleCaptchaExpired}
              onErrored={handleCaptchaError}
              onLoad={() => setCaptchaLoaded(true)}
            
            />
          </div>
          {errors.captcha && (
            <div className="text-center">
              <span className="text-red-500 text-sm">{errors.captcha}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !captchaVerified}
            className={`w-full py-2 rounded-md transition ${
              captchaVerified && !loading
                ? "bg-pink-700 text-white hover:bg-pink-800"
                : "bg-pink-400 text-white cursor-not-allowed"
            }`}
          >
            {loading ? "Processing..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
