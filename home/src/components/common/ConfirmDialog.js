import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Ionicon from 'react-ionicons';
export const confirmDelete = (message, onAccept, onCancel) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className='custom-ui'>
          <div>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                onClose();
                onCancel();
              }}
            >
              <Ionicon
                icon='md-close'
                rotate={false}
                shake={false}
                beat={false}
                fontSize='2rem'
                color={'#333'}
              />
            </span>
          </div>
          <div className='ConfirmIconCont'>
            <div className='innerCont'>
              <Ionicon
                icon='md-close'
                rotate={false}
                shake={false}
                beat={false}
                fontSize='6rem'
                color={'rgba(255, 121, 121, 1)'}
              />
            </div>
          </div>
          <h1 className='confirmTitle'>Är du säker?</h1>
          <div className='confirmsms'>{message}</div>
          <div
            className='text-center'
            style={{
              marginBottom: '32px'
            }}
          >
            <button
              className='cancelBtn'
              onClick={() => {
                onClose();
                onCancel();
              }}
            >
              Avbryt
            </button>
            <button
              className='confirmBtn'
              onClick={() => {
                onAccept();
                onClose();
                onCancel();
              }}
            >
              Ta bort
            </button>
          </div>
        </div>
      );
    }
  });
};
