import { CommonDrawerModalProps } from '@/types/module/commonModule';
import { Drawer } from 'antd';
import { FC } from 'react';

const CommonDrawerModal: FC<CommonDrawerModalProps> = ({
  open,
  onClose,
  children,
  placement,
  loading,
  className,
  // styles,
  width,
  height,
  footer,
  ...porps
}) => {
  return (
    <Drawer
      placement={placement}
      rootClassName={className}
      loading={loading}
      // styles={styles}
      open={open}
      width={width}
      height={height}
      // title={title}
      onClose={onClose}
      classNames={{
        header:'maison-24-medium-125'
      }}
      footer={footer}
      styles={{
        header:{
          // color:'red'
        }
      }}
      style={{
        backgroundColor: '#fef7f0',
      }}

      {...porps}
    >
      {children}
    </Drawer>
  )
}

export default CommonDrawerModal
