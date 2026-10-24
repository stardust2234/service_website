import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import ScrollToTop from "./ScrollToTop";
const Index = lazy(() => import("@/pages/Index"));
const LegalPage = lazy(() => import("@/pages/LegalPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Career = lazy(() => import("@/pages/Career"));
const Articles = lazy(() => import("@/pages/Articles"));
const Article = lazy(() => import("@/pages/Article"));
const Tools = lazy(() => import("@/pages/Tools"));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
      <Suspense fallback={<div className="min-h-screen bg-background" aria-label="Loading page" />}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route path="/articles" element={<PageTransition><Articles /></PageTransition>} />
        <Route path="/articles/:slug" element={<PageTransition><Article /></PageTransition>} />
        <Route
          path="/cookie-policy"
          element={
            <PageTransition>
              <LegalPage documentKey="cookies" />
            </PageTransition>
          }
        />
        <Route
          path="/terms"
          element={
            <PageTransition>
              <LegalPage documentKey="terms" />
            </PageTransition>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <PageTransition>
              <LegalPage documentKey="privacy" />
            </PageTransition>
          }
        />
        <Route
          path="/career"
          element={
            <PageTransition>
              <Career />
            </PageTransition>
          }
        />
        <Route
          path="/tools"
          element={
            <PageTransition>
              <Tools />
            </PageTransition>
          }
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
      </Suspense>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;
