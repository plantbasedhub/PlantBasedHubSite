import Image from "next/image";
import Head from 'next/head';
import '../../components/RootLayout'

export default function Home() {
  return (
<<<<<<< Updated upstream
    <div className="bg-gray-100 text-white content backgroundP" style={{ backgroundColor: '#80AF81', textDecorationColor: '#D6EFD8' }}>
=======
    <div className="bg-lime-500 text-white content backgroundP">
>>>>>>> Stashed changes
      <Head>
      <title>PlantBased Hub - Vegan Worldwide App</title>
      <meta name="description" content="PlantBased Hub - A Vegan Worldwide App" />
      </Head>
      <div className="bg-transparent rounded-lg mx-auto max-w-2xl">
        <header className="bg-transparent p-4">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center">Spiritual Apotheosis</h1>
          </div>
<<<<<<< Updated upstream
        </header>
        <main className="container mx-auto mt-8">
          <section className="mt-8 md:mt-0 md:ml-8">
            <div className="mb-8 flex justify-center">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/EwgyST8ZYFI?si=V-vtAvQ5XRpvb3T9"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="container mx-auto flex justify-between items-center">
              <div className="container mx-auto">
                <h2 className="text-2xl font-semibold text-center">Tracklist</h2>
                <ul className="mx-auto text-center" >
                  <li className="mb-4">
                    <h3 className="text-xl ">1. Exordium (intro)</h3>
                  </li>
                  <li className="mb-4 ">
                    <h3 className="text-xl ">2. Metempsychosis</h3>
                  </li>
                  <li className="mb-4">
                    <h3 className="text-xl ">3. Black Putrescense</h3>
                  </li>
                  <li className="mb-4">
                    <h3 className="text-xl ">4. Liberation (Cathartic Ascension - Part I)</h3>
                  </li>
                  <li className="mb-4">
                    <h3 className="text-xl ">5. Interludium</h3>
                  </li>
                  <li className="mb-4">
                    <h3 className="text-xl ">6. Vesselvoid</h3>
                  </li>
                  <li className="mb-4">
                    <h3 className="text-xl ">7. Azoth</h3>
                  </li>
                  <li className="mb-4">
                    <h3 className="text-xl ">8. Coagulation (Cathartic Ascension - Part II)</h3>
                  </li>
                  <li className="mb-4">
                    <h3 className="text-xl ">9. Epilogue (outro)</h3>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
      <br />
      <br />
=======
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-6">
          <a
            href="#home"
            className="text-white hover:text-green-200 transition duration-200 px-3"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-white hover:text-green-200 transition duration-200 px-3"
          >
            About
          </a>
          <a
            href="#discover"
            className="text-white hover:text-green-200 transition duration-200 px-3"
          >
            Discover
          </a>
          <a
            href="#contact"
            className="text-white hover:text-green-200 transition duration-200 px-3"
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
>>>>>>> Stashed changes
    </div>
  );
}
