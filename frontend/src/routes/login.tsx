import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";
import Navbar from "#/components/Navbar";
import { Link } from "@tanstack/react-router";
import { API_URL } from "#/api";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

interface Login {
  identifier: string;
  password: string;
}

function RouteComponent() {
  const [login, setLogin] = useState<Login>({
    identifier: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoginError("");

    try {
      await axios.post(
        `${API_URL}/auth/login`,
        {
          identifier: login.identifier,
          password: login.password,
        },
        {
          withCredentials: true,
        },
      );

      navigate({ to: "/flashcards" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setLoginError("Invalid username/email or password.");
        } else if (error.response?.status === 404) {
          setLoginError("Account not found.");
        } else if (error.response?.data?.message) {
          setLoginError(error.response.data.message);
        } else {
          setLoginError("Unable to sign in. Please try again.");
        }
      } else {
        setLoginError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navbar />

      <div className="mx-auto mt-24 w-full max-w-sm px-5 font-[Inter]">
        <div className="mt-5 text-center text-3xl font-semibold">
          Welcome <span className="text-[#015d67]">Back!</span>
        </div>

        <div className="mt-3 text-center text-base text-[#737373]">
          Sign in to continue your flashcard journey
        </div>

        {loginError && (
          <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mt-7 flex flex-col text-base">
            Username or Email
            <input
              type="text"
              value={login.identifier}
              onChange={(e) => {
                setLoginError("");
                setLogin({
                  ...login,
                  identifier: e.target.value,
                });
              }}
              placeholder="Username or Email"
              required
              className="mt-2 h-12 rounded-sm border border-[#ddd] px-4 text-base outline-none focus:border-[#015d67]"
            />
          </div>

          <div className="mt-6 flex flex-col text-base">
            Password
            <input
              type="password"
              value={login.password}
              onChange={(e) => {
                setLoginError("");
                setLogin({
                  ...login,
                  password: e.target.value,
                });
              }}
              placeholder="Password"
              required
              className="mt-2 h-12 rounded-sm border border-[#ddd] px-4 text-base outline-none focus:border-[#015d67]"
            />
          </div>

          <button
            type="submit"
            className="mt-8 h-12 w-full cursor-pointer rounded-sm bg-black text-base text-white"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center text-base">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="cursor-pointer text-[#009bd6] underline"
          >
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}
