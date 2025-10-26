import React from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { usePortfolio } from "../contexts/PortfolioContext";
import { Card, CardContent } from "./ui/card";

const asArr = (x) => (Array.isArray(x) ? x : []);

// ✅ Safe resolver — works for localhost, GitHub Pages, or subpaths
const getImagePath = (fileName) => {
  if (!fileName) return `${process.env.PUBLIC_URL}/images/placeholder.jpg`;
  const base = process.env.PUBLIC_URL || "";
  return `${base}/images/${fileName}`;
};

const Projects = () => {
  const { portfolio, loading } = usePortfolio();
  const projects = asArr(portfolio?.projects);

  if (loading || !projects.length) return null;

  const thesisProject = projects[0];
  const otherProjects = projects.slice(1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="projects"
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
          {/* === Section Header === */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 text-center"
          >
            Projects
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-black dark:bg-white mx-auto mb-16 rounded-full"
          />

          {/* === Thesis Project === */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex flex-col md:flex-row md:items-start md:gap-8">
              <div className="md:w-1/3 w-full mb-6 md:mb-0">
                <img
                  src={getImagePath(thesisProject.image)}
                  alt={thesisProject.title}
                  className="w-full h-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700 object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) =>
                    (e.currentTarget.src = `${process.env.PUBLIC_URL}/images/placeholder.jpg`)
                  }
                />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                  {thesisProject.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 italic mb-4">
                  {thesisProject.category}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {thesisProject.description}
                </p>

                <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {asArr(thesisProject.highlights).map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-black dark:text-white mr-2 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {thesisProject.github && (
                  <div className="mt-4">
                    <a
                      href={thesisProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                    >
                      <Github className="h-4 w-4 mr-2" /> View Code
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* === Divider === */}
          <motion.hr
            variants={itemVariants}
            className="border-gray-300 dark:border-gray-700 mb-10"
          />

          {/* === Other Projects === */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
              Other Projects
            </h3>
            <p className="text-gray-600 dark:text-gray-400 italic mb-6">
              Personal Projects
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {otherProjects.map((proj, index) => (
                <Card
                  key={proj?.id ?? index}
                  className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={getImagePath(proj.image)}
                      alt={proj.title}
                      className="w-full h-full object-cover border-b border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-500"
                      onError={(e) =>
                        (e.currentTarget.src = `${process.env.PUBLIC_URL}/images/placeholder.jpg`)
                      }
                    />
                  </div>

                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-black dark:text-white mb-2">
                      {proj.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {proj.description}
                    </p>

                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {asArr(proj.highlights).map((hl, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-black dark:text-white mr-2 mt-1">•</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
