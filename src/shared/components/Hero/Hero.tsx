import styles from './Hero.module.scss';

interface Props extends React.PropsWithChildren {
  image?: string;
}

const Hero: React.FC<Props> = ({ children, image }) => {
  const background = `url(${image})`;
  return (
    <div
      className={styles.hero}
      style={{ '--image': background } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default Hero;
