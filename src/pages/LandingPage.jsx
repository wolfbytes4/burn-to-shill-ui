// Landing page
const LandingPage = ({ title }) => {
  // Title
  document.title = title;

  return (
    <main className="landing-page">
      {/* Hero section */}
      <section className="hero-section">
        <div className="container">
          <h1>
            Burn Your NFTs and <br className="br" /> Earn Rewards in <br />
            <span>$Shill</span>
          </h1>

          <img
            src="/images/pages/landing-page/hero-section-img-1.png"
            alt=""
            className="hero-section-img-1"
          />

          <img
            src="/images/pages/landing-page/hero-section-img-2.png"
            alt=""
            className="hero-section-img-2"
          />

          <img
            src="/images/pages/landing-page/hero-section-img-3.png"
            alt=""
            className="hero-section-img-3"
          />
        </div>

        <img
          src="/images/pages/landing-page/hero-section-img-4.png"
          alt=""
          className="hero-section-img-4"
        />
      </section>

      {/* NFTs section */}
      <section className="nfts-section">
        <div className="container">
          <h2>Burnable NFTs</h2>
        </div>

        <div className="slides">
          <div className="slide">
            <img
              src="/images/pages/landing-page/nfts-section-img-1.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-2.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-3.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-4.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-5.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-6.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-7.png"
              alt=""
            />
          </div>

          <div className="slide">
            <img
              src="/images/pages/landing-page/nfts-section-img-1.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-2.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-3.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-4.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-5.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-6.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-7.png"
              alt=""
            />
          </div>

          <div className="slide">
            <img
              src="/images/pages/landing-page/nfts-section-img-1.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-2.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-3.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-4.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-5.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-6.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-7.png"
              alt=""
            />
          </div>

          <div className="slide">
            <img
              src="/images/pages/landing-page/nfts-section-img-1.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-2.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-3.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-4.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-5.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-6.png"
              alt=""
            />
            <img
              src="/images/pages/landing-page/nfts-section-img-7.png"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* Collections section */}
      {/* <section className="collections-section">
        <div className="container">
          <img
            src="/images/pages/landing-page/collections-section-img-1.png"
            alt=""
          />
        </div>
      </section> */}

      {/* Burn section */}
      <section className="burn-section">
        <div className="container">
          <h2>Burn in Two Different Ways</h2>

          <div className="boxes">
            <div className="box">
              <div className="content">
                <h3>
                  <span>01.</span> Shillables Burn Pools
                </h3>

                <p>
                  Shillables Monthly Projects are eligible to start a burn pool.
                  If you have one and want to let it burn, you'll be rewarded
                  with $shill.
                </p>
              </div>

              <img
                src="/images/pages/landing-page/stake-section-img-2.png"
                alt=""
              />
            </div>

            <div className="box">
              <div className="content">
                <h3>
                  <span>02.</span> Secret NFT Burn Pools
                </h3>

                <p>
                  Eligible Secret NFTs have their own $shill burning pool. If
                  you don't see your favorite (or least favorite) secret NFT
                  listed, please message us in discord or twitter to discuss
                  adding it.
                </p>
              </div>

              <img src="/images/brand/scrt-icon.svg" alt="" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// Export
export default LandingPage;
