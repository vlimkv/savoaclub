import { motion } from "framer-motion";
import teamPhoto from "../assets/team.jpg";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-[#004018] font-sans bg-gradient-to-b from-[#f8f0de] to-[#f2e8d4]">
      {/* Intro */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-5"
      >
        <p className="text-xs uppercase tracking-widest text-[#004018]/60 font-semibold mb-2">
          Welcome to our world
        </p>
        <h1 className="text-3xl md:text-4xl font-light leading-snug">
          We created Savoa to breathe, move, and glow —{" "}
          <span className="italic">together</span>.
        </h1>
      </motion.section>

      {/* Divider */}
      <div className="my-6 h-[1px] w-full bg-[#004018]/10 backdrop-blur-sm rounded-full" />

      {/* Team section */}
      <section className="flex flex-col md:flex-row items-start gap-8 md:gap-12 mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border border-[#004018]/20 shadow-md mx-auto md:mx-0"
        >
          <img src={teamPhoto} alt="Savoa Team" className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#004018]/90 text-base sm:text-lg leading-relaxed max-w-3xl"
        >
          <p className="mb-4 italic">
            Savoa Club родился из желания создавать не просто события, а атмосферу — лёгкую,
            вдохновляющую, где женщина может почувствовать себя собой.
          </p>
          <p className="mb-4">
            Без спешки. Без напряжения. В движении, дыхании, тишине и красоте простых деталей.
          </p>
          <p className="mb-4">
            Мы верим, что забота о себе — это не роскошь, а необходимость. Каждое наше мероприятие —
            это возможность остановиться, наполниться и встретиться с близкими по духу. Мы просто
            хотим, чтобы вам было хорошо.{" "}
            <span className="italic">По-настоящему.</span>
          </p>
          <p className="italic mt-6">
            И если после нашей встречи вы улыбнётесь чуть чаще, вдохнёте глубже и почувствуете себя
            светлее — значит, всё получилось.
          </p>
          <p
            className="mt-8 text-sm tracking-wider text-[#004018]/50 font-[Dancing_Script,cursive] italic"
            style={{ fontFamily: `'Dancing Script', cursive` }}
          >
            — с любовью, SAVOA
          </p>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="mt-6 mb-10 h-[1px] w-full bg-[#004018]/10 backdrop-blur-sm rounded-full" />


      {/* Breathe / Move / Glow */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-center"
      >
        <motion.div variants={itemVariants} className="transition duration-300 hover:-translate-y-1">
          <h3 className="text-xl font-semibold uppercase tracking-wide mb-1">BREATHE</h3>
          <p className="text-xs text-[#004018]/60 mb-1">Основа всего</p>
          <p className="text-[#004018]/80 text-sm leading-relaxed">
            Осознанное дыхание как точка опоры. Мы учим останавливаться и слышать себя.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="transition duration-300 hover:-translate-y-1">
          <h3 className="text-xl font-semibold uppercase tracking-wide mb-1">MOVE</h3>
          <p className="text-xs text-[#004018]/60 mb-1">Мягкость и сила</p>
          <p className="text-[#004018]/80 text-sm leading-relaxed">
            Мягкое движение через пилатес, йогу и телесные практики. Чтобы чувствовать силу и лёгкость.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="transition duration-300 hover:-translate-y-1">
          <h3 className="text-xl font-semibold uppercase tracking-wide mb-1">GLOW</h3>
          <p className="text-xs text-[#004018]/60 mb-1">Внутренний свет</p>
          <p className="text-[#004018]/80 text-sm leading-relaxed">
            Внутреннее и внешнее сияние через эстетику, заботу о себе и честное присутствие.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}
