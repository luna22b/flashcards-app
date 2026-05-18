export async function getMe() {
  const res = await fetch("http://localhost:5000/auth/me", {
    credentials: "include",
  });

  if (!res.ok) return null;
  return res.json();
}
