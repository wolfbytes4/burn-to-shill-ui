// Dependencies
import { Routes, Route } from "react-router-dom";

// Components
import ScrollerComponent from "./components/ScrollerComponent";
import NavigationBarComponent from "./components/NavigationBarComponent";
import FooterComponent from "./components/FooterComponent";

// Pages
import LandingPage from "./pages/LandingPage";
import AppPage from "./pages/AppPage";
import AppDashboardPage from "./pages/AppDashboardPage";
import AppPoolsInfoPage from "./pages/AppPoolsInfoPage";

// App
const App = () => {
  return (
    <>
      {/* Scroller component */}
      <ScrollerComponent />

      {/* Navigation bar component */}
      <NavigationBarComponent />

      {/* Routes */}
      <Routes>
        {/* Landing page */}
        <Route
          path="/"
          element={
            <LandingPage
              title={"ShillStake: Stake your NFTs and Earn Rewards"}
            />
          }
        />

        {/* App page */}
        <Route path="/app" element={<AppPage title={"App - ShillStake"} />} />

        {/* Dashboard page */}
        <Route
          path="/app/dashboard"
          element={<AppDashboardPage title={"App > Dashboard - ShillStake"} />}
        />

        {/* Pools info page */}
        <Route
          path="/app/pools-info"
          element={<AppPoolsInfoPage title={"App > Pools Info - ShillStake"} />}
        />
      </Routes>

      {/* Footer component */}
      <FooterComponent />
    </>
  );
};

// Export
export default App;
