import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import socket from '../../socket';
import InputWithButton from '../Forms/InputWithBtn/InputWithButton';
// import Track from '../Track/Track';
import './Multer.css';

function Multer() {
  return (

    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left" />
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body multer-card">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Автор</span>
            </label>
            <input type="text" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Название трека</span>
            </label>
            <input type="text" className="input input-bordered" />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">Добавить трек</button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Multer;
