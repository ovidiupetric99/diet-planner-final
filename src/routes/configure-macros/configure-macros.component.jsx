import './configure-macros.styles.scss';

import ConfigureMacrosForm
  from '../../components/configure-macros-form/configure-macros-form.component';

const ConfigureMacros = () => {
  return (
    <div className="configure-macros-container">
      <ConfigureMacrosForm />
    </div>
  );
};

export default ConfigureMacros;
