import { IdTypedObject } from '../../../../models/Base';
import ToppingGroup from './ToppingGroup/ToppingGroup';
import styles from './Toppings.module.scss';

interface Props {
  sauces: IdTypedObject[];
  cheeses: IdTypedObject[];
  toppings: IdTypedObject[];
  selectedSauce: number | undefined;
  selectedCheese: number | undefined;
  selectedToppings: number[];
  onChange: (item: { type: string; id?: number }) => void;
}

const Toppings: React.FC<Props> = ({
  sauces,
  cheeses,
  toppings,
  selectedSauce,
  selectedCheese,
  selectedToppings,
  onChange,
}) => {
  return (
    <div className={styles.toppings}>
      <span className={styles.title}>Choose your toppings</span>
      <ToppingGroup
        title="Sauce"
        type="sauce"
        items={sauces}
        selectedItem={selectedSauce}
        onChange={onChange}
      />
      <ToppingGroup
        title="Cheese"
        type="cheese"
        items={cheeses}
        selectedItem={selectedCheese}
        onChange={onChange}
      />
      <ToppingGroup
        title="Toppings"
        type="topping"
        items={toppings}
        selectedItem={selectedToppings}
        onChange={onChange}
      />
    </div>
  );
};

export default Toppings;
