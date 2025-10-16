import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { contactAPI } from '../services/api';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const { portfolio, loading } = usePortfolio();
  const personalInfo = portfolio?.personal_info ?? {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  if (loading) return null;

  const handleChange = (e) => {
    const { name, value } = e.target || {};
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await contactAPI.submitContact(formData); // static: Formspree, dev: backend
      toast({
        title: 'Message Sent!',
        description:
          res?.message ||
          "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast({
        title: 'Error',
        description:
          err?.message ||
          'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const email = personalInfo.email || '';
  const phone = personalInfo.phone || '';
  const location = personalInfo.location || '';
  const github = personalInfo.github || '';
  const linkedin = personalInfo.linkedin || '';

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
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
            Get In Touch
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-black dark:bg-white mx-auto mb-16"
          />

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                  Let's Connect
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
              </div>

              <div className="space-y-4">
                <Card className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 bg-black dark:bg-white rounded-lg">
                      <Mail className="h-5 w-5 text-white dark:text-black" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      {email ? (
                        <a href={`mailto:${email}`} className="text-black dark:text-white hover:underline">
                          {email}
                        </a>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">—</span>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 bg-black dark:bg-white rounded-lg">
                      <Phone className="h-5 w-5 text-white dark:text-black" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      {phone ? (
                        <a href={`tel:${phone}`} className="text-black dark:text-white hover:underline">
                          {phone}
                        </a>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">—</span>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 bg-black dark:bg-white rounded-lg">
                      <MapPin className="h-5 w-5 text-white dark:text-black" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="text-black dark:text-white">{location || '—'}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4 pt-4">
                {github ? (
                  <motion.a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="p-3 bg-black dark:bg-white rounded-lg text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    title="GitHub"
                  >
                    <Github className="h-6 w-6" />
                  </motion.a>
                ) : null}
                {linkedin ? (
                  <motion.a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="p-3 bg-black dark:bg-white rounded-lg text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-6 w-6" />
                  </motion.a>
                ) : null}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white"
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white"
                      />
                    </div>
                    <div>
                      <Input
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white"
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
                      size="lg"
                      disabled={submitting}
                    >
                      <Send className="mr-2 h-5 w-5" />
                      {submitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
