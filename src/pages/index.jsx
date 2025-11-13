import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Landing() {
  return (
    <div className="bg-secondary min-h-screen text-primary">
      {/* HEADER */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">
            InquilinoCheck
          </h1>
          <a
            href="/login"
            className="text-primary font-semibold hover:underline"
          >
            Iniciar sesión
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Sistema colaborativo de reputación de inquilinos
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
        >
          La herramienta digital que permite a las inmobiliarias compartir información,
          evaluar comportamientos y tomar mejores decisiones antes de firmar un contrato.
          Un historial real, confiable y actualizado.
        </motion.p>

        <motion.a
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          href="/register"
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold shadow hover:bg-blue-900 transition"
        >
          Crear cuenta gratis
        </motion.a>
      </section>

      {/* ¿QUÉ HACE? */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl font-bold mb-6"
        >
          ¿Qué hace?
        </motion.h3>

        <motion.ul
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-4 text-gray-700 text-lg"
        >
          <li>✔️ Busca inquilinos por DNI o CUIT.</li>
          <li>✔️ Permite ver historial de pagos, comportamiento y devoluciones.</li>
          <li>✔️ Permite calificar y dejar evaluaciones.</li>
          <li>✔️ Crea una red colaborativa entre inmobiliarias.</li>
          <li>✔️ Evita inquilinos conflictivos o con mala reputación.</li>
        </motion.ul>
      </section>

      {/* BENEFICIOS */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Beneficios
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Decisiones seguras",
                text: "Conocé el historial del inquilino antes de firmar un contrato."
              },
              {
                title: "Ahorro de tiempo",
                text: "Evalúa rápidamente candidatos y comparte información entre inmobiliarias."
              },
              {
                title: "Trabajo transparente",
                text: "Base de datos común, evaluaciones visibles y reglas claras."
              }
            ].map((b, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="p-6 bg-secondary rounded-xl shadow"
              >
                <h4 className="font-bold text-xl mb-2">{b.title}</h4>
                <p className="text-gray-600">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEGURIDAD */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl font-bold mb-6"
        >
          Seguridad
        </motion.h3>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-gray-700 text-lg mb-4"
        >
          Nuestro sistema utiliza conexiones cifradas, autenticación por token y
          control de acceso por inmobiliaria.
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-gray-700 text-lg"
        >
          La información queda protegida y cada inmobiliaria solo accede a sus datos
          y al índice público compartido.
        </motion.p>
      </section>

      {/* CONTACTO */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            ¿Tenés dudas o querés sumarte?
          </motion.h3>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-lg mb-4"
          >
            Escribime directamente por WhatsApp.
          </motion.p>

          <motion.a
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            href="https://wa.me/5491166292503"
            target="_blank"
            rel="noopener"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-gray-100 transition"
          >
            Contactar por WhatsApp
          </motion.a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 bg-white text-center text-gray-500">
        © {new Date().getFullYear()} InquilinoCheck · Desarrollado por JS Solutions
      </footer>
    </div>
  );
}
