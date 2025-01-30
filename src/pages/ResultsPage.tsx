import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import Button from '../components/Button';
import HexagonChart from '../components/HexagonChart';
import StyleStrengthsChart from '../components/StyleStrengthsChart';
import ResultsPDF from '../components/ResultsPDF';
import DownloadDialog from '../components/DownloadDialog';
import { useAssessment } from '../contexts/AssessmentContext';
import { useScoring } from '../hooks/useScoring';
import { ArrowDown } from 'lucide-react';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAssessment();
  const { results, mainStyle, orderedStyles, isComplete } = useScoring(state.answers);
  const [isClient, setIsClient] = useState(false);
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isComplete) {
      navigate('/assessment');
    }
  }, [isComplete, navigate]);

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

  if (!isComplete || !mainStyle) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cloud-white">
      <Container className="py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-poppins font-semibold text-deep-purple mb-4">
              Your Teaching Style Profile
            </h1>
            <p className="text-lg text-slate-grey">
              Based on the Staffordshire Evaluation of Teaching Styles (SETS)©
            </p>
          </motion.div>

          {/* Dominant Teaching Style Section */}
          <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-xl font-poppins font-semibold text-deep-purple mb-4">
              Your Dominant Teaching Style
            </h2>
            <div className="flex items-start gap-6">
              <div className="flex-grow">
                <h3 className="text-lg font-medium text-teal-blue mb-2">
                  {mainStyle.name}
                </h3>
                <p className="text-slate-grey mb-4">
                  {mainStyle.description}
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-semibold text-teal-blue">
                  {results[mainStyle.id]}%
                </span>
              </div>
            </div>
          </motion.div>

          {/* Visualization Charts Section */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-xl font-poppins font-semibold text-deep-purple mb-6">
                Teaching Style Hexagon
              </h2>
              <HexagonChart results={results} />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-xl font-poppins font-semibold text-deep-purple mb-6">
                Style Strengths
              </h2>
              <StyleStrengthsChart results={results} />
            </div>
          </motion.div>

          {/* Detailed Analysis Section */}
          <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-xl font-poppins font-semibold text-deep-purple mb-6">
              Your Teaching Style Profile
            </h2>
            {orderedStyles.map(style => (
              <div key={style.id} className="mb-6 last:mb-0">
                <h3 className="text-lg font-medium text-deep-purple mb-2">
                  {style.name} ({style.score}%)
                </h3>
                <p className="text-slate-grey">
                  {style.description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Download and Navigation Section */}
          <motion.div variants={itemVariants} className="flex justify-center items-center gap-4">
            {isClient && (
              <Button
                variant="primary"
                onClick={() => setIsDownloadDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <ArrowDown className="w-5 h-5" />
                Download PDF Report
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => navigate('/')}
            >
              Start New Assessment
            </Button>

            <DownloadDialog
              isOpen={isDownloadDialogOpen}
              onClose={() => setIsDownloadDialogOpen(false)}
              ResultsPDF={ResultsPDF}
              results={results}
              mainStyle={mainStyle}
              orderedStyles={orderedStyles}
            />
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default ResultsPage;