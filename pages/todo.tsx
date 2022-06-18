import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { RootState } from '../store/store';
import { Alert, Form, TodoItem } from '../components';
import { Item } from '../ts/interfaces';
import {
  GET_LOCAL_STORAGE,
  HIDE_ALERT,
  REMOVE_ALL,
  SET_LOCAL_STORAGE,
} from '../store/features/todo/todoSlice';

const Todo: NextPage = () => {
  const { todoList, alertMessage, showAlert } = useSelector(
    (state: RootState) => state.todo
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_LOCAL_STORAGE());
  }, []);

  useEffect(() => {
    dispatch(SET_LOCAL_STORAGE());
    if (showAlert && alertMessage.message !== 'Editing...') {
      let timeOut = setTimeout(() => {
        dispatch(HIDE_ALERT());
      }, 1500);
      return () => clearTimeout(timeOut);
    }
  }, [alertMessage.message]);

  return (
    <div className='section-center section'>
      <h2 className='title'>Next Redux assistant</h2>
      <Alert />
      <section className='main-container'>
        <h2>Task List</h2>
        <Form />
        <div className='todo-list'>
          <ul className='todo-container'>
            {todoList?.map((item: Item) => {
              return <TodoItem key={item.id} item={item} />;
            })}
          </ul>
        </div>
        {todoList && todoList.length > 0 && (
          <button
            className='remove-items'
            onClick={() => {
              dispatch(REMOVE_ALL());
            }}
          >
            remove all
          </button>
        )}
      </section>
    </div>
  );
};

export default Todo;
