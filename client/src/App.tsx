import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Lazy-loaded pages for optimal bundle splitting
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Builds = lazy(() => import('./pages/Builds').then(m => ({ default: m.Builds })));
const BuildDetail = lazy(() => import('./pages/BuildDetail').then(m => ({ default: m.BuildDetail })));
const Events = lazy(() => import('./pages/Events').then(m => ({ default: m.Events })));
const EventDetail = lazy(() => import('./pages/EventDetail').then(m => ({ default: m.EventDetail })));
const Lab = lazy(() => import('./pages/Lab').then(m => ({ default: m.Lab })));
const LabArticle = lazy(() => import('./pages/LabArticle').then(m => ({ default: m.LabArticle })));
const Team = lazy(() => import('./pages/Team').then(m => ({ default: m.Team })));
const Gallery = lazy(() => import('./pages/Gallery').then(m => ({ default: m.Gallery })));
const Achievements = lazy(() => import('./pages/Achievements').then(m => ({ default: m.Achievements })));
const News = lazy(() => import('./pages/News').then(m => ({ default: m.News })));
const NewsArticle = lazy(() => import('./pages/NewsArticle').then(m => ({ default: m.NewsArticle })));
const Join = lazy(() => import('./pages/Join').then(m => ({ default: m.Join })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-rtist-bg flex flex-col items-center justify-center p-4">
      <div className="w-10 h-10 border-2 border-rtist-accent border-t-transparent animate-spin mb-4" />
      <div className="font-mono text-xs text-rtist-accent tracking-widest uppercase">
        INITIALIZING RTIST TELEMETRY NODE...
      </div>
    </div>
  );
}

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-rtist-bg text-rtist-text flex flex-col selection:bg-rtist-accent selection:text-white">
        <Navbar />
        <div className="flex-1">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/builds" element={<Builds />} />
              <Route path="/builds/:slug" element={<BuildDetail />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:slug" element={<EventDetail />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/lab/:category/:slug" element={<LabArticle />} />
              <Route path="/team" element={<Team />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<NewsArticle />} />
              <Route path="/join" element={<Join />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
