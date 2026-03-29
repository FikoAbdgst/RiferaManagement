export default function Pricing() {
  const packages = [
    { name: "Basic", price: "800K", talent: "10 Talent" },
    { name: "Standar", price: "1,250K", talent: "20 Talent" },
    { name: "Premium", price: "1,650K", talent: "30 Talent" },
  ]

  return (
    <section className="py-20 px-8 text-center max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-rifera-purple mb-12 uppercase">
        Pricelist
      </h2>

      <div className="flex flex-col gap-6 items-center">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="w-full md:w-2/3 bg-white border-2 border-rifera-purple/30 rounded-full py-4 px-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold">{pkg.name}</h3>
            <p className="text-lg font-semibold text-rifera-purple">
              {pkg.price} - {pkg.talent}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 font-medium">
        Noted : You can custom the talent by followers (by ratecard)
      </p>
    </section>
  )
}
