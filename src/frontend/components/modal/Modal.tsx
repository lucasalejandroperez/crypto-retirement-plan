import { PropsWithChildren, useEffect } from 'react';
import './styles.scss';

type Props = PropsWithChildren<{
  isShowing: boolean;
  handleClose: () => void;
}>;

export const Modal = ({ children, isShowing, handleClose }: Props) => {
  useEffect(() => {
    const toggleOnBody = () => {
      isShowing ? document.body.classList.add('modal-open') : document.body.classList.remove('modal-open');
    };

    toggleOnBody();
  }, [isShowing]);

  return (
    <div className={`Modal ${isShowing && 'show'}`}>
      <div className="modalBackdrop" />
      <div className="modalWrapper">
        <button className="modalClose" onClick={handleClose}>
          close modal
        </button>
        <div className="modalContent">{children}</div>
      </div>
    </div>
  );
};
