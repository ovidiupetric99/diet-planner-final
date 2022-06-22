import {AuthErrorCodes} from 'firebase/auth';
import React, {Fragment} from 'react';
import './modal.styles.scss';

const MODAL_STYLES = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '20px',
  zIndex: 1000,
  WebkitBoxShadow: '0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)',
  boxShadow: '0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)',
  width: '400px',
  maxHeight: '80%',
  overflowY: 'auto',
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
  backgroundColor: 'rgba(0, 0, 0, .7)',
};

const closeButtonStyles = {
  position: 'absolute',
  top: 0,
  right: 0,
  margin: '5px',
  cursor: 'pointer',
};

const Modal = ({open, children, onClose}) => {
  if (!open) return null;

  return (
    <Fragment>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODAL_STYLES}>
        <span style={closeButtonStyles} onClick={onClose}>&#10005;</span>
        <div className="header-modal">
          <h2>Name: {children.description}</h2>
          <h3>Brand name: {children.brandName}</h3>
          <span>*Values specified for a serving of 100grams:</span>
        </div>
        <div className="elements-list">
          {children.foodNutrients.map ((el, i) => {
            // if (i >= 19) return;
            // else
            return (
              <div key={i} className="element">
                <span className="start-line">{el.nutrientName}: </span>
                <span className="end-line">{el.value}  {el.unitName}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
