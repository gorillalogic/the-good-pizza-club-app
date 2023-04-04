import { useRef } from 'react';
import Hero from '../../shared/components/Hero/Hero';

const AboutUs: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="page">
      <Hero image="images/about_us_background.jpg" refToScroll={ref}>
        <h1>About Us</h1>
      </Hero>
      <section className="page-section" ref={ref}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et
          laboriosam quam odit repellendus necessitatibus nobis similique ut ex
          nulla quidem nostrum possimus, aliquid assumenda debitis quae officiis
          accusamus? Eaque, ullam!
        </p>
      </section>
    </section>
  );
};

export default AboutUs;
