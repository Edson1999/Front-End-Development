import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
    // active: {
    //   id:'ABC123',
    //   title: '',
    //   body: '',
    //   date: 123455,
    //   imageUrls: [], //https://foto1.jpg
    // }
  },
  reducers: {
    // action : {payload}
    // Guardando note
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    // Crear nueva nota
    addEmptyNote: (state, { payload }) => {
      state.notes.push(payload);
      state.isSaving = false;
    },
    // Establecer nota activa
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = '';
    },
    // Cargar las notas
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    // Grabando notas
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
      // TODO: Mensaje de error
    },
    // Actualizar nota
    noteUpdated: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });

      // Todo: Mostrar mensaje de actualización
      state.messageSaved = `${action.payload.title}, actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },
    // Eliminar nota
    deteleNoteById: (state, action) => {
      state.active = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addEmptyNote,
  clearNotesLogout,
  deteleNoteById,
  noteUpdated,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
} = journalSlice.actions;
