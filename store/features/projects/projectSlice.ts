import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Project } from '../../../ts/interfaces';

const url = 'https://assitant-app.netlify.app/api/projects-api';

export const getProjects = createAsyncThunk(
  'projects/getProjects',
  async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);
interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: [],
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
    });
  },
});

export default projectSlice.reducer;
