import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const loadNotes = async (uid = '') => {
  if (!uid) throw new Error('El UID del usuario no existe');
  // Referencia para la colección de firestore
  const collecionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collecionRef);

  const notes = [];
  docs.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() });
  });
  return notes;
};
