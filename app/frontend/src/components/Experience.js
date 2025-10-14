import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { Card, CardContent } from './ui/card';

const asArr = (x) => (Array.isArray(x) ? x : []);

const Experience = () => {
  const { portfolio, loading } = usePortfolio();
  const experience = asArr(portfolio?.experience);

  if (loading) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 text-center"
          >
            Experience
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-black dark:bg-white mx-auto mb-16"
          />

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700" />

            {experience.length === 0 ? (
              <div className="ml-16 md:ml-0 text-center text-gray-500 dark:text-gray-400">
                No experience added yet
              </div>
            ) : (
              experience.map((exp, index) => {
                const title = exp?.title || 'Role';
                const company = exp?.company || '';
                const duration = exp?.duration || '';
                const type = exp?.type || '';
                const highlights = asArr(exp?.highlights);

                return (
                  <motion.div
                    key={exp?.id ?? index}
                    variants={itemVariants}
                    className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'}`}
                  >
                    <div className="flex items-center mb-4">
                      <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-black dark:bg-white rounded-full transform -translate-x-1/2 z-10" />
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} className="ml-16 md:ml-0">
                      <Card className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                                {title}
                              </h3>
                              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                                <Briefcase className="h-4 w-4" />
                                <span className="font-medium">{company}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                            {duration && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{duration}</span>
                              </div>
                            )}
                            {type && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{type}</span>
                              </div>
                            )}
                          </div>

                          <ul className="space-y-2">
                            {highlights.length ? (
                              highlights.map((hl, idx) => (
                                <li key={idx} className="flex items-start text-gray-600 dark:text-gray-400 text-sm">
                                  <span className="text-black dark:text-white mr-2 mt-1">•</span>
                                  <span>{hl}</span>
                                </li>
                              ))
                            ) : (
                              <li className="text-gray-500 dark:text-gray-400 text-sm">—</li>
                            )}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
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
