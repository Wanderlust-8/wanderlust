import { IoCalendarOutline } from "react-icons/io5";
import { IoHandLeftOutline } from "react-icons/io5";

function Newsletter() {
  return (
    <div className="relative isolate overflow-hidden bg-green-900 py-10 sm:py-16 lg:py-24 rounded-3xl">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Suscríbete a nuestro newsletter.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Entérate antes de nuestros descuentos, novedades y artículos de
              interés!
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Dirección de email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 placeholder:text-white/80"
                placeholder="Ingresa tu email"
              />

              <button
                type="submit"
                className="flex-none rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                Suscribirme
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-center">
              {" "}
              {/* Alineación centrada aquí */}
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <IoCalendarOutline
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4 font-semibold text-white">
                Artículos semanales
              </dt>
              <dd className="mt-2 leading-7 text-gray-400 text-center">
                {" "}
                {/* text in inglés */}
                Mantente informado con nuestra selección de artículos semanales
                sobre destinos imperdibles, información relevante y tips de
                viaje, todo en un solo lugar! Suscríbete ahora y nunca te
                pierdas las novedades.
              </dd>
            </div>
            <div className="flex flex-col items-center">
              {" "}
              {/* Alineación centrada aquí */}
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <IoHandLeftOutline
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4 font-semibold text-white">No spam</dt>
              <dd className="mt-2 leading-7 text-gray-400 text-center">
                {" "}
                {/* Alineación de texto centrada aquí */}
                Te prometemos no spamearte. Solo te enviaremos contenido
                relevante y podrás cancelar tu suscripción en cualquier momento.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        aria-hidden="true"
      >
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#4caf50] to-[#8bc34a] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}

export default Newsletter;
