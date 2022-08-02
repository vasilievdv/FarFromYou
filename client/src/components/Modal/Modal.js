import React from 'react';
import './Modal.css';

function Modal() {
  return (
    <div>
      <label htmlFor="my-modal-4" className="btn modal-button btn-primary">Добавить трек</label>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <input type="text" placeholder="Автор" className="input input-ghost w-full max-w-xs" />
          <input type="text" placeholder="Название трека" className="input input-ghost w-full max-w-xs" />
          <input type="text" placeholder="Выбрать файл" className="input input-ghost w-full max-w-xs" />
          <button type="submit" className="btn btn-ghost">Добавить</button>
        </label>
      </label>
    </div>
  );
}

export default Modal;
