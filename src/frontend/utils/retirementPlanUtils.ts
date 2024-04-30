import { enqueueSnackbar } from 'notistack';

export const getPercentageForHeirs = (total: number) => {
  const percentage = 100 / total;
  return percentage;
};

export const transformToPlanType = (planType: number) => {
  switch (planType) {
    case 0:
      return 'BASIC';
    case 1:
      return 'INHERITANCE';
    case 2:
      return 'FLEXIBLE';
    default:
      return 'BASIC';
  }
};

export const getShortenedAddressAccount = (address: string) => {
  let shortenedAddress = address.substring(0, 6);
  shortenedAddress += '...';
  shortenedAddress += address.substring(address.length - 4, address.length);

  return shortenedAddress;
};

export const validateMetamask = (): boolean => {
  if (!window.ethereum) {
    enqueueSnackbar('You have to install Metamask extension.', { variant: 'error' });

    return false;
  }

  return true;
};
