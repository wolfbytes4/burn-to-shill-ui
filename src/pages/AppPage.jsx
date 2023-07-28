// Dependencies
import { useNavigate } from "react-router-dom";

// App  page
const AppPage = ({ title }) => {
  // Title
  document.title = title;

  // Hooks
  const navigate = useNavigate();

  return (
    <main className="app-page">
      {/* Hero section */}
      <section className="hero-section">
        <div className="container">
          <div className="box">
            <h1>Connect Your Wallet</h1>

            <p>
              As you probably guessed, you'll need to connect your wallet in
              order to start burning.
            </p>

            <button
              onClick={() => {
                navigate("/app/dashboard");
              }}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

// Export
export default AppPage;
