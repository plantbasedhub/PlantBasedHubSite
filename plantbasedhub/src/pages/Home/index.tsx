import Image from "next/image";
import Head from "next/head";
import Carousel from "../../components/Carousel"; // Importação do componente Carrossel

export default function Home() {
  return (
    <div
      className="bg-gray-100 text-white content backgroundP"
      style={{ backgroundColor: "#80AF81", textDecorationColor: "#D6EFD8" }}
    >
      <Head>
        <title>PlantBased Hub - Vegan Worldwide App</title>
        <meta
          name="description"
          content="PlantBased Hub - A Vegan Worldwide App"
        />
      </Head>

      {/* Navbar */}
      <nav className="bg-green-600 px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="rounded-full p-2">
            <Image
              src="/A_Vegan_worldwide_app_1.png"
              alt="Logo"
              width={75}
              height={75}
              className="rounded-full"
            />
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-6">
          <a
            href="#home"
            className="text-white hover:text-green-200 transition duration-200"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-white hover:text-green-200 transition duration-200"
          >
            About
          </a>
          <a
            href="#discover"
            className="text-white hover:text-green-200 transition duration-200"
          >
            Discover
          </a>
          <a
            href="#contact"
            className="text-white hover:text-green-200 transition duration-200"
          >
            Contact
          </a>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <button className="text-white border border-white px-4 py-1 rounded hover:bg-green-500 hover:border-green-500 transition duration-200">
            Log in
          </button>
          <button className="bg-white text-green-600 px-4 py-1 rounded hover:bg-green-500 hover:text-white transition duration-200">
            Create an account
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          {/* Título Principal */}
          <h1 className="text-4xl font-extrabold mb-4 text-green-800">
            Welcome to PlantBased Hub – Your Gateway to a Sustainable Lifestyle!
          </h1>

          {/* Subtítulo */}
          <p className="text-lg text-green-700 mb-8">
            PlantBased Hub is more than just an app – it’s a thriving community
            for vegans and eco-enthusiasts. Share delicious recipes, connect
            with like-minded individuals, shop sustainably, and inspire change.
            Together, we create a better future.
          </p>

          {/* Carrossel */}
          <Carousel />

          {/* Testemunho */}
          <div className="mt-12 flex flex-col items-center text-center">
            <div className="flex items-center mb-4">
              {/* Avatares dos Usuários */}
              <Image
                src="/path-to-avatar1.jpg" // Substitua pelo caminho correto
                alt="User 1"
                width={40}
                height={40}
                className="rounded-full shadow-md -mr-2"
              />
              <Image
                src="/path-to-avatar2.jpg" // Substitua pelo caminho correto
                alt="User 2"
                width={40}
                height={40}
                className="rounded-full shadow-md -mr-2"
              />
              <Image
                src="/path-to-avatar3.jpg" // Substitua pelo caminho correto
                alt="User 3"
                width={40}
                height={40}
                className="rounded-full shadow-md"
              />
            </div>
            <p className="text-sm font-medium text-gray-600">
              200k users have joined us! <br /> We're waiting for you.
            </p>
            <blockquote className="mt-4 text-lg italic text-green-600">
              "PlantBased Hub is so awesome. I can browse inspiration for my
              recipes, save and organize them all in one place!"
            </blockquote>
            <p className="mt-2 font-bold">- Matthew Johnson, Designer</p>
          </div>
        </div>
      </main>
    </div>
  );
}
