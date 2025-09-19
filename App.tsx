import { useState, Suspense, lazy, memo } from "react";
import { Toaster } from "./components/ui/sonner";
import { CustomCursor } from "./components/CustomCursor";
import { CookieConsent } from "./components/CookieConsent";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeaturedReviews } from "./components/FeaturedReviews";
import { Categories } from "./components/Categories";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";

// Lazy load heavy components to improve initial load time
const SmartphonesPage = lazy(() => import("./components/SmartphonesPage").then(m => ({ default: m.SmartphonesPage })));
const LaptopsPage = lazy(() => import("./components/LaptopsPage").then(m => ({ default: m.LaptopsPage })));
const AudioPage = lazy(() => import("./components/AudioPage").then(m => ({ default: m.AudioPage })));
const WearablesPage = lazy(() => import("./components/WearablesPage").then(m => ({ default: m.WearablesPage })));
const GamingPage = lazy(() => import("./components/GamingPage").then(m => ({ default: m.GamingPage })));
const CamerasPage = lazy(() => import("./components/CamerasPage").then(m => ({ default: m.CamerasPage })));
const TabletsPage = lazy(() => import("./components/TabletsPage").then(m => ({ default: m.TabletsPage })));
const SmartHomePage = lazy(() => import("./components/SmartHomePage").then(m => ({ default: m.SmartHomePage })));
const AboutPage = lazy(() => import("./components/AboutPage").then(m => ({ default: m.AboutPage })));
const NewsPage = lazy(() => import("./components/NewsPage").then(m => ({ default: m.NewsPage })));
const BuyingGuidesPage = lazy(() => import("./components/BuyingGuidesPage").then(m => ({ default: m.BuyingGuidesPage })));
const ContactPage = lazy(() => import("./components/ContactPage").then(m => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import("./components/PrivacyPage").then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import("./components/TermsPage").then(m => ({ default: m.TermsPage })));
const SearchPage = lazy(() => import("./components/SearchPage").then(m => ({ default: m.SearchPage })));
const ReviewPage = lazy(() => import("./components/ReviewPage").then(m => ({ default: m.ReviewPage })));
const NotFoundPage = lazy(() => import("./components/NotFoundPage").then(m => ({ default: m.NotFoundPage })));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Memoized home page component
const HomePage = memo(({ onNavigate, onSearch, onViewReview }: {
  onNavigate: (page: string) => void;
  onSearch: (query: string) => void;
  onViewReview: (id: string) => void;
}) => (
  <>
    <Header 
      onNavigate={onNavigate} 
      onSearch={onSearch}
    />
    <main>
      <Hero onNavigate={onNavigate} />
      <FeaturedReviews 
        onNavigate={onNavigate}
        onViewReview={onViewReview}
      />
      <Categories onNavigate={onNavigate} />
      <Newsletter />
    </main>
    <Footer onNavigate={onNavigate} />
  </>
));

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [reviewId, setReviewId] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage("search");
  };

  const handleViewReview = (id: string) => {
    setReviewId(id);
    setCurrentPage("review");
  };

  const goHome = () => setCurrentPage("home");

  // Route to different pages
  return (
    <div className="min-h-screen bg-background relative">
      <CustomCursor />
      <CookieConsent />
      <Toaster />
      <Suspense fallback={<PageLoader />}>
        {(() => {
          switch (currentPage) {
            case "smartphones":
              return <SmartphonesPage onBack={goHome} />;
            case "laptops":
              return <LaptopsPage onBack={goHome} />;
            case "audio":
              return <AudioPage onBack={goHome} />;
            case "wearables":
              return <WearablesPage onBack={goHome} />;
            case "gaming":
              return <GamingPage onBack={goHome} />;
            case "cameras":
              return <CamerasPage onBack={goHome} />;
            case "tablets":
              return <TabletsPage onBack={goHome} />;
            case "smarthome":
              return <SmartHomePage onBack={goHome} />;
            case "about":
              return <AboutPage onBack={goHome} />;
            case "news":
              return <NewsPage onBack={goHome} />;
            case "buyingguides":
              return <BuyingGuidesPage onBack={goHome} />;
            case "contact":
              return <ContactPage onBack={goHome} />;
            case "privacy":
              return <PrivacyPage onBack={goHome} />;
            case "terms":
              return <TermsPage onBack={goHome} />;
            case "search":
              return <SearchPage onBack={goHome} initialQuery={searchQuery} />;
            case "review":
              return <ReviewPage onBack={goHome} productId={reviewId} />;
            case "404":
              return <NotFoundPage onBack={goHome} onNavigate={setCurrentPage} />;
            default:
              return (
                <HomePage 
                  onNavigate={setCurrentPage}
                  onSearch={handleSearch}
                  onViewReview={handleViewReview}
                />
              );
          }
        })()}
      </Suspense>
    </div>
  );
}