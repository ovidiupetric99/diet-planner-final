import './form-input.styles.scss';

const FormInput = ({label, ...otherProps}) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />

      {otherProps.type != 'radio'
        ? label &&
            <label
              className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}
            >
              {label}
            </label>
        : <label className="form-input-radio-label">
            {label}
          </label>}

    </div>
  );
};

export default FormInput;
