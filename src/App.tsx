import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage, WorksPage, ProjectPage, AboutPage, ContactPage, ArticlesPage, IllustrationsPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="work" element={<WorksPage />} />
          <Route path="work/:slug" element={<ProjectPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="illustrations" element={<IllustrationsPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
