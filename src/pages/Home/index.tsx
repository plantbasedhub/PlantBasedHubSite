import Image from "next/image";
import Head from "next/head"; // Certifique-se de importar o Head
import Navbar from "../../components/Navbar"; // Navbar principal
import WhatIsPlantBasedHub from "../../components/WhatIsPlantBasedhub"; // Importando o componente
import styles from "../../styles/home.module.css"; // CSS principal
import Carousel from "../../components/Carousel";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Metadata */}
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
      <div className={styles.container}>
        <header className="text-center py-8">
          <h1 className="text-5xl font-bold text-green-800 mb-4">
            PlantBased Hub
          </h1>
          <p className="text-lg text-green-700">
            Vegan Worldwide App – Your Gateway to a Sustainable Lifestyle!
          </p>
        </header>

        

          {/* Integração do componente Carousel */}
        <main className="mt-5">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg text-green-700 mb-8">
              PlantBased Hub is more than just an app – it&apos;s a thriving community
              for vegans and eco-enthusiasts. Share delicious recipes, connect
              with like-minded individuals, shop sustainably, and inspire change.
              Together, we create a better future.
            </p>
            <Carousel />
          </div>
        </main>

          {/* Integração do componente WhatIsPlantBasedHub */}
          <WhatIsPlantBasedHub />
      </div>
    </div>
  );
}
