import { motion } from "framer-motion";
import teamPhoto from "../assets/team.jpg";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function About() {
  return (
    <div className="w-full bg-gradient-to-b from-[#f8f0de] to-[#f2e8d4]">
    <div className="relative max-w-6xl mx-auto px-6 py-12 text-[#004018] font-sans">
      
      {/* Заголовок */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <p className="text-xs uppercase tracking-widest text-[#004018]/60 font-semibold mb-2">
          Welcome to our world
        </p>
        <motion.h1
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-3xl md:text-10xl font-light leading-snug"
        >
          We created Savoa to breathe, move, and glow — <span className="italic">together</span>.
        </motion.h1>
        <div className="mt-3 h-[2px] w-12 bg-[#004018]/30 mx-auto rounded-full" />
      </motion.section>

      <div className="my-6 h-[1px] w-full bg-[#004018]/10 backdrop-blur-sm rounded-full" />

      {/* Команда */}
      <section className="flex flex-col md:flex-row items-start gap-8 md:gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border border-[#004018]/20 shadow-md mx-auto md:mx-0"
        >
          <img src={teamPhoto} alt="Savoa Team" className="w-full h-full object-cover pointer-events-none" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#004018]/90 text-base sm:text-lg leading-relaxed max-w-3xl"
        >
          <p className="mb-4 italic">
            Savoa Club родился из желания создавать не просто события, а атмосферу — лёгкую, вдохновляющую, где женщина может почувствовать себя собой.
          </p>
          <p className="mb-4">
            Без спешки. Без напряжения. В движении, дыхании, тишине и красоте простых деталей.
          </p>
          <p className="mb-4">
            Мы верим, что забота о себе — это не роскошь, а необходимость. Каждое наше мероприятие — это возможность остановиться, наполниться и встретиться с близкими по духу. Мы просто хотим, чтобы вам было хорошо. <span className="italic">По-настоящему.</span>
          </p>
          <p className="italic mt-6">
            И если после нашей встречи вы улыбнётесь чуть чаще, вдохнёте глубже и почувствуете себя светлее — значит, всё получилось.
          </p>
          <p className="mt-8 text-sm tracking-wider text-[#004018]/50 font-[Dancing_Script,cursive] italic">
            — с любовью, SAVOA
          </p>
        </motion.div>
      </section>

      <div className="my-6 h-[1px] w-full bg-[#004018]/10 backdrop-blur-sm rounded-full" />

      {/* Декор */}
      <div className="absolute bottom-[-60px] right-[-30px] w-40 h-40 bg-[url('/texture.svg')] bg-contain bg-no-repeat opacity-10 pointer-events-none hidden md:block" />

      {/* BREATHE / MOVE / GLOW */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-14 text-center relative z-10"
        >

        {[
          {
            title: "BREATHE",
            subtitle: "Основа всего",
            text: "Осознанное дыхание как точка опоры. Мы учим останавливаться и слышать себя.",
          },
          {
            title: "MOVE",
            subtitle: "Мягкость и сила",
            text: "Мягкое движение через пилатес, йогу и телесные практики. Чтобы чувствовать силу и лёгкость.",
          },
          {
            title: "GLOW",
            subtitle: "Внутренний свет",
            text: "Внутреннее и внешнее сияние через эстетику, заботу о себе и честное присутствие.",
          },
        ].map((item) => (
            <motion.div
            variants={itemVariants}
            whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 30px rgba(0, 64, 24, 0.08)",
                transition: { duration: 0.4, ease: "easeOut" },
            }}
            className="rounded-md backdrop-blur-sm p-5 transition duration-300"
            >
            <h3 className="text-xl font-semibold uppercase tracking-wide mb-1">
                {item.title}
            </h3>
            <p className="text-xs text-[#004018]/60 mb-1">{item.subtitle}</p>
            <p className="text-[#004018]/80 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
        ))}
      </motion.section>
    </div>
    </div>
  );
}
