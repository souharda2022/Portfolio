import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Calendar, MapPin } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const asArr = (x) => (Array.isArray(x) ? x : []);

const Education = () => {
  const { portfolio, loading } = usePortfolio();
  const education = portfolio?.education ?? {};

  if (loading) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const degree = education?.degree || 'Degree';
  const institution = education?.institution || '';
  const duration = education?.duration || '';
  const location = education?.location || '';
  const coursework = asArr(education?.coursework);

  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 text-center"
          >
            Education
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-black dark:bg-white mx-auto mb-16"
          />

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-700">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-black dark:bg-white rounded-lg">
                    <GraduationCap className="h-8 w-8 text-white dark:text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                      {degree}
                    </h3>
                    {institution && (
                      <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
                        {institution}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
                      {duration && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{duration}</span>
                        </div>
                      )}
                      {location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-5 w-5 text-black dark:text-white" />
                    <h4 className="text-lg font-semibold text-black dark:text-white">
                      Key Coursework
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {coursework.length ? (
                      coursework.map((course, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                        >
                          {course}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400">—</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
