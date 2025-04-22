// hooks/useSignup.js
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (username, email, password, confirmPassword, name, position, responsibility, department, email_2) => {
    const success = handleInputErrors(username, email, password, confirmPassword, name, position, responsibility, department, email_2);
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          name,
          position,
          responsibility,
          department,
          email_2
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Set user in context and local storage
      localStorage.setItem("auth-user", JSON.stringify(data));
      setAuthUser(data);
      
      toast.success("Signup successful!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

// Validation function
const handleInputErrors = (username, email, password, confirmPassword, name, position, responsibility, department, email_2) => {
  if (!username || !email || !password || !confirmPassword || !name || !position || !responsibility || !department || !email_2) {
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
};

export default useSignup;