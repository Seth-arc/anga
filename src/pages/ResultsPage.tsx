import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Container from '../components/Container';
import Button from '../components/Button';
import HexagonChart from '../components/HexagonChart';
import StyleStrengthsChart from '../components/StyleStrengthsChart';
import ShareButtons from '../components/ShareButtons';
import ResultsPDF from '../components/ResultsPDF';
import { useAssessment } from '../contexts/AssessmentContext';
import { useScoring } from '../hooks/useScoring';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

// This type definition specifies the exact structure of props that the PDFDownloadLink
// render function will receive. This ensures type safety when working with the PDF generation.
type PDFRenderFunctionProps = {
  loading: boolean;
  error: Error | null;
  blob: Blob | null;
  url: string | null;
}

// The ResultsPage component serves as the final step of the assessment process,
// displaying the user's teaching style profile and providing options for sharing
// and downloading the results
const ResultsPage: React.FC = () => {
  // Initialize necessary hooks for navigation and state management
  const navigate = useNavigate();
  const { state } = useAssessment();
  
  // Use our custom scoring hook to calculate and organize the results
  const { results, mainStyle, orderedStyles, isComplete } = useScoring(state.answers);
  
  // Track whether we're rendering on the client side for PDF generation
  const [isClient, setIsClient] = useState(false);

  // After the initial render, mark that we're on the client side
  // This is necessary because PDF generation requires browser APIs
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect to the assessment page if the user hasn't completed all questions
  useEffect(() => {
    if (!isComplete) {
      navigate('/assessment');
    }
  }, [isComplete, navigate]);

  // Define animation variants for smooth, staggered transitions
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

  // Return early if the assessment isn't complete or if we don't have style data
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

          {/* Share and Download Section */}
          <motion.div variants={itemVariants} className="text-center">
            <ShareButtons 
              mainStyleName={mainStyle.name} 
              className="mb-6"
            />
            
            {/* PDF Download Section - Only rendered on client side */}
            {isClient && (
  <PDFDownloadLink
    document={
      <ResultsPDF 
        results={results} 
        mainStyle={mainStyle} 
        orderedStyles={orderedStyles}
      />
    }
    fileName="teaching-style-profile.pdf"
    className="inline-block"
  >
    {function RenderPDFButton(props: PDFRenderFunctionProps) {
      return (
        <Button
          variant="primary"
          isLoading={props.loading}
          disabled={!!props.error}
          className="flex items-center gap-2"
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
          {props.loading ? 'Preparing PDF...' : 'Download PDF Report'}
        </Button>
      );
    }}
  </PDFDownloadLink>
)}

            {/* Navigation Button */}
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="mt-4 block mx-auto"
            >
              Start New Assessment
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default ResultsPage;