import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Bem-vindo ao Next.js com Pages Router!</h1>
      <Link href="/Home/Auth/login">Ir para Login</Link>
      <Link href="/Home/Auth/register">Ir para Registo</Link>
    </div>
  );
}
