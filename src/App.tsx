import { Routes, Route } from "react-router-dom";

import "/src/styles/admin.css";
import "/src/styles/dashboard.css";

import BackToTop from "./components/BackToTop";
import { ScrollToTop } from "./components/ScrollToTop";

import Home from "./pages/Home";
import Trails from "./pages/Trails";
import Events from "./pages/Events";
import About from "./pages/About";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Course from "./pages/Course";

import AdminMain from "./components/Administrator/AdminMain";
import DashMain from "./components/Dashboard/DashMain";

import ForgotPassword from "./components/Login/ForgotPassword";
import ResetPassword from "./components/Login/ResetPassword";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <ScrollToTop />

      <Routes>
        {/* =========================
            ROTAS PÚBLICAS FIXAS
        ========================= */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/trilhas" element={<Trails />} />
        <Route path="/eventos" element={<Events />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/suporte" element={<Support />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />

        {/* =========================
            AUTENTICAÇÃO
        ========================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/* =========================
            ÁREAS PROTEGIDAS
        ========================= */}
        <Route path="/dashboard" element={<DashMain />} />
        <Route path="/admin" element={<AdminMain />} />

        {/* =========================
            CURSOS
        ========================= */}
        <Route path="/cursos/:id" element={<Course />} />

        {/* =========================
            STORYBLOK PREVIEW (SLUG DINÂMICO)
            IMPORTANTE: vem ANTES do *
        ========================= */}
        <Route path="/:slug" element={<Home />} />

        {/* =========================
            NOT FOUND
        ========================= */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Botão Voltar ao Topo Global */}
      <BackToTop />
    </div>
  );
}

export default App;
