import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";
import Navbar from "#/components/Navbar";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

interface Signup {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RouteComponent() {
  const [signup, setSignup] = useState<Signup>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSignupError("");

    if (signup.password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }

    setPasswordError("");

    if (signup.password !== signup.confirmPassword) {
      setSignupError("Passwords do not match. Please try again.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/auth/signup",
        {
          username: signup.username,
          email: signup.email,
          password: signup.password,
        },
        {
          withCredentials: true,
        },
      );

      navigate({ to: "/flashcards" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setSignupError("An account with this email already exists.");
        } else if (error.response?.data?.message) {
          setSignupError(error.response.data.message);
        } else {
          setSignupError("Unable to create account. Please try again.");
        }
      } else {
        setSignupError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navbar />

      <div className="mx-auto mt-24 w-full max-w-sm px-5 font-[Inter]">
        <div className="mt-5 text-center text-3xl font-semibold">
          Create an <span className="text-[#015d67]">Account!</span>
        </div>

        <div className="mt-3 text-center text-base text-[#737373]">
          Sign up to start creating and studying flashcards
        </div>

        {signupError && (
          <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {signupError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mt-7 flex flex-col text-base">
            Username
            <input
              type="username"
              value={signup.username}
              onChange={(e) =>
                setSignup({
                  ...signup,
                  username: e.target.value,
                })
              }
              required
              className="mt-2 h-12 rounded-sm border border-[#ddd] px-4 text-base outline-none focus:border-[#015d67]"
            />
          </div>

          <div className="mt-6 flex flex-col text-base">
            Email
            <input
              type="email"
              value={signup.email}
              onChange={(e) =>
                setSignup({
                  ...signup,
                  email: e.target.value,
                })
              }
              required
              className="mt-2 h-12 rounded-sm border border-[#ddd] px-4 text-base outline-none focus:border-[#015d67]"
            />
          </div>

          <div className="mt-6 flex flex-col text-base">
            Password
            <input
              type="password"
              value={signup.password}
              onChange={(e) => {
                setPasswordError("");
                setSignup({
                  ...signup,
                  password: e.target.value,
                });
              }}
              required
              className="mt-2 h-12 rounded-sm border border-[#ddd] px-4 text-base outline-none focus:border-[#015d67]"
            />
            <div className="mt-2 text-sm text-[#737373]">
              Minimum 8 characters
            </div>
            {passwordError && (
              <div className="mt-2 text-sm text-red-500">{passwordError}</div>
            )}
          </div>

          <div className="mt-6 flex flex-col text-base">
            Confirm Password
            <input
              type="password"
              value={signup.confirmPassword}
              onChange={(e) => {
                setSignupError("");
                setSignup({
                  ...signup,
                  confirmPassword: e.target.value,
                });
              }}
              required
              className="mt-2 h-12 rounded-sm border border-[#ddd] px-4 text-base outline-none focus:border-[#015d67]"
            />
          </div>

          <button
            type="submit"
            className="mt-8 h-12 w-full cursor-pointer rounded-sm bg-black text-base text-white"
          >
            Sign up
          </button>
        </form>

        <div className="mt-6 text-center text-base">
          Already have an account?{" "}
          <Link to="/login" className="cursor-pointer text-[#009bd6] underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
