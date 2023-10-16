import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db, auth } from '../firebaseConfig';

export const useDatabaseStore = defineStore('database', () => {
  // state
  const documents = ref([]);

  //Actions
  const getUrls = async () => {
    try {
      const q = query(
        collection(db, 'urls'),
        where('user', '==', auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        documents.value.push({ id: doc.id, ...doc.data() });
      });
    } catch (error) {
      console.log(error);
    }
  };
  return { getUrls, documents };
});
