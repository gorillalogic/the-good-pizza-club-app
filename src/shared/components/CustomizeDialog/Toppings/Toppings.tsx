import { Record } from '../../../../models/Record';
import ToppingGroup from './ToppingGroup/ToppingGroup';
import styles from './Toppings.module.scss';

interface Props {
  sauces: Record[];
  cheeses: Record[];
  toppings: Record[];
  selectedSauce: Record | undefined;
  selectedCheese: Record | undefined;
  selectedToppings: Record[];
  onChange: (type: string, item?: Record) => void;
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
    <div data-testid="customize-dialog-toppings" className={styles.toppings}>
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
