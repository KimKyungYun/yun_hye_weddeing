'use client';

import { copyText } from '../../utils/clipboard';
import { CopyIcon } from '../Icons';
import { useToast } from '../ToastProvider';
import styles from './AddressCopy.module.scss';

export default function AddressCopy({ address }: { address: string }) {
  const showToast = useToast();

  const copy = async () => {
    showToast((await copyText(address)) ? '주소가 복사되었습니다' : '복사에 실패했습니다');
  };

  return (
    <div className={styles['address-copy']} data-reveal="">
      <button type="button" className={styles['address-copy__button']} onClick={copy}>
        <CopyIcon />
        주소 복사
      </button>
    </div>
  );
}
