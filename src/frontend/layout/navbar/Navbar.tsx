/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoMdWallet } from 'react-icons/io';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { resetWeb3State, setWeb3HandlerAsync } from '../../redux/slices/web3Slice';
import logoImage from '../../assets/brand/app-logo.png';
import { getShortenedAddressAccount, validateMetamask } from '../../utils/retirementPlanUtils';
import { PlanTypes } from '../../constants/constants';
import { getPlanDetailAsync, resetPlansState } from '../../redux/slices/plansSlice';
import { SecondaryButton } from '../../components/SecondaryButton/SecondaryButton';
import './styles.scss';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNavbarBackgroundColor, setShowNavbarBackgroundColor] = useState(false);
  const { selectedAccount } = useAppSelector((state) => state.web3.reducer);
  const { plan } = useAppSelector((state) => state.plans.reducer);

  const handleClickConnectToWallet = async () => {
    if (!validateMetamask()) {
      return;
    }

    dispatch(setWeb3HandlerAsync()).then(() => {
      dispatch(getPlanDetailAsync());
    });
  };

  const goToHome = () => {
    navigate('/');
  };

  // useEffect(() => {
  //   const initWeb3 = async () => {
  //     if (window.ethereum) {
  //       try {
  //         const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  //         if (accounts.length > 0) {
  //           dispatch(setWeb3HandlerAsync()).then(() => {
  //             dispatch(getPlanDetailAsync());
  //           });
  //         }
  //       } catch (error) {
  //         console.error('Error al intentar recuperar cuentas:', error);
  //       }
  //     }
  //   };

  //   if (window.ethereum) {
  //     initWeb3();

  //     window.ethereum.on('accountsChanged', (accounts: any) => {
  //       if (accounts.length > 0) {
  //         dispatch(setWeb3HandlerAsync()).then(() => {
  //           dispatch(getPlanDetailAsync());
  //         });
  //       } else {
  //         dispatch(resetWeb3State());
  //         dispatch(resetPlansState());
  //       }
  //     });
  //   }

  //   return () => {
  //     if (window.ethereum && window.ethereum.removeListener) {
  //       window.ethereum.removeListener('accountsChanged', initWeb3);
  //     }
  //   };
  // }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const changeNavBackgroundColor = (): void => {
      if (window.scrollY >= 50) {
        setShowNavbarBackgroundColor(true);
      } else {
        setShowNavbarBackgroundColor(false);
      }
    };

    window.addEventListener('scroll', changeNavBackgroundColor);

    return () => {
      window.removeEventListener('scroll', changeNavBackgroundColor);
    };
  }, []);

  return (
    <div className={`navbar navbar--${showNavbarBackgroundColor ? 'background-fill' : 'background-transparent'}`}>
      <div className="navbar__wrapper">
        <div className="navbar__logo" onClick={() => goToHome()}>
          <img src={logoImage} alt="Crypto Retirement Logo" />
        </div>

        <ul className={cn('navbar__items-container', { isOpen: showMobileMenu })}>
          {selectedAccount && (
            <>
              {!plan && (
                <li className="navbar__item-container">
                  <div
                    className={cn('navbar__item', { 'active-link': location.pathname === '/create-plan' })}
                    onClick={() => {
                      setShowMobileMenu(!showMobileMenu);
                    }}
                  >
                    <Link to="/create-plan">Create Plan</Link>
                  </div>
                </li>
              )}
              {plan && (
                <li className="navbar__item-container">
                  <div
                    className={cn('navbar__item', { 'active-link': location.pathname === '/add-deposit' })}
                    onClick={() => {
                      setShowMobileMenu(!showMobileMenu);
                    }}
                  >
                    <Link to="/add-deposit">Add Deposit</Link>
                  </div>
                </li>
              )}
              {plan && (
                <li className="navbar__item-container">
                  <div
                    className={cn('navbar__item', { 'active-link': location.pathname === '/detail-plan' })}
                    onClick={() => {
                      setShowMobileMenu(!showMobileMenu);
                    }}
                  >
                    <Link to="/detail-plan">Detail Plan</Link>
                  </div>
                </li>
              )}
              {plan && plan.planType === PlanTypes.FLEXIBLE && (
                <li className="navbar__item-container">
                  <div
                    className={cn('navbar__item', { 'active-link': location.pathname === '/proof-of-life' })}
                    onClick={() => {
                      setShowMobileMenu(!showMobileMenu);
                    }}
                  >
                    <Link to="/proof-of-life">Proof of Life</Link>
                  </div>
                </li>
              )}
              <li className="navbar__item-container">
                <div
                  className={cn('navbar__item', { 'active-link': location.pathname === '/withdraw-heir' })}
                  onClick={() => {
                    setShowMobileMenu(!showMobileMenu);
                  }}
                >
                  <Link to="/withdraw-heir">Withdraw Heir</Link>
                </div>
              </li>
              {plan && (
                <li className="navbar__item-container">
                  <div
                    className={cn('navbar__item', { 'active-link': location.pathname === '/withdraw-owner' })}
                    onClick={() => {
                      setShowMobileMenu(!showMobileMenu);
                    }}
                  >
                    <Link to="/withdraw-owner">Withdraw Owner</Link>
                  </div>
                </li>
              )}
            </>
          )}

          <li className="navbar__item-container">
            <div
              className="navbar__item"
              onClick={() => {
                setShowMobileMenu(!showMobileMenu);
              }}
            >
              {selectedAccount ? (
                <div className="navbar__address">
                  <IoMdWallet />
                  <label title={selectedAccount}>{getShortenedAddressAccount(selectedAccount)}</label>
                </div>
              ) : (
                <SecondaryButton onClick={handleClickConnectToWallet}>Connect wallet</SecondaryButton>
              )}
            </div>
          </li>
        </ul>
        <div className="navbar__mobile-icon" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          {showMobileMenu ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </div>
  );
};
