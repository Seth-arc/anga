import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Container from '../components/Container';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-cloud-white flex flex-col">
      <Container className="flex-grow flex flex-col">
        {/* Main content section */}
        <motion.main 
          className="flex-grow flex items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-3xl text-center px-4">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-poppins font-semibold text-deep-purple mb-6"
              variants={itemVariants}
            >
              How Do You Teach?
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-slate-grey mb-8"
              variants={itemVariants}
            >
              Discover your teaching style, understand your pedagogical strengths and prioritize areas for growth through the Staffordshire Evaluation of 
              Teaching Styles (SETS)©.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <Button 
                size="large"
                onClick={() => navigate('/assessment')}
                className="w-full sm:w-auto"
              >
                Begin Assessment
              </Button>
            </motion.div>

            <motion.p 
              className="mt-6 text-sm text-slate-grey"
              variants={itemVariants}
            >
              Takes approximately 15-20 minutes to complete.
            </motion.p>
          </div>
        </motion.main>
      </Container>

      {/* Footer with attribution */}
      <footer className="py-4 bg-deep-purple text-cloud-white mt-auto">
        <Container>
          <p className="text-sm text-center">
            © 2025 Developed by Sethu Nguna. Based on SETS© by Mohanna, Chambers & Wall (2007)
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;