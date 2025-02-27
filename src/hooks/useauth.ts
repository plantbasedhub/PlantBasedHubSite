import { useEffect, useState } from "react";

export function useAuth() {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.user) setUser(data.user);
          })
          .catch(() => localStorage.removeItem("token"));
      }
    }, []);
  
    const login = async (email: string, password: string) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
      }
    };
  
    const register = async (name: string, email: string, password: string) => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await res.json();
      if (data.user) {
        await login(email, password);
      }
    };
  
    const logout = () => {
      localStorage.removeItem("token");
      setUser(null);
    };
  
    return { user, login, register, logout };
  }
  