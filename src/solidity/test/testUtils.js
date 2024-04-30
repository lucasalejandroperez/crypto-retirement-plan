const toWei = (num) => ethers.utils.parseEther(num.toString());
const toEther = (num) => ethers.utils.formatEther(num);

module.exports = {
  toWei,
  toEther
};
