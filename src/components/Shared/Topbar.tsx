import React from "react";
import Link from "next/link"; // Next.js usa "next/link" e não "react-router-dom"
//import { Button } from "seu-componente-ui"; // Substitua pelo caminho correto do Button
import { useAuth } from "../../hooks/useauth";

const Topbar: React.FC = () => {
  const { logout } = useAuth(); // Corrigindo a importação do logout

  const SignOut = () => {
    logout();
  };

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">Topbar</div>

      {/* Corrigindo o Link para Next.js */}
      <Link href="/" className="flex gap-3 items-center">
        <img src="/logo.png" alt="logo" width={130} height={325} />
      </Link>

      <div className="flex gap-4">
        {/* Corrigindo a importação do botão */}
        {/* <Button variant="ghost" className="shad-button_ghost" onClick={SignOut}>
          <img src="/logout.png" alt="logout" />
        </Button> */}
      </div>
    </section>
  );
};

export default Topbar;
