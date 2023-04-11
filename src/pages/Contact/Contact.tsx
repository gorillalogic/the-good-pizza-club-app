import { Button, TextField } from '@mui/material';
import { useRef } from 'react';
import Hero from '../../shared/components/Hero/Hero';
import styles from './Contact.module.scss';

const Contact: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="page">
      <Hero image="images/contact_background.jpg" refToScroll={ref}>
        <h1>Contact</h1>
      </Hero>
      <section className="page-section" ref={ref}>
        <div className={styles.wrapper}>
          <div>
            <h2>Reach out to us!</h2>
            <p>
              Got a question about The Good Pizza Club? Please send us a message
              and we will text you asap.{' '}
            </p>
          </div>
          <form className={styles.form} role="form">
            <TextField placeholder="Name" name="name" type="text" />
            <TextField placeholder="Your email" name="name" type="email" />
            <TextField multiline placeholder="Message" type="text" rows={3} />
            <Button variant="contained" color="error">
              Send
            </Button>
          </form>
        </div>
      </section>
    </section>
  );
};

export default Contact;
