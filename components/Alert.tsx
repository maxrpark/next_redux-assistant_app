import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Alert: NextPage = () => {
  const { alertMessage, showAlert } = useSelector(
    (state: RootState) => state.todo
  );
  const { type, message } = alertMessage;

  return (
    <div className='alert-container'>
      {showAlert && (
        <div className={`alert-box ${type}`}>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default Alert;
