import { motion } from "framer-motion";
import teamPhoto from "../assets/team.jpg";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-[#004018] font-sans">
      {/* Intro */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-xs uppercase tracking-widest text-[#004018]/60 font-semibold mb-2">
          Welcome to our world
        </p>
        <h1 className="text-3xl md:text-4xl font-light leading-snug">
          We created Savoa Club to breathe, move, and glow — <span className="italic">together</span>.
        </h1>
      </motion.section>

      {/* Team section */}
      <section className="flex flex-col md:flex-row items-start gap-8 md:gap-14 mb-24">
        {/* Team photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border border-[#004018]/20 mx-auto md:mx-0 shrink-0 shadow-md"
        >
          <img src={teamPhoto} alt="Savoa Team" className="w-full h-full object-cover" />
        </motion.div>

        {/* Team text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[#004018]/90 text-base md:text-lg leading-relaxed max-w-3xl"
        >
          <p className="mb-4">
            <span className="italic">Savoa Club</span> родился из желания создавать не просто события, а атмосферу — лёгкую, вдохновляющую, где женщина может почувствовать себя собой.
          </p>
          <p className="mb-4">
            Без спешки. Без напряжения. В движении, дыхании, тишине и красоте простых деталей.
          </p>
          <p className="mb-4">
            Мы верим, что забота о себе — это не роскошь, а необходимость. Каждое наше мероприятие — это возможность остановиться, наполниться и встретиться с близкими по духу.
            Мы просто хотим, чтобы вам было хорошо. <span className="italic">По-настоящему.</span>
          </p>
          <p className="italic mt-6">
            И если после нашей встречи вы улыбнётесь чуть чаще, вдохнёте глубже и почувствуете себя светлее — значит, всё получилось.
          </p>
          <p className="uppercase text-sm tracking-widest mt-6 text-[#004018]/50">
            — с любовью, команда Savoa Club
          </p>
        </motion.div>
      </section>

      {/* Breathe / Move / Glow */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-center"
      >
        <div className="transition duration-300 hover:-translate-y-1">
          <h3 className="text-xl font-semibold uppercase tracking-wide mb-2">BREATHE</h3>
          <p className="text-[#004018]/80 text-sm leading-relaxed">
            Осознанное дыхание как точка опоры. Мы учим останавливаться и слышать себя.
          </p>
        </div>
        <div className="transition duration-300 hover:-translate-y-1">
          <h3 className="text-xl font-semibold uppercase tracking-wide mb-2">MOVE</h3>
          <p className="text-[#004018]/80 text-sm leading-relaxed">
            Мягкое движение через пилатес, йогу и телесные практики. Чтобы чувствовать силу и лёгкость.
          </p>
        </div>
        <div className="transition duration-300 hover:-translate-y-1">
          <h3 className="text-xl font-semibold uppercase tracking-wide mb-2">GLOW</h3>
          <p className="text-[#004018]/80 text-sm leading-relaxed">
            Внутреннее и внешнее сияние через эстетику, заботу о себе и честное присутствие.
          </p>
        </div>
      </motion.section>
    </div>
  );
}

