import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Bem-vindo ao Next.js com Pages Router!</h1>
      <Link href="/login">Ir para Login</Link>
    </div>
  );
}
