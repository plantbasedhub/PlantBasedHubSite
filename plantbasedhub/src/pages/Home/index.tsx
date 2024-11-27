import Image from "next/image";
import Head from 'next/head';
import Carousel from '../../components/Carousel'

export default function Home() {
  return (

    <div className="bg-lime-500 text-white content backgroundP">

      <Head>
      <title>PlantBased Hub - Vegan Worldwide App</title>
      <meta name="description" content="PlantBased Hub - A Vegan Worldwide App" />
      </Head>
      
      

      {/* Main Content */}
      <main className="bg-lime-500 mt-5">
        <div className="container bg-lime-500 mx-auto px-4 text-center">
          {/* Título Principal */}
          <h1 className="text-4xl bg-lime-500 font-extrabold mb-4 text-green-800">
            Welcome to PlantBased Hub – Your Gateway to a Sustainable Lifestyle!
          </h1>

          {/* Subtítulo */}
          <p className="text-lg bg-lime-500 text-green-700 mb-8">
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
  );
}
