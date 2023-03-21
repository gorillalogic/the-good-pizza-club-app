import styles from './TabHeader.module.scss';

interface Props {
  title: string;
  user: string;
  onClick: () => void;
}

const TabHeader: React.FC<Props> = ({ title, user, onClick }) => {
  return (
    <div className={styles.header}>
      <h2>{title}</h2>
      <p>
        {user}, not you? <a onClick={onClick}>Click here</a>
      </p>
    </div>
  );
};

export default TabHeader;
