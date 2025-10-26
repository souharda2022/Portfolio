import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../contexts/PortfolioContext";
import { Card, CardContent } from "./ui/card";

const About = () => {
  const { portfolio, loading } = usePortfolio();
  if (loading) return null;

  const personalInfo = portfolio?.personal_info ?? {};

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-950 dark:to-gray-900"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white"
          >
            About Me
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            className="mt-3 h-[3px] w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"
          />
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            I’m <span className="font-semibold text-cyan-500">{personalInfo.name || "Souharda Bhattacharjee"}</span>, 
            an aspiring data scientist driven by curiosity, precision, and a desire to 
            transform raw data into meaningful stories. My journey in computer science 
            is shaped by a constant pursuit to blend <span className="text-gray-800 dark:text-gray-300 font-medium">
            analytical reasoning</span> with <span className="text-gray-800 dark:text-gray-300 font-medium">
            real-world impact</span>.
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* LEFT: Narrative */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              My Journey
            </h3>
            <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-4">
              Born in Dhaka, Bangladesh, I began developing a fascination for
              problem-solving early on. My academic foundation was built at
              Dhanmondi Government Boys High School and Monipur High School &
              College, where a love for mathematics and logic evolved into a
              deeper curiosity about computation, systems, and intelligence.
            </p>
            <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-4">
              Today, I’m pursuing a Bachelor’s in Computer Science at BRAC
              University — exploring data science, AI, and machine learning. I
              find inspiration in how data can explain human behavior, predict
              outcomes, and drive innovations that improve lives.
            </p>
            <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
              My long-term goal is to design adaptive, ethical, and efficient AI
              systems that bring clarity to complexity — bridging the gap
              between human creativity and computational precision.
            </p>
          </motion.div>

          {/* RIGHT: Skills Snapshot */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 shadow-md">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Technical Highlights
                </h3>
                <ul className="space-y-4 text-gray-700 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">▹</span>
                    Data analytics, visualization & campaign optimization
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">▹</span>
                    Machine learning & computer vision solutions
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">▹</span>
                    Full-stack development with MERN and Flask
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">▹</span>
                    UI/UX prototyping in Figma with responsive design
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">▹</span>
                    Statistical modeling, QA, and testing methodologies
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Closing Line */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center text-gray-600 dark:text-gray-400 text-lg"
        >
         
        </motion.p>
      </div>
    </section>
  );
};

export default About;
