export const generateReportPDF = async (reportData, userName) => {
  // Generates a mock/structured PDF text stream / HTML string suitable for client download
  return {
    title: `AI Interview Pro Performance Report - ${userName}`,
    date: new Date().toISOString(),
    overallScore: reportData.overallScore,
    percentage: reportData.percentage,
    metrics: reportData.metrics,
    strengths: reportData.strengths,
    weaknesses: reportData.weaknesses,
    suggestions: reportData.suggestions,
    contentSummary: `This is an official AI Interview Pro evaluation report for ${userName}.`
  };
};
