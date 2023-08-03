import { useEffect, useState } from "react";
import { queryWrapper } from "../helpers/queryhelper";
// App pools info page
const AppPoolsInfoPage = ({ title, wClient }) => {
  // Title
  document.title = title;
  useEffect(() => {
    getData();
  }, [wClient]);

  const [contractsInfo, setContractsInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isQueryError, setIsQueryError] = useState(false);
  const images = {
    SHILL: "/images/pages/app-dashboard-page/hero-section-img-1.png",
    Shillables: "/images/pages/landing-page/nfts-section-img-1.png",
    "Wolf Pack Alphas": "/images/pages/landing-page/nfts-section-img-5.png",
    "Broke Badgers": "/images/pages/landing-page/nfts-section-img-2.png",
    Alphacas: "/images/pages/landing-page/nfts-section-img-3.png",
    BooNanas: "/images/pages/landing-page/nfts-section-img-4.png",
    BananAppeals: "/images/pages/landing-page/nfts-section-img-6.png",
    "Sly Foxes": "/images/pages/landing-page/nfts-section-img-7.png",
  };
  const getData = async () => {
    setIsLoading(true);
    await getContractsInfo();
    setIsLoading(false);
  };
  const getContractsInfo = async () => {
    const q = { get_contracts_with_info: {} };
    debugger;
    const data = await queryWrapper(
      q,
      import.meta.env.VITE_APP_BURN_MANAGER_CONTRACT_ADDRESS,
      import.meta.env.VITE_APP_BURN_MANAGER_CONTRACT_HASH
    ).catch((err) => {
      setIsQueryError(true);
    });
    setIsLoading(false);
    setContractsInfo(data);
    return data;
  };

  const getBonusAmount = (bonusHourly, burnCounterDate) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const durationMilliseconds = (currentTime - burnCounterDate) * 1000;
    const hours = Math.floor(durationMilliseconds / (1000 * 60 * 60));
    return hours * bonusHourly > 0
      ? (hours * bonusHourly).toString()
      : "0000000";
  };

  return (
    <main className="app-pools-info-page">
      {isLoading && (
        <img src="/images/brand/icon.png" className="loading-icon" />
      )}
      {/* Hero section */}
      <section className="hero-section">
        <div className="container">
          <h1>Pools and Allocation</h1>

          <p className="top-desc">
            Check back regularly to see what collections have been added as well
            as the shill rewards and possible shill bonuses for those
            collections.
          </p>
          {isQueryError && (
            <div className="query-box">
              <p>Query Error</p>
              <h4>
                There was a problem querying the contract. Please try again and
                if the problem persists contract the administrator.
              </h4>
            </div>
          )}
          {!isQueryError && (
            <div className="table">
              <div className="table-title-row">
                <p>Pool</p>

                <p>About</p>

                <p>Total Burned</p>

                <p>
                  Possible <br /> Rewards
                </p>

                {/* <p>CAP</p>

                <p>Commitment</p> */}
              </div>
              <div className="table-box-rows">
                {contractsInfo.map((contract, index) => (
                  <div className="table-box-row">
                    <div className="content">
                      <div className="pool">
                        <img
                          src={images[contract.burn_info.nft_contract.name]}
                          alt=""
                        />

                        <h3>{contract.burn_info.nft_contract.name}</h3>
                      </div>
                      <p className="secondary">
                        Burning your NFT is irreversible. The contract will
                        remove your NFT from the Collection and reward you with
                        $shill.
                      </p>

                      <p>
                        <span className="hidden">Total Burned:</span>
                        {contract.burn_info.total_burned_amount} <br />{" "}
                        <span> NFTs</span>
                      </p>

                      <p>
                        <span className="hidden">Rewards Emissions:</span>
                        {contract.burn_info.reward_contract.base_reward.slice(
                          0,
                          -6
                        )}{" "}
                        <br /> <span>$SHILL base</span>
                        {parseInt(
                          contract.burn_info.reward_contract.bonus_hourly
                        ) > 0}
                        <br />
                        {getBonusAmount(
                          contract.burn_info.reward_contract.bonus_hourly,
                          contract.burn_info.burn_counter_date
                        ).slice(0, -6)}{" "}
                        <br /> <span>Bonus</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

// Export
export default AppPoolsInfoPage;
