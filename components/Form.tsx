import type { NextPage } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import {
  FORM_INPUT,
  HANDLE_FORM_SUBMIT,
} from '../store/features/todo/todoSlice';

const Form: NextPage = () => {
  const { ItemValue } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(HANDLE_FORM_SUBMIT());
  };

  return (
    <form onSubmit={handleForm} className='form-container'>
      <input
        onChange={(e) => {
          dispatch(FORM_INPUT(e.target.value));
        }}
        type='text'
        value={ItemValue}
        className='input-control'
        placeholder='Type something...'
        maxLength={25}
      />
    </form>
  );
};

export default Form;
