import pptxgen from 'pptxgenjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createPresentation() {
  const pptx = new pptxgen();

  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'AI Interview Pro Team';
  pptx.company = 'AI Interview Pro';
  pptx.title = 'AI Interview Pro - Platform Presentation';

  // Color Palette Theme (Dark Modern Blue & Purple)
  const BG_COLOR = '0B0F19';
  const CARD_BG = '111827';
  const ACCENT_BLUE = '3B82F6';
  const ACCENT_PURPLE = '8B5CF6';
  const ACCENT_PINK = 'EC4899';
  const TEXT_WHITE = 'F8FAFC';
  const TEXT_MUTED = '94A3B8';

  const addBackground = (slide) => {
    slide.background = { color: BG_COLOR };
  };

  const addHeader = (slide, titleText, categoryText) => {
    slide.addText(categoryText.toUpperCase(), {
      x: 0.8, y: 0.5, w: 10, h: 0.3,
      fontSize: 11, bold: true, color: ACCENT_PURPLE, fontFace: 'Arial'
    });
    slide.addText(titleText, {
      x: 0.8, y: 0.8, w: 11, h: 0.6,
      fontSize: 24, bold: true, color: TEXT_WHITE, fontFace: 'Arial'
    });
  };

  // SLIDE 1: Title Slide
  const slide1 = pptx.addSlide();
  addBackground(slide1);
  
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8, y: 1.5, w: 11.7, h: 4.5,
    fill: { color: CARD_BG }, line: { color: '1F2937', width: 1.5 }
  });

  slide1.addText('AI INTERVIEW PRO', {
    x: 1.2, y: 2.2, w: 10, h: 0.8,
    fontSize: 40, bold: true, color: ACCENT_BLUE, fontFace: 'Arial'
  });
  slide1.addText('Next-Generation Production MERN Stack AI Mock Interview Platform', {
    x: 1.2, y: 3.1, w: 10, h: 0.5,
    fontSize: 18, color: TEXT_WHITE, fontFace: 'Arial'
  });
  slide1.addText('Real-Time Voice Assistant • Monaco Coding Lab • Radar Metrics • Resume Skill Scanner • FAANG Tracks', {
    x: 1.2, y: 3.8, w: 10, h: 0.5,
    fontSize: 12, color: TEXT_MUTED, fontFace: 'Arial'
  });
  slide1.addText('Full-Stack Architectural Overview & Project Presentation', {
    x: 1.2, y: 5.0, w: 10, h: 0.4,
    fontSize: 12, bold: true, color: ACCENT_PURPLE, fontFace: 'Arial'
  });

  // SLIDE 2: Problem Statement & Solution
  const slide2 = pptx.addSlide();
  addBackground(slide2);
  addHeader(slide2, 'Problem Statement & Platform Solution', 'Executive Overview');

  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8, y: 1.6, w: 5.6, h: 4.8,
    fill: { color: CARD_BG }, line: { color: 'EF4444', width: 1 }
  });
  slide2.addText('The Traditional Problem', {
    x: 1.1, y: 1.9, w: 5, h: 0.4,
    fontSize: 16, bold: true, color: 'FCA5A5', fontFace: 'Arial'
  });
  slide2.addText('• High Cost & Unavailability of Human Mock Interviewers\n• Static Q&A Platforms Lack Real Voice Communication Practice\n• No Instant Automated Evaluation of Verbal Confidence & Clarity\n• Coding Practice Detached from Verbal Technical Explanation', {
    x: 1.1, y: 2.5, w: 5, h: 3.5,
    fontSize: 12, color: TEXT_MUTED, fontFace: 'Arial', lineSpacing: 22
  });

  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 6.8, y: 1.6, w: 5.7, h: 4.8,
    fill: { color: CARD_BG }, line: { color: '10B981', width: 1 }
  });
  slide2.addText('The AI Interview Pro Solution', {
    x: 7.1, y: 1.9, w: 5, h: 0.4,
    fontSize: 16, bold: true, color: '6EE7B7', fontFace: 'Arial'
  });
  slide2.addText('• 24/7 AI Voice Evaluator (Web Speech API STT/TTS)\n• Integrated Monaco Code Editor for Live Algorithm Rounds\n• 6-Point Radar Metrics (Communication, Technical Depth, Confidence)\n• Tailored Resume Skill Scanner & Top FAANG Track Modules', {
    x: 7.1, y: 2.5, w: 5, h: 3.5,
    fontSize: 12, color: TEXT_WHITE, fontFace: 'Arial', lineSpacing: 22
  });

  // SLIDE 3: Tech Stack & Architecture
  const slide3 = pptx.addSlide();
  addBackground(slide3);
  addHeader(slide3, 'Full-Stack MERN Architecture', 'System Design');

  const stackItems = [
    { title: 'Frontend Layer', desc: 'React.js (Vite), Tailwind CSS, Framer Motion, Recharts, @monaco-editor/react, Lucide Icons' },
    { title: 'Backend Layer', desc: 'Node.js, Express.js (MVC), JWT Security, Helmet, Express Rate Limit, Multer, Nodemailer' },
    { title: 'Database & Cloud', desc: 'MongoDB Atlas & Mongoose Schemas (User, Interview, Answer, Report, Coding, Payment)' },
    { title: 'AI & Services', desc: 'OpenAI GPT API, Web Speech API (STT/TTS), PDF Generator Engine, Stripe Payments' }
  ];

  stackItems.forEach((item, idx) => {
    const xPos = 0.8 + (idx % 2) * 6.0;
    const yPos = 1.6 + Math.floor(idx / 2) * 2.5;

    slide3.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: yPos, w: 5.6, h: 2.2,
      fill: { color: CARD_BG }, line: { color: ACCENT_PURPLE, width: 1 }
    });
    slide3.addText(item.title, {
      x: xPos + 0.3, y: yPos + 0.3, w: 5, h: 0.3,
      fontSize: 16, bold: true, color: ACCENT_BLUE, fontFace: 'Arial'
    });
    slide3.addText(item.desc, {
      x: xPos + 0.3, y: yPos + 0.7, w: 5, h: 1.2,
      fontSize: 12, color: TEXT_MUTED, fontFace: 'Arial', lineSpacing: 18
    });
  });

  // SLIDE 4: 17+ Core Feature Stack
  const slide4 = pptx.addSlide();
  addBackground(slide4);
  addHeader(slide4, 'Comprehensive Feature Ecosystem (17 Sections)', 'Platform Capabilities');

  const features = [
    'JWT & Google OAuth Auth', 'Interactive AI Dashboard', '18 Interview Categories',
    'Custom Difficulty & Duration', 'Voice STT & TTS Engine', '6-Point Radar Metrics',
    'Printable PDF Reports', 'Resume Skill Extractor', '10 FAANG Company Tracks',
    'Monaco Code Editor', 'Hidden Test Cases Runner', 'AI Code Complexity Analysis',
    'Admin Command Panel', 'Stripe Billing Integration', 'Leaderboards & Badges'
  ];

  features.forEach((feat, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const xPos = 0.8 + col * 4.0;
    const yPos = 1.6 + row * 0.9;

    slide4.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: yPos, w: 3.7, h: 0.7,
      fill: { color: CARD_BG }, line: { color: '1F2937', width: 1 }
    });
    slide4.addText(`✓  ${feat}`, {
      x: xPos + 0.2, y: yPos + 0.2, w: 3.3, h: 0.3,
      fontSize: 11, bold: true, color: TEXT_WHITE, fontFace: 'Arial'
    });
  });

  // SLIDE 5: AI Voice & Speech Engine
  const slide5 = pptx.addSlide();
  addBackground(slide5);
  addHeader(slide5, 'AI Voice & Speech Recognition Engine', 'Core Innovation');

  slide5.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8, y: 1.6, w: 11.7, h: 4.8,
    fill: { color: CARD_BG }, line: { color: ACCENT_BLUE, width: 1 }
  });
  slide5.addText('Real-Time Voice Assistant Architecture', {
    x: 1.2, y: 1.9, w: 10, h: 0.4,
    fontSize: 18, bold: true, color: ACCENT_BLUE, fontFace: 'Arial'
  });
  slide5.addText('1. Text-to-Speech (TTS): AI interviewer speaks questions aloud with custom pitch & rate controls.\n2. Speech-to-Text (STT): WebSpeech API captures candidate microphone audio and converts it to continuous transcript.\n3. Question Timer Ring: 120-second dynamic timer per question with Skip, Repeat, and End actions.\n4. Real-time Audio Wave Visualizer: Provides responsive visual feedback while candidate or AI is speaking.', {
    x: 1.2, y: 2.6, w: 10.5, h: 3.2,
    fontSize: 13, color: TEXT_WHITE, fontFace: 'Arial', lineSpacing: 26
  });

  // SLIDE 6: Monaco Coding Sandbox
  const slide6 = pptx.addSlide();
  addBackground(slide6);
  addHeader(slide6, 'Live Monaco Code Sandbox & AI Analysis', 'Coding Lab');

  slide6.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8, y: 1.6, w: 5.6, h: 4.8,
    fill: { color: CARD_BG }, line: { color: '1F2937', width: 1 }
  });
  slide6.addText('Integrated Monaco IDE Features', {
    x: 1.1, y: 1.9, w: 5, h: 0.4,
    fontSize: 16, bold: true, color: ACCENT_BLUE, fontFace: 'Arial'
  });
  slide6.addText('• Supports JavaScript, Python, C++, and Java\n• Real-Time Test Case Execution Runner\n• Execution Time (ms) & Memory Usage (MB)\n• Syntax Highlighting & VS Dark Theme', {
    x: 1.1, y: 2.5, w: 5, h: 3.5,
    fontSize: 12, color: TEXT_WHITE, fontFace: 'Arial', lineSpacing: 22
  });

  slide6.addShape(pptx.shapes.RECTANGLE, {
    x: 6.8, y: 1.6, w: 5.7, h: 4.8,
    fill: { color: CARD_BG }, line: { color: ACCENT_PURPLE, width: 1 }
  });
  slide6.addText('AI Code Optimization Feedback', {
    x: 7.1, y: 1.9, w: 5, h: 0.4,
    fontSize: 16, bold: true, color: ACCENT_PURPLE, fontFace: 'Arial'
  });
  slide6.addText('• Automated Time Complexity Evaluation (O(N))\n• Auxiliary Space Complexity Calculation\n• Modular Code Quality Rating & Clean Tips\n• Optimized Alternative Solution Snippets', {
    x: 7.1, y: 2.5, w: 5, h: 3.5,
    fontSize: 12, color: TEXT_WHITE, fontFace: 'Arial', lineSpacing: 22
  });

  // SLIDE 7: Radar Metrics & Evaluation
  const slide7 = pptx.addSlide();
  addBackground(slide7);
  addHeader(slide7, '6-Point Radar Metrics Evaluation', 'Performance Scoring');

  const metrics = [
    { name: 'Communication', desc: 'Clarity, speech pace, and structured delivery' },
    { name: 'Confidence', desc: 'Vocal firmness and composure under pressure' },
    { name: 'Technical Depth', desc: 'Accuracy of domain concepts and trade-offs' },
    { name: 'Problem Solving', desc: 'Logical framework & edge-case consideration' },
    { name: 'Vocabulary', desc: 'Use of precise industry terminology' },
    { name: 'Grammar', desc: 'Syntactical correctness in verbal answers' }
  ];

  metrics.forEach((m, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const xPos = 0.8 + col * 6.0;
    const yPos = 1.6 + row * 1.6;

    slide7.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: yPos, w: 5.6, h: 1.3,
      fill: { color: CARD_BG }, line: { color: ACCENT_BLUE, width: 1 }
    });
    slide7.addText(m.name, {
      x: xPos + 0.3, y: yPos + 0.2, w: 5, h: 0.3,
      fontSize: 14, bold: true, color: ACCENT_BLUE, fontFace: 'Arial'
    });
    slide7.addText(m.desc, {
      x: xPos + 0.3, y: yPos + 0.6, w: 5, h: 0.5,
      fontSize: 11, color: TEXT_MUTED, fontFace: 'Arial'
    });
  });

  // SLIDE 8: Resume Skill Extractor
  const slide8 = pptx.addSlide();
  addBackground(slide8);
  addHeader(slide8, 'Resume Skill Scanner & Custom Interview', 'Smart Personalization');

  slide8.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8, y: 1.6, w: 11.7, h: 4.8,
    fill: { color: CARD_BG }, line: { color: '1F2937', width: 1 }
  });
  slide8.addText('Automated Resume Scanning Pipeline', {
    x: 1.2, y: 1.9, w: 10, h: 0.4,
    fontSize: 18, bold: true, color: ACCENT_PURPLE, fontFace: 'Arial'
  });
  slide8.addText('1. Candidate Uploads Resume PDF or Pastes Text Summary\n2. AI Skill Extraction Engine identifies key tech stack keywords (React, Node.js, MongoDB, Python, Docker)\n3. Custom Interview Question Generator creates 5 targeted questions based on candidate exact background\n4. Direct launch into AI Voice Interview Room tailored to resume experience', {
    x: 1.2, y: 2.6, w: 10.5, h: 3.2,
    fontSize: 13, color: TEXT_WHITE, fontFace: 'Arial', lineSpacing: 26
  });

  // SLIDE 9: Company Interview Tracks
  const slide9 = pptx.addSlide();
  addBackground(slide9);
  addHeader(slide9, 'Top FAANG Company Interview Modules', 'Company Practice');

  const companies = ['Google', 'Amazon', 'Microsoft', 'Meta', 'Netflix', 'Adobe', 'Apple', 'Uber', 'LinkedIn', 'OpenAI'];

  companies.forEach((comp, idx) => {
    const col = idx % 5;
    const row = Math.floor(idx / 5);
    const xPos = 0.8 + col * 2.4;
    const yPos = 1.8 + row * 2.3;

    slide9.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: yPos, w: 2.1, h: 2.0,
      fill: { color: CARD_BG }, line: { color: ACCENT_BLUE, width: 1 }
    });
    slide9.addText(comp, {
      x: xPos + 0.1, y: yPos + 0.4, w: 1.9, h: 0.4,
      fontSize: 16, bold: true, color: TEXT_WHITE, fontFace: 'Arial', align: 'center'
    });
    slide9.addText('Hard Round\nTailored Track', {
      x: xPos + 0.1, y: yPos + 1.0, w: 1.9, h: 0.6,
      fontSize: 10, color: ACCENT_PURPLE, fontFace: 'Arial', align: 'center'
    });
  });

  // SLIDE 10: Admin Control & Business Intelligence
  const slide10 = pptx.addSlide();
  addBackground(slide10);
  addHeader(slide10, 'Admin Control Panel & Business Intelligence', 'Platform Governance');

  slide10.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8, y: 1.6, w: 11.7, h: 4.8,
    fill: { color: CARD_BG }, line: { color: '1F2937', width: 1 }
  });
  slide10.addText('Platform Governance Features', {
    x: 1.2, y: 1.9, w: 10, h: 0.4,
    fontSize: 18, bold: true, color: ACCENT_BLUE, fontFace: 'Arial'
  });
  slide10.addText('• User Management Suite: View registered candidates, role assignments (User/Admin), and active subscriptions.\n• Delete User Capabilities: Administrative security controls for platform moderation.\n• Revenue Dashboard: Visual bar chart metrics tracking monthly subscription earnings ($).\n• System Analytics: Total interviews completed, total questions answered, and growth rates.', {
    x: 1.2, y: 2.6, w: 10.5, h: 3.2,
    fontSize: 13, color: TEXT_WHITE, fontFace: 'Arial', lineSpacing: 26
  });

  // SLIDE 11: Monetization & Stripe Billing
  const slide11 = pptx.addSlide();
  addBackground(slide11);
  addHeader(slide11, 'Monetization & Stripe Billing Models', 'Business Model');

  const plans = [
    { title: 'Starter Free', price: '$0 / mo', desc: '2 AI Mock Interviews / month\nBasic Score Overview' },
    { title: 'Pro Unlimited', price: '$19 / mo', desc: 'Unlimited AI Voice Rounds\nMonaco Code Sandbox\nAll 10 FAANG Tracks\nPDF Reports Download' },
    { title: 'Enterprise Teams', price: '$49 / mo', desc: 'Bootcamp & Team Accounts\nDedicated Account Manager\nTeam Progress Analytics' }
  ];

  plans.forEach((p, idx) => {
    const xPos = 0.8 + idx * 4.0;
    slide11.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: 1.6, w: 3.7, h: 4.8,
      fill: { color: CARD_BG }, line: { color: idx === 1 ? ACCENT_PURPLE : '1F2937', width: idx === 1 ? 2 : 1 }
    });
    slide11.addText(p.title, {
      x: xPos + 0.3, y: 1.9, w: 3.1, h: 0.4,
      fontSize: 18, bold: true, color: idx === 1 ? ACCENT_PURPLE : TEXT_WHITE, fontFace: 'Arial'
    });
    slide11.addText(p.price, {
      x: xPos + 0.3, y: 2.4, w: 3.1, h: 0.5,
      fontSize: 22, bold: true, color: ACCENT_BLUE, fontFace: 'Arial'
    });
    slide11.addText(p.desc, {
      x: xPos + 0.3, y: 3.1, w: 3.1, h: 2.8,
      fontSize: 12, color: TEXT_MUTED, fontFace: 'Arial', lineSpacing: 20
    });
  });

  // SLIDE 12: Conclusion & Access
  const slide12 = pptx.addSlide();
  addBackground(slide12);

  slide12.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8, y: 1.2, w: 11.7, h: 5.0,
    fill: { color: CARD_BG }, line: { color: ACCENT_PURPLE, width: 1.5 }
  });

  slide12.addText('Thank You!', {
    x: 1.2, y: 1.8, w: 10, h: 0.8,
    fontSize: 44, bold: true, color: ACCENT_BLUE, fontFace: 'Arial'
  });
  slide12.addText('AI Interview Pro is Ready for Production & Local Access', {
    x: 1.2, y: 2.8, w: 10, h: 0.5,
    fontSize: 18, color: TEXT_WHITE, fontFace: 'Arial'
  });
  slide12.addText('• Localhost Access: http://localhost:3000\n• Backend API Endpoint: http://localhost:5000\n• Render Blueprint Deployment: 1-Click render.yaml ready', {
    x: 1.2, y: 3.6, w: 10, h: 1.8,
    fontSize: 14, color: TEXT_MUTED, fontFace: 'Arial', lineSpacing: 26
  });

  const outputPath = path.join(__dirname, '../AI_Interview_Pro_Presentation.pptx');
  await pptx.writeFile({ fileName: outputPath });
  console.log(`PowerPoint Presentation generated successfully at: ${outputPath}`);
}

createPresentation().catch(err => {
  console.error('Error generating PPT:', err);
});
