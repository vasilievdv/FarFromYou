import React from 'react';
import './InputWithButton.css';

function InputWithButton({
  clickAction, changeAction, placeholder, btnText, value,
}) {
  return (
    <div className="input-block">
      <textarea value={value} className="input-field" placeholder={placeholder} onChange={changeAction} required />
      <button type="button" className="input-btn" onClick={clickAction}>{btnText}</button>
    </div>
  );
}

export default InputWithButton;
