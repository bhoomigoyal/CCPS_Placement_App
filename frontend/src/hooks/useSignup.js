// hooks/useSignup.js
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (username, email, password, confirmPassword) => {
    const success = handleInputErrors(username, email, password, confirmPassword);
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Account created successfully!");

    } catch (error) {
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors(username, email, password, confirmPassword) {
  if (!username || !email || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}