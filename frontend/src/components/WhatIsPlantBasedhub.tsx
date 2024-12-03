import Image from "next/image";
import styles from "../styles/WhatIsPlantBasedHub.module.css"; // CSS do componente

export default function WhatIsPlantBasedHub() {
  return (
    <section
      className={`${styles.whatIsPlantBasedHub} py-10`}
      id="about"
    >
      <div className="container mx-auto px-6 text-center">
        {/* Título */}
        <h2 className="text-4xl font-bold text-green-800 mb-6">
          What is PlantBased Hub?
        </h2>
        <p className="text-lg text-green-600 mb-8">
          Discover how PlantBased Hub inspires sustainable lifestyles.
        </p>

        {/* Galeria de imagens */}
        <div className={styles.gallery}>
          {/* Imagem 1 */}
          <div className="rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/images/project1.jpg"
              alt="Warm tone living room"
              width={300}
              height={300}
              className="object-cover"
            />
            <div className="text-left p-4">
              <p className="text-green-700 text-sm">
                <strong>sarah_miller_93</strong>
              </p>
              <p className="text-green-800 font-semibold">
                "warm tone living room" in HOME DECOR
              </p>
            </div>
          </div>

          {/* Imagem 2 */}
          <div className="rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/images/project2.jpg"
              alt="Scandinavian interior design"
              width={300}
              height={300}
              className="object-cover"
            />
            <div className="text-left p-4">
              <p className="text-green-800 font-semibold">
                Scandinavian interior design ideas
              </p>
            </div>
          </div>

          {/* Imagem 3 */}
          <div className="rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/images/project3.jpg"
              alt="Mid-century modern interior"
              width={300}
              height={300}
              className="object-cover"
            />
            <div className="text-left p-4">
              <p className="text-green-800 font-semibold">
                Mid-century modern interior and wood living room decor
              </p>
            </div>
          </div>
        </div>

        {/* Botão Explore */}
        <div className="mt-8">
          <button className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
            Explore →
          </button>
        </div>
      </div>
    </section>
  );
}
