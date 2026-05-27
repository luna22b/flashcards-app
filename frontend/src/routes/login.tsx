import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";

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

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        {
          identifier: login.identifier,
          password: login.password,
        },
        {
          withCredentials: true,
        },
      );

      console.log(response.data);
      navigate({ to: "/flashcards" });
      // once the handleSubmit runs and the user successfully logs in, re render and navigate back to home
      // so that the page can display the user's contents
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={login.identifier}
          onChange={(e) =>
            setLogin({
              ...login,
              identifier: e.target.value,
            })
          }
          placeholder="Username or Email"
          className="border p-2 rounded bg-amber-100"
          required
        />
        <input
          type="password"
          value={login.password}
          onChange={(e) =>
            setLogin({
              ...login,
              password: e.target.value,
            })
          }
          placeholder="Password"
          className="border p-2 rounded bg-amber-100"
          required
        />
        <button className="bg-red-50">Submit</button>
      </form>
    </div>
  );
}
