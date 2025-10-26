// src/components/Experience.js
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { usePortfolio } from "../contexts/PortfolioContext";
import { Card, CardContent } from "./ui/card";

const asArr = (x) => (Array.isArray(x) ? x : []);

const Experience = () => {
  const { portfolio, loading } = usePortfolio();
  const experience = asArr(portfolio?.experience);

  if (loading) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          {/* Section Title */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 text-center"
          >
            Experience
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-black dark:bg-white mx-auto mb-16 rounded-full"
          />

          {/* Timeline Container */}
          <div className="relative border-l-2 border-gray-300 dark:border-gray-700 ml-6 md:ml-20">
            {experience.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400">
                No experience added yet.
              </div>
            ) : (
              experience.map((exp, index) => {
                const title = exp?.title || "Role";
                const company = exp?.company || "";
                const duration = exp?.duration || "";
                const type = exp?.type || "";
                const highlights = asArr(exp?.highlights);

                return (
                  <motion.div
                    key={exp?.id ?? index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="relative mb-12 ml-6"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[1.65rem] top-2 w-4 h-4 bg-black dark:bg-white rounded-full border-2 border-gray-100 dark:border-gray-900"></div>

                    <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all">
                      <CardContent className="p-6">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                          <h3 className="text-xl font-semibold text-black dark:text-white mb-1 md:mb-0">
                            {title}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                            {duration && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {duration}
                              </span>
                            )}
                            {type && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {type}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Company */}
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                          <Briefcase className="h-4 w-4" />
                          <span className="font-medium">{company}</span>
                        </div>

                        {/* Highlights */}
                        <ul className="space-y-2">
                          {highlights.length ? (
                            highlights.map((hl, idx) => (
                              <li
                                key={idx}
                                className="flex items-start text-gray-600 dark:text-gray-400 text-sm leading-relaxed"
                              >
                                <span className="text-black dark:text-white mr-2 mt-1">
                                  •
                                </span>
                                <span>{hl}</span>
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500 dark:text-gray-400 text-sm">
                              —
                            </li>
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;