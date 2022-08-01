import React from 'react';
import './InputWithButton.css';

function InputWithButton({
  clickAction, changeAction, placeholder, btnText,
}) {
  return (
    <div className="input-block">
      <textarea className="input-field" placeholder={placeholder} onChange={changeAction} />
      <button type="button" className="input-btn" onClick={clickAction}>{btnText}</button>
    </div>
  );
}

export default InputWithButton;
