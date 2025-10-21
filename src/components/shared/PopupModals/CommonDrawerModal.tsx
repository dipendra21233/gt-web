import { CommonDrawerModalProps } from '@/types/module/commonModule';
import { Drawer } from 'antd';
import { FC } from 'react';

const CommonDrawerModal: FC<CommonDrawerModalProps> = ({
  open,
  onClose,
  children,
  placement,
  loading,
  // styles,
  width,
  height,
  ...porps
}) => {
  return (
    <Drawer
      placement={placement}
      loading={loading}
      // styles={styles}
      open={open}
      width={width}
      height={height}
      // title={title}
      onClose={onClose}

      {...porps}
    >
      {children}
    </Drawer>
  )
}

export default CommonDrawerModal
