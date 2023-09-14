import { useEffect, useState } from "react";
import { queryWrapper } from "../helpers/queryhelper";
// App pools info page
const AppBurnWallPage = ({ title, wClient }) => {
  // Title
  document.title = title;
  useEffect(() => {
    getData();
  }, [wClient]);

  const [burns, setBurns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isQueryError, setIsQueryError] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    await getContractsInfo();
    setIsLoading(false);
  };
  const getContractsInfo = async () => {
    let burnList = [];
    const q = { get_contracts: {} };
    const data = await queryWrapper(
      q,
      import.meta.env.VITE_APP_BURN_MANAGER_CONTRACT_ADDRESS,
      import.meta.env.VITE_APP_BURN_MANAGER_CONTRACT_HASH
    ).catch((err) => {
      setIsQueryError(true);
    });
    setIsLoading(false);

    await Promise.all(
      data.map(async (contract) => {
        var num = await getRecentBurnsNum(contract.address, contract.code_hash);
        if (num > 0) {
          const pageSize = 5;
          const totalPages = Math.ceil(num / pageSize);
          var nftBurns = await getRecentBurns(
            contract.address,
            contract.code_hash,
            totalPages - 1,
            pageSize
          );

          nftBurns.forEach((item) => {
            const img = item.meta_data.extension.media
              ? item.meta_data.extension.media[0].url
              : item.meta_data.extension.external_url;
            burnList.push({
              message: item.message,
              img: img,
              token_id: item.token_id,
              burn_date: item.date,
            });
          });
        }
      })
    );

    burnList = burnList.sort(function (a, b) {
      return b.burn_date - a.burn_date;
    });
    setBurns(burnList);

    return data;
  };

  const getRecentBurnsNum = async (address, hash) => {
    const q = { get_num_full_history: {} };
    const data = await queryWrapper(q, address, hash).catch((err) => {
      setIsQueryError(true);
    });
    return data;
  };

  const getRecentBurns = async (address, hash, page, num) => {
    const q = { get_full_history: { start_page: page, page_size: num } };
    const data = await queryWrapper(q, address, hash).catch((err) => {
      setIsQueryError(true);
    });
    return data;
  };

  return (
    <main className="app-burn-wall-page">
      {isLoading && (
        <img src="/images/brand/icon.png" className="loading-icon" />
      )}
      {/* Hero section */}
      <section className="hero-section">
        <div className="container">
          <h1>Burn Wall</h1>

          <p className="top-desc">
            Here lies the recent NFTs that have been sacrificed for $shill
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
            <div className="boxes">
              {burns.map((burn) => (
                <div className="box">
                  <img src={burn.img} />
                  <h3>#{burn.token_id}</h3>
                  <div>{burn.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

// Export
export default AppBurnWallPage;
