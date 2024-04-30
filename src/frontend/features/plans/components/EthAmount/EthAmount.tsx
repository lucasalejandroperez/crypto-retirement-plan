import { toEther } from '../../../../utils/etherUtils';

interface Props {
  amount: string;
}

export const EthAmount = ({ amount }: Props) => {
  return <strong>{toEther(amount)} MATIC</strong>;
};
