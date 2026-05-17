import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";

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

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signup.password !== signup.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await axios.post(
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

      console.log(response.data);
      navigate({ to: "/" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          value={signup.username}
          onChange={(e) =>
            setSignup({
              ...signup,
              username: e.target.value,
            })
          }
          placeholder="Username"
          className="border p-2 rounded bg-amber-100"
          required
        />
        <input
          type="email"
          value={signup.email}
          onChange={(e) =>
            setSignup({
              ...signup,
              email: e.target.value,
            })
          }
          placeholder="Email"
          className="border p-2 rounded bg-amber-100"
          required
        />
        <input
          type="password"
          value={signup.password}
          onChange={(e) =>
            setSignup({
              ...signup,
              password: e.target.value,
            })
          }
          placeholder="Password"
          className="border p-2 rounded bg-amber-100"
          required
        />
        <input
          type="password"
          value={signup.confirmPassword}
          onChange={(e) =>
            setSignup({
              ...signup,
              confirmPassword: e.target.value,
            })
          }
          placeholder="Confirm Password"
          className="border p-2 rounded bg-amber-100"
          required
        />
        <button className="bg-red-50">Submit</button>
      </form>
    </div>
  );
}
