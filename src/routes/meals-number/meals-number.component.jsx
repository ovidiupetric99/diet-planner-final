import './meals-number.styles.scss';

import MealsNumberForm
  from '../../components/meals-number-form/meals-number-form.component';

const MealsNumber = () => {
  return (
    <div className="configure-macros-container">
      <MealsNumberForm />
    </div>
  );
};

export default MealsNumber;
