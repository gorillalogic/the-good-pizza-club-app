import styles from './CartPanel.module.scss';

interface Props extends React.PropsWithChildren {
  selectedTab: number;
  index: number;
}

const CartPanel: React.FC<Props> = ({ children, selectedTab, index }) => {
  return (
    <div
      role="tabpanel"
      className={styles.panel}
      hidden={selectedTab !== index}
      id={`abpanel-${index}`}
    >
      {selectedTab === index && children}
    </div>
  );
};

export default CartPanel;
