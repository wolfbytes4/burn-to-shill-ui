// Dependencies
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getWalletClient } from "./helpers/wallethelper";

// Components
import ScrollerComponent from "./components/ScrollerComponent";
import NavigationBarComponent from "./components/NavigationBarComponent";
import FooterComponent from "./components/FooterComponent";

// Pages
import LandingPage from "./pages/LandingPage";
import AppPage from "./pages/AppPage";
import AppDashboardPage from "./pages/AppDashboardPage";
import AppPoolsInfoPage from "./pages/AppPoolsInfoPage";
import AppBurnWallPage from "./pages/AppBurnWallPage";
import WalletChangeDialog from "./components/WalletChangeDialog";

// App
const App = () => {
  const [open, setOpen] = useState(false);
  const [walletClient, setWalletClient] = useState();
  window.addEventListener("keplr_keystorechange", () => {
    console.log(
      "Key store in Keplr is changed. You may need to refetch the account info."
    );
    setOpen(true);
  });

  const connectWallet = async () => {
    const wc = await getWalletClient();
    setWalletClient(wc);
  };

  const handleClose = async () => {
    setOpen(false);
    await connectWallet();
  };
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
              title={"BurnToShill: Burn your NFTs and Earn Rewards"}
            />
          }
        />

        {/* App page */}
        <Route path="/app" element={<AppPage title={"App - BurnToShill"} />} />

        {/* Dashboard page */}
        <Route
          path="/app/dashboard"
          element={
            <AppDashboardPage
              title={"App > Dashboard - BurnToShill"}
              wClient={walletClient}
            />
          }
        />

        {/* Pools info page */}
        <Route
          path="/app/pools-info"
          element={
            <AppPoolsInfoPage
              title={"App > Pools Info - BurnToShill"}
              wClient={walletClient}
            />
          }
        />

        {/* Pools info page */}
        <Route
          path="/app/burn-wall"
          element={
            <AppBurnWallPage
              title={"App > Burn Wall - BurnToShill"}
              wClient={walletClient}
            />
          }
        />
      </Routes>

      {/* Footer component */}
      <FooterComponent />
      <WalletChangeDialog open={open} onClose={handleClose} />
    </>
  );
};

// Export
export default App;
