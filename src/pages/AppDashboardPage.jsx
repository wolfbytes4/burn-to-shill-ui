import { useState } from "react";

// App dashboard page
const AppDashboardPage = ({ title }) => {
  // Title
  document.title = title;

  // States
  const [activePool, setActivePool] = useState(1);

  return (
    <main className="app-dashboard-page">
      {/* Hero section */}
      <section className="hero-section">
        <div className="container">
          <div className="stats">
            <div className="stats-left">
              <h1>Dashboard</h1>

              <p>
                Provided is an overview of all of your burned positions. Enter
                into new positions and manage existing positions by depositing,
                withdrawing, and claiming rewards.
              </p>
            </div>

            <div className="stats-right">
              <div className="box">
                <p>Total Deposited</p>

                <h3>
                  0 $SHILL <br /> <span>$0.00</span>
                </h3>
              </div>

              <div className="box">
                <p>Unclaimed Rewards</p>

                <h3>
                  0 $SHILL <br /> <span>$0.00</span>
                </h3>
              </div>
            </div>
          </div>

          <div className="pools">
            <div className="tab-nav">
              <h3>Pools:</h3>

              <div className="tab-nav-btns">
                <button
                  onClick={() => setActivePool(1)}
                  className={activePool === 1 && "active"}
                >
                  $SHILL
                </button>

                <button
                  onClick={() => setActivePool(2)}
                  className={activePool === 2 && "active"}
                >
                  Shillables NFT
                </button>

                <button
                  onClick={() => setActivePool(3)}
                  className={activePool === 3 && "active"}
                >
                  Broke Badgers
                </button>

                <button
                  onClick={() => setActivePool(4)}
                  className={activePool === 4 && "active"}
                >
                  Alphacas
                </button>

                <button
                  onClick={() => setActivePool(5)}
                  className={activePool === 5 && "active"}
                >
                  Boonanas
                </button>

                <button
                  onClick={() => setActivePool(6)}
                  className={activePool === 6 && "active"}
                >
                  Wolf Pack
                </button>

                <button
                  onClick={() => setActivePool(7)}
                  className={activePool === 7 && "active"}
                >
                  Bananappeals
                </button>

                <button
                  onClick={() => setActivePool(8)}
                  className={activePool === 8 && "active"}
                >
                  Sly Foxes
                </button>
              </div>
            </div>

            <div className="table">
              <div className="table-title-row">
                <p>Pool</p>

                <p>Total NFTs in Wallet</p>

                <p>Total Burned</p>

                <p>Rewards</p>

                <p></p>
              </div>

              <div className="table-box-rows">
                {activePool === 1 && (
                  <div className="table-box-row">
                    <div className="content">
                      <div className="asset">
                        <img
                          src="/images/pages/app-dashboard-page/hero-section-img-1.png"
                          alt=""
                        />

                        <h3>$SHILL</h3>
                      </div>

                      <p>
                        <span>
                          Total NFTs in Wallet <br />
                        </span>{" "}
                        14 <br /> <span style={{ display: "block" }}>NFTs</span>
                      </p>

                      <p>
                        <span>
                          Total Burned <br />
                        </span>{" "}
                        01/14 <br />{" "}
                        <span style={{ display: "block" }}>NFTs</span>
                      </p>

                      <p>
                        <span>
                          Rewards <br />
                        </span>{" "}
                        0.025 <br />{" "}
                        <span style={{ display: "block" }}>$SHILL</span>
                      </p>

                      <button>Manage</button>
                    </div>

                    <div className="manage">
                      <div className="boxes">
                        <div className="box">
                          <img
                            src="/images/pages/app-dashboard-page/hero-section-img-2.png"
                            alt=""
                          />

                          <h3>SlyFox #1</h3>

                          <button className="cta-btn">Burn</button>
                        </div>

                        <div className="box">
                          <img
                            src="/images/pages/app-dashboard-page/hero-section-img-2.png"
                            alt=""
                          />

                          <h3>SlyFox #1</h3>

                          <button className="cta-btn">Burn</button>
                        </div>

                        <div className="box">
                          <img
                            src="/images/pages/app-dashboard-page/hero-section-img-2.png"
                            alt=""
                          />

                          <h3>SlyFox #1</h3>

                          <button className="cta-btn">Burn</button>
                        </div>

                        <div className="box">
                          <img
                            src="/images/pages/app-dashboard-page/hero-section-img-2.png"
                            alt=""
                          />

                          <h3>SlyFox #1</h3>

                          <button className="cta-btn">Burn</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activePool > 1 && (
                  <div className="table-box-row">
                    <div className="error">
                      <p>Currently, your wallet does not show any NFTs</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// Export
export default AppDashboardPage;
