export const convertDateToUnixTimestamp = (date: string) => {
  return Math.round(new Date(date).getTime() / 1000);
};

export const convertUnixTimestampToDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toISOString().split('T')[0];
};

export const formatUnixToDateTime = (unixDate: any) => {
  const date = new Date(unixDate * 1000);
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = '0' + date.getMinutes();
  const seconds = '0' + date.getSeconds();
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
};
