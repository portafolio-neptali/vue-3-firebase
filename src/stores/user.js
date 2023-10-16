import { ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import { useDatabaseStore } from './database';
import { auth } from '../firebaseConfig';
import Swal from 'sweetalert2';

export const useUserStore = defineStore('user', () => {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  // State
  const userData = ref(null);
  const loading = ref(false);
  const loadingSession = ref(false);
  const router = useRouter();

  //Actions
  const registerUser = async (email, password) => {
    loading.value = true;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      userData.value = { email: user.email, uid: user.uid };
      Swal.fire('Confirmacion!', 'Registrado con exito!', 'success').then(
        () => {
          router.push({ name: 'home' });
        }
      );
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    } finally {
      loading.value = false;
    }
  };
  const loginUser = async (email, password) => {
    loading.value = true;
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      userData.value = {
        email: user.email,
        uid: user.uid,
        photo: user.photoURL,
      };
      router.push({ name: 'home' });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    } finally {
      loading.value = false;
    }
  };

  const registroGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const token = credential.accessToken;
      console.log(token);
      console.log(res.user);
      // The signed-in user info.
      userData.value = {
        email: res.user.email,
        uid: res.user.uid,
        photo: res.user.photoURL,
      };
      router.push({ name: 'home' });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
  };

  const logOut = async () => {
    const useDatabase = useDatabaseStore();
    try {
      await signOut(auth);
      userData.value = null;
      router.push({ name: 'login' });
      useDatabase.$reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
  };
  const currentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubcribe = onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            userData.value = {
              email: user.email,
              uid: user.uid,
              photo:
                user.photoURL ||
                'https://blog.jijitechnologies.com/assets/img/user.jpg',
            };
          } else {
            userData.value = null;
          }
          resolve(user);
        },
        (e) => reject(e)
      );
    });
    unsubcribe();
  };

  return {
    userData,
    registerUser,
    loginUser,
    logOut,
    loading,
    registroGoogle,
    currentUser,
    loadingSession,
  };
});
