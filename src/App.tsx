// import { useEffect } from 'react';
import { AppRouter } from './frontend/router/AppRouter';
import { SnackbarProvider } from 'notistack';

const App = () => {
  // useEffect(() => {
  //   const handleChainChanged = () => {
  //     window.location.reload();
  //   };

  //   const handleAccountsChanged = () => {
  //     window.location.reload();
  //   };

  //   if (window.ethereum) {
  //     window.ethereum.on('chainChanged', handleChainChanged);
  //     window.ethereum.on('accountsChanged', handleAccountsChanged);
  //   }

  //   return () => {
  //     if (window.ethereum) {
  //       window.ethereum.removeListener('chainChanged', handleChainChanged);
  //       window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
  //     }
  //   };
  // }, []);

  return (
    <div className="app">
      <SnackbarProvider
        maxSnack={4}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <AppRouter />
      </SnackbarProvider>
    </div>
  );
};

export default App;
