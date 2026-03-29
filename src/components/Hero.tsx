import Image from "next/image"

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center p-8 gap-12">
      {/* Kiri: Mockup HP */}
      <div className="w-full md:w-1/3 flex justify-center">
        <Image
          src="/images/mockup-hp.png"
          alt="Rifera Management Instagram"
          width={250}
          height={500}
          className="max-w-[250px] drop-shadow-2xl rounded-[3rem] h-auto"
        />
      </div>

      {/* Kanan: Teks Besar */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        {/* Menggunakan text-riferaPurple (CamelCase untuk versi v3) */}
        <h1 className="text-6xl md:text-8xl font-black text-riferaPurple tracking-tighter leading-none mb-4 uppercase">
          Rifera
          <br />
          Management
        </h1>
        <div className="flex items-center justify-center md:justify-start gap-2 text-xl font-semibold bg-white px-4 py-2 rounded-full inline-flex text-riferaPurple">
          <span>📸</span> @RIFERAMANAGEMENT
        </div>
      </div>
    </section>
  )
}
