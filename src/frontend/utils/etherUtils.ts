import { ethers } from "ethers";

export const toWei = (num:any) => ethers.utils.parseEther(num.toString());
export const toEther = (num:any) => ethers.utils.formatEther(num);