export interface Item {
  id: string;
  value: string;
  isComplete: boolean;
}

export interface Project {
  gitUrl: string;
  id: string;
  name: string;
  projectUrl: string;
  url: string;
}
export interface AlertMessege {
  message: string;
  type: string;
}

export interface InitialState {
  todoList: [] | Item[] | null;
  showAlert: boolean;
  isEditing: boolean;
  alertMessage: AlertMessege;
  ItemID: string;
  ItemValue: string;
}
