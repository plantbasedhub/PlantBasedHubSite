import React from "react";

export default function Login() {
  return (
    <div>
      <h1>Página de Login</h1>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
