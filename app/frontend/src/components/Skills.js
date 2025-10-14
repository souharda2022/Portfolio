import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../contexts/PortfolioContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  Code,
  Palette,
  TestTube,
  Database,
  BarChart,
  Megaphone,
  Workflow,
  GitBranch
} from 'lucide-react';

const Skills = () => {
  const { portfolio, loading } = usePortfolio();

  // SAFETY: always have an object; unknown keys default to []
  const sk = portfolio?.skills ?? {};
  const asArr = (x) => (Array.isArray(x) ? x : []);

  if (loading) return null;

  const skillCategories = [
    { title: 'Design',            icon: Palette,   skills: asArr(sk.design),         color: 'from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900' },
    { title: 'Web Development',   icon: Code,      skills: asArr(sk.webDevelopment), color: 'from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800' },
    { title: 'Testing & QA',      icon: TestTube,  skills: asArr(sk.testing),        color: 'from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900' },
    { title: 'Programming',       icon: Database,  skills: asArr(sk.programming),    color: 'from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800' },
    { title: 'Analytics',         icon: BarChart,  skills: asArr(sk.analytics),      color: 'from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900' },
    { title: 'Marketing',         icon: Megaphone, skills: asArr(sk.marketing),      color: 'from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800' },
    { title: 'Automation & CRM',  icon: Workflow,  skills: asArr(sk.automation),     color: 'from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900' },
    { title: 'Dev Tools',         icon: GitBranch, skills: asArr(sk.devTools),       color: 'from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 text-center"
          >
            Skills & Expertise
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-black dark:bg-white mx-auto mb-16"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              const items = category.skills; // already guaranteed array
              return (
                <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.05 }}>
                  <Card className={`h-full bg-gradient-to-br ${category.color} border-2 border-gray-200 dark:border-gray-700`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-lg text-black dark:text-white">
                        <Icon className="h-5 w-5" />
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {items.length > 0 ? (
                          items.map((skill, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                            >
                              {skill}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500 dark:text-gray-400">No skills yet</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
