import { useEffect, useState, Fragment } from "react";
import {
  resetPermit,
  getWalletClient,
  getPermit,
} from "../helpers/wallethelper";
import { queryWrapper, queryOwnedTokens } from "../helpers/queryhelper";
import { txWrapper } from "../helpers/txhelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import ImgHandler from "../components/image-handler/image-handler";
import Pagination from "@mui/material/Pagination";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// App dashboard page
const AppDashboardPage = ({ title, wClient }) => {
  // Title
  document.title = title;
  useEffect(() => {
    getData();
  }, [wClient]);

  // States
  const [walletClient, setWalletClient] = useState();
  const [activePool, setActivePool] = useState(0);
  const [selectedContract, setSelectedContract] = useState();
  const [contractsInfo, setContractsInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRewardsLoading, setIsRewardsLoading] = useState(true);
  const [totalBurnValue, setTotalBurnValue] = useState("0000000");

  const [isPermitError, setIsPermitError] = useState(false);
  const [isQueryError, setIsQueryError] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [totalPages, setTotalPages] = useState();
  const [ownedTokens, setOwnedTokens] = useState([]);
  const [collectionSize, setCollectionSize] = useState();

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
  let contractPermit = null;

  const getData = async () => {
    const wc = await getWalletClient();
    setWalletClient(wc);
    setIsQueryError(false);
    setIsLoading(true);
    const contractsInfo = await getContractsInfo(false);

    if (contractsInfo.length > 0) {
      const permitError = await tryGetPermit(contractsInfo[activePool]);
      setSelectedContract(contractsInfo[activePool]);
      setMyTokens(contractsInfo[activePool]);
    }
    setIsLoading(false);
  };

  const getContractsInfo = async (reload) => {
    const q = { get_contracts_with_info: {} };
    const data = await queryWrapper(
      q,
      import.meta.env.VITE_APP_BURN_MANAGER_CONTRACT_ADDRESS,
      import.meta.env.VITE_APP_BURN_MANAGER_CONTRACT_HASH
    ).catch((err) => {
      setIsQueryError(true);
      setIsLoading(false);
    });

    setContractsInfo(data);
    if (data.length > 0) {
      selectPool(data[activePool], activePool, reload);
    }
    return data;
  };

  const getPossibleRewards = async (contract, tokenIds, ownedNfts) => {
    const q = { get_expected_rewards: { token_ids: tokenIds } };
    const data = await queryWrapper(
      q,
      contract.contract_info.address,
      contract.contract_info.code_hash
    ).catch((err) => {
      setIsQueryError(true);
      setIsRewardsLoading(false);
    });

    debugger;
    let burnValue = 0;
    if (data.expected_rewards.length > 0) {
      ownedNfts.forEach((nft) => {
        const rewardInfo = data.expected_rewards.find(
          (reward) => reward.token_id === nft.token_id
        );
        if (rewardInfo) {
          burnValue +=
            parseInt(rewardInfo.base_reward_expected) +
            parseInt(rewardInfo.rank_reward_expected);
        }
        nft.rewardInfo = rewardInfo;
      });
      setTotalBurnValue(burnValue.toString());
      setOwnedTokens(ownedNfts);
    }
  };

  const getCollectionSize = async (contract) => {
    const q = { num_tokens: {} };
    const data = await queryWrapper(
      q,
      contract.burn_info.nft_contract.address,
      contract.burn_info.nft_contract.code_hash
    ).catch((err) => {});

    if (data) {
      setCollectionSize(data.num_tokens.count);
    }
  };
  const tryResetPermit = async (contract) => {
    const permit = await resetPermit(
      walletClient.address,
      contract.contract_info.address,
      contract.burn_info.nft_contract.address
    ).catch((err) => {
      setIsPermitError(true);
    });

    if (permit) {
      setIsPermitError(false);
      setIsLoading(true);
      setIsLoading(false);
    }
  };

  const tryGetPermit = async (contract) => {
    const wc = await getWalletClient();
    setIsPermitError(false);
    let permitError = false;
    const permit = await getPermit(
      wc.address,
      contract.contract_info.address,
      contract.burn_info.nft_contract.address
    ).catch((err) => {
      permitError = true;
    });
    if (permit && Object.keys(permit).length === 0) {
      permitError = true;
    }

    setIsPermitError(permitError);
    debugger;
    if (!permitError) {
      contractPermit = permit;
    }
    return permitError;
  };

  const setMyTokens = async (contract) => {
    debugger;
    const wc = await getWalletClient();
    const myTokens = await queryOwnedTokens(
      wc.address,
      contractPermit,
      contract.burn_info.nft_contract.address,
      contract.burn_info.nft_contract.code_hash,
      [contract.contract_info.address, contract.burn_info.nft_contract.address]
    );
    const tokenList = myTokens.map((tokenId) => {
      return {
        token_id: tokenId,
        isSelected: false,
      };
    });
    //setOwnedTokens(tokenList);
    getCollectionSize(contract);
    getPossibleRewards(contract, myTokens, tokenList);
    const totalPages = Math.ceil(tokenList.length / pageSize);
    setTotalPages(totalPages);
  };

  const selectPool = async (contract, index, reload) => {
    setActivePool(index);
    setSelectedContract(contract);
    if (reload) {
      setMyTokens(contract);
    }
  };

  const getBonusAmount = (bonusHourly, burnCounterDate) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const durationMilliseconds = (currentTime - burnCounterDate) * 1000;
    const hours = Math.floor(durationMilliseconds / (1000 * 60 * 60));
    return hours * bonusHourly > 0
      ? (hours * bonusHourly).toString()
      : "0000000";
  };

  const updateCantSelectNft = (token_id, cantSelect) => {
    const updatedTokens = [...ownedTokens];
    const index = updatedTokens.map((e) => e.token_id).indexOf(token_id);
    updatedTokens[index].cantSelect = cantSelect;
    setOwnedTokens(updatedTokens);
  };
  const pageChange = (ev, page) => {
    setPage(page - 1);
  };

  const burn = async (nft) => {
    toast.loading("🔥🔥🔥🔥 Burning... 🔥🔥🔥🔥", {
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    let msgEncoded = window.btoa(
      JSON.stringify({
        claim_burn_rewards: {
          base_reward_expected: (
            parseInt(nft.rewardInfo.base_reward_expected) +
            parseInt(nft.rewardInfo.rank_reward_expected)
          ).toString(),
          bonus_expected: nft.rewardInfo.bonus_expected,
        },
      })
    );
    const txMsg = {
      batch_send_nft: {
        sends: [
          {
            contract: selectedContract.contract_info.address,
            receiver_info: {
              recipient_code_hash: selectedContract.contract_info.code_hash,
              also_implements_batch_receive_nft: true,
            },
            token_ids: [nft.token_id],
            msg: msgEncoded,
          },
        ],
      },
    };
    let fees = 250000;
    const res = await txWrapper(
      txMsg,
      selectedContract.burn_info.nft_contract.address,
      selectedContract.burn_info.nft_contract.code_hash,
      fees,
      true,
      walletClient
    ).catch((err) => {
      toast.dismiss();
      toast.error(err.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });

    if (res) {
      //show success message
      toast.dismiss();
      toast.success("Burn => $SHILL", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      getData(true);
    }
  };

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      minWidth: 180,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
    [`.reward-box`]: {
      fontSize: "12px",
      display: "flex",
    },
    [`.reward-label`]: {
      fontWeight: "bold",
      flex: 1,
      color: "rgba(0, 0, 0, 0.5)",
    },
  }));

  return (
    <main className="app-dashboard-page">
      <ToastContainer />
      {isLoading && (
        <img src="/images/brand/icon.png" className="loading-icon" />
      )}
      {/* Hero section */}
      <section className="hero-section">
        <div className="container">
          <div className="stats">
            <div className="stats-left">
              <h1>Dashboard</h1>

              <p>
                BurnToShill Dashboard is the place to check on eligble burn
                pools for NFT collections. Burning a NFT for $shill is
                irreversible. Once your NFT has been burned it is gone forever,
                reducing the overall collection size.
              </p>
            </div>
            {selectedContract && !isQueryError && (
              <div className="stats-right">
                <div className="box">
                  <p>Total Burned</p>

                  <h3>
                    {selectedContract.burn_info.total_burned_amount}
                    {/* <br /> <span>$0.00</span> */}
                  </h3>
                </div>

                <div className="box">
                  <p>Burn Reward</p>

                  <h3>
                    {selectedContract.burn_info.reward_contract.base_reward.slice(
                      0,
                      -6
                    )}{" "}
                    $SHILL
                    <br />
                    {parseInt(
                      selectedContract.burn_info.reward_contract.bonus_hourly
                    ) > 0 && (
                      <span>
                        +
                        {getBonusAmount(
                          selectedContract.burn_info.reward_contract
                            .bonus_hourly,
                          selectedContract.burn_info.burn_counter_date
                        ).slice(0, -6)}{" "}
                        $SHILL Bonus
                      </span>
                    )}
                  </h3>
                </div>
              </div>
            )}
          </div>
          {isPermitError && (
            <div className="permit-box">
              <p>Permit Error</p>
              <h4>
                A permit is needed in order to retrieve your personalized pool
                information
              </h4>
              <button onClick={() => tryResetPermit(selectedContract)}>
                Create Permit
              </button>
            </div>
          )}

          {isQueryError && (
            <div className="query-box">
              <p>Query Error</p>
              <h4>
                There was a problem querying the contract. Please try again and
                if the problem persists contract the administrator.
              </h4>
            </div>
          )}
          {!isPermitError && !isQueryError && (
            <div className="pools">
              <div className="tab-nav">
                <h3>Pools:</h3>

                <div className="tab-nav-btns">
                  {contractsInfo.map((contract, index) => (
                    <button
                      onClick={() => selectPool(contract, index, true)}
                      className={activePool === index && "active"}
                    >
                      {contract.burn_info.nft_contract.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="table">
                <div className="table-title-row">
                  <p>Pool</p>

                  <p>Total NFTs in Wallet</p>

                  <p>Total Burn Value</p>

                  <p>Collection Size</p>

                  <p></p>
                </div>

                <div className="table-box-rows">
                  {selectedContract && (
                    <div className="table-box-row">
                      <div className="content">
                        <div className="asset">
                          {selectedContract && (
                            <img
                              src={
                                images[
                                  selectedContract.burn_info.nft_contract.name
                                ]
                              }
                              alt=""
                            />
                          )}

                          <h3>
                            {" "}
                            {selectedContract.burn_info.nft_contract.name}
                          </h3>
                        </div>

                        <p>
                          <span>
                            Total NFTs in Wallet <br />
                          </span>{" "}
                          {ownedTokens.length} <br />{" "}
                          <span style={{ display: "block" }}>NFTs</span>
                        </p>

                        <p>
                          <span>
                            Total Burned <br />
                          </span>{" "}
                          {totalBurnValue.slice(0, -6)} <br />{" "}
                          <span style={{ display: "block" }}>$SHILL</span>
                        </p>

                        <p>
                          <span>
                            Collection Size <br />
                          </span>{" "}
                          {collectionSize} <br />{" "}
                          <span style={{ display: "block" }}>NFTs</span>
                        </p>

                        {/* <button>Manage</button> */}
                      </div>

                      <div className="manage">
                        <div className="boxes">
                          {ownedTokens
                            .slice(page * pageSize, page * pageSize + pageSize)
                            .map((nft, index) => {
                              return (
                                <div className="box">
                                  <ImgHandler
                                    index={index}
                                    token_id={nft.token_id}
                                    selectedContract={selectedContract}
                                    address={walletClient.address}
                                    updateCantSelectNft={updateCantSelectNft}
                                  />
                                  <h3>#{nft.token_id}</h3>
                                  <div className="reward-box">
                                    <div className="reward-label">
                                      Total Reward:{" "}
                                    </div>
                                    <div className="total-reward-text">
                                      {nft.rewardInfo.total_expected.slice(
                                        0,
                                        -6
                                      )}{" "}
                                      $SHILL
                                      <HtmlTooltip
                                        title={
                                          <>
                                            <div className="reward-box">
                                              <div className="reward-label">
                                                Base Reward:{" "}
                                              </div>
                                              <div className="reward-text">
                                                {nft.rewardInfo.base_reward_expected.slice(
                                                  0,
                                                  -6
                                                )}
                                              </div>
                                            </div>
                                            <div className="reward-box">
                                              <div className="reward-label">
                                                Rank Reward:{" "}
                                              </div>
                                              <div className="reward-text">
                                                {nft.rewardInfo
                                                  .rank_reward_expected !== "0"
                                                  ? nft.rewardInfo.rank_reward_expected.slice(
                                                      0,
                                                      -6
                                                    )
                                                  : "0"}
                                              </div>
                                            </div>
                                            <div className="reward-box">
                                              <div className="reward-label">
                                                Bonus Reward:{" "}
                                              </div>
                                              <div className="reward-text">
                                                {nft.rewardInfo.bonus_expected.slice(
                                                  0,
                                                  -6
                                                )}
                                              </div>
                                            </div>
                                          </>
                                        }
                                      >
                                        <FontAwesomeIcon
                                          icon={faQuestionCircle}
                                          className="tooltip-icon"
                                        />
                                      </HtmlTooltip>
                                    </div>
                                  </div>
                                  <button
                                    className="cta-btn"
                                    onClick={() => burn(nft)}
                                  >
                                    Burn
                                  </button>
                                </div>
                              );
                            })}
                        </div>
                        <Pagination
                          count={totalPages}
                          onChange={pageChange}
                          variant="outlined"
                          shape="rounded"
                          className="select-pagination"
                        />
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
          )}
        </div>
      </section>
    </main>
  );
};

// Export
export default AppDashboardPage;
