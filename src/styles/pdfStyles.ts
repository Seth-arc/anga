import { StyleSheet } from '@react-pdf/renderer';

export const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'OpenSans',
  },
  container: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Poppins',
    color: '#2E294E',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'Poppins',
    color: '#1B998B',
  },
  normalText: {
    fontSize: 12,
    marginBottom: 8,
    color: '#4A4E69',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  styleTitleText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#2E294E',
  },
  scoreText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#1B998B',
  },
  footerText: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 10,
    textAlign: 'center',
    color: '#4A4E69',
  },
  dividerLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginVertical: 15,
  },
});