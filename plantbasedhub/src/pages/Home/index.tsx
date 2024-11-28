import Image from "next/image";
import Head from "next/head";
import Carousel from "../../components/Carousel"; // Caminho relativo correto para Carousel.jsx
import Navbar from "../../components/Navbar"; // Caminho relativo correto para Navbar.tsx
import styles from "../../styles/home.module.css"; // Caminho relativo correto para home.module.css

export default function Home() {
  return (
    <div className={`${styles.page}`}>
      {/* Metadata da Página */}
      <Head>
        <title>PlantBased Hub - Vegan Worldwide App</title>
        <meta
          name="description"
          content="PlantBased Hub - A Vegan Worldwide App"
        />
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Conteúdo Principal */}
      <div className={`${styles.container}`}>
        <header className="text-center py-8">
          <h1 className="text-5xl font-bold text-green-800 mb-4">
            PlantBased Hub
          </h1>
          <p className="text-lg text-green-700">
            Vegan Worldwide App – Your Gateway to a Sustainable Lifestyle!
          </p>
        </header>

        <main className="mt-5">
          <div className="container mx-auto px-4 text-center">
            {/* Subtítulo */}
            <p className="text-lg text-green-700 mb-8">
              PlantBased Hub is more than just an app – it’s a thriving community
              for vegans and eco-enthusiasts. Share delicious recipes, connect
              with like-minded individuals, shop sustainably, and inspire change.
              Together, we create a better future.
            </p>

            {/* Carrossel */}
            <Carousel />
          </div>
        </main>
      </div>
    </div>
  );
}
