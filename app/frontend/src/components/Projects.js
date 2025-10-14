import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

const asArr = (x) => (Array.isArray(x) ? x : []);

const Projects = () => {
  const { portfolio, loading } = usePortfolio();
  const projects = asArr(portfolio?.projects);
  const [selectedProject, setSelectedProject] = useState(null);

  if (loading) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-black">
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
            Featured Projects
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-black dark:bg-white mx-auto mb-16"
          />

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => {
              const techs = asArr(project?.technologies);
              const highlights = asArr(project?.highlights);
              const img = project?.image || '';
              const title = project?.title || 'Untitled Project';
              const category = project?.category || 'Project';
              const description = project?.description || '';
              const github = project?.github || '';
              const demo = project?.demo || '';

              return (
                <motion.div key={project?.id ?? i} variants={itemVariants} whileHover={{ y: -10 }}>
                  <Card
                    className="h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-700 overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedProject({ ...project, technologies: techs, highlights })}
                  >
                    <div className="relative overflow-hidden h-48">
                      {/* image is optional */}
                      {img ? (
                        <img
                          src={img}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                          No image
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 text-black dark:text-white">
                        {category}
                      </Badge>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                        {title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {techs.slice(0, 3).map((tech, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {techs.length > 3 && (
                          <Badge
                            variant="outline"
                            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                          >
                            +{techs.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (github) window.open(github, '_blank');
                          }}
                          disabled={!github}
                          title={github ? 'View code' : 'No repository link'}
                        >
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </Button>
                        <Button
                          size="sm"
                          className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (demo) window.open(demo, '_blank');
                          }}
                          disabled={!demo}
                          title={demo ? 'Open demo' : 'No demo link'}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Demo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-black dark:text-white">
                  {selectedProject.title || 'Untitled Project'}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title || 'Project'}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : null}

                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedProject.description || '—'}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                    Key Highlights
                  </h3>
                  <ul className="space-y-2">
                    {asArr(selectedProject.highlights).length
                      ? asArr(selectedProject.highlights).map((highlight, idx) => (
                          <li key={idx} className="flex items-start text-gray-600 dark:text-gray-400">
                            <span className="text-black dark:text-white mr-2">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))
                      : <li className="text-gray-500 dark:text-gray-400">—</li>}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {asArr(selectedProject.technologies).length
                      ? asArr(selectedProject.technologies).map((tech, idx) => (
                          <Badge key={idx} className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
                            {tech}
                          </Badge>
                        ))
                      : <span className="text-gray-500 dark:text-gray-400">—</span>}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                    onClick={() => selectedProject.github && window.open(selectedProject.github, '_blank')}
                    disabled={!selectedProject.github}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </Button>
                  <Button
                    className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                    onClick={() => selectedProject.demo && window.open(selectedProject.demo, '_blank')}
                    disabled={!selectedProject.demo}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
