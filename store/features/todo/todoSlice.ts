import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState, Item } from '../../../ts/interfaces';

const initialState: InitialState = {
  todoList: null,
  showAlert: false,
  isEditing: false,
  ItemID: '',
  ItemValue: '',
  alertMessage: {
    message: '',
    type: '',
  },
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    GET_LOCAL_STORAGE: (state: InitialState) => {
      if (state.todoList == null) {
        let todoList = localStorage.getItem('nextTodoList');
        if (todoList) {
          state.todoList = JSON.parse(
            localStorage.getItem('nextTodoList') as string
          );
        } else {
          state.todoList = [];
        }
      }
    },
    SET_LOCAL_STORAGE: (state: InitialState) => {
      localStorage.setItem('nextTodoList', JSON.stringify(state.todoList));
    },
    FORM_INPUT: (state: InitialState, action: PayloadAction<string>) => {
      state.ItemValue = action.payload;
    },
    HANDLE_FORM_SUBMIT: (state: InitialState) => {
      if (state.ItemValue && state.ItemValue.trim() !== '') {
        if (!state.isEditing) {
          const todoItem = {
            id: new Date().getTime().toString(),
            value: state.ItemValue,
            isComplete: false,
          };
          state.ItemValue = '';

          (state.todoList as Item[]).push(todoItem);

          const alertMessage = {
            message: 'New task added',
            type: 'success',
          };
          state.alertMessage = alertMessage;
          state.showAlert = true;
        } else {
          const tempList = state.todoList!.map((item: Item) => {
            if (item.id === state.ItemID) {
              return { ...item, value: state.ItemValue };
            }
            return item;
          });
          const alertMessage = {
            message: 'Task updated',
            type: 'success',
          };
          state.alertMessage = alertMessage;
          state.showAlert = true;
          state.todoList = tempList;
          state.isEditing = false;
          state.ItemID = '';
          state.ItemValue = '';
        }
      }
    },
    REMOVE_ALL: (state: InitialState) => {
      const alertMessage = {
        message: 'No more staks',
        type: 'danger',
      };
      state.alertMessage = alertMessage;
      state.showAlert = true;
      state.todoList = [];
      state.ItemValue = '';
      state.isEditing = false;
    },
    TOOGLE_COMPLETED: (state: InitialState, action: PayloadAction<string>) => {
      let tempList = state.todoList!.map((item: Item) => {
        if (item.id === action.payload) {
          const alertMessage = {
            message: 'Task Completed',
            type: 'success',
          };
          if (!item.isComplete) {
            state.alertMessage = alertMessage;
            state.showAlert = true;
          }
          return { ...item, isComplete: !item.isComplete };
        }
        return item;
      });
      if (tempList) {
        state.todoList = tempList;
      }
      state.ItemValue = '';
      state.isEditing = false;
    },
    DELETE_ITEM: (state: InitialState, action: PayloadAction<string>) => {
      const alertMessage = {
        message: 'Task Deleted',
        type: 'danger',
      };
      state.alertMessage = alertMessage;
      state.showAlert = true;
      state.todoList = state.todoList!.filter(
        (item: Item) => item.id !== action.payload
      );
      state.ItemValue = '';
      state.isEditing = false;
    },
    EDIT_ITEM: (state: InitialState, action: PayloadAction<string>) => {
      const specificItem = state.todoList!.find(
        (item: Item) => item.id === action.payload
      );
      const alertMessage = {
        message: 'Editing...',
        type: 'warning',
      };
      state.alertMessage = alertMessage;
      state.showAlert = true;
      state.isEditing = true;
      state.ItemID = action.payload;
      state.ItemValue = specificItem!.value;
    },
    HIDE_ALERT: (state: InitialState) => {
      state.alertMessage.message = '';
      state.showAlert = false;
    },
  },
});

export const {
  DELETE_ITEM,
  EDIT_ITEM,
  FORM_INPUT,
  GET_LOCAL_STORAGE,
  HANDLE_FORM_SUBMIT,
  HIDE_ALERT,
  REMOVE_ALL,
  SET_LOCAL_STORAGE,
  TOOGLE_COMPLETED,
} = todoSlice.actions;

export default todoSlice.reducer;
