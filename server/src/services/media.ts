import {
  deleteObject,
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../firebase.config';
import { generateRandomHash } from '../helpers/generateRandomHash';

class MediaService {
  private storage: FirebaseStorage;

  constructor() {
    initializeApp(firebaseConfig);
    this.storage = getStorage();
  }

  async upload(fileName: string, buffer: Buffer, fileType: string): Promise<string> {
    const ext = fileName.split('.').pop();
    const generatedFileName = generateRandomHash(10) + '.' + ext;
    const storageRef = ref(this.storage, generatedFileName);

    const snapshot = await uploadBytesResumable(storageRef, buffer, {
      contentType: fileType,
    });

    return await getDownloadURL(snapshot.ref);
  }

  async deleteByUrl(fileUrl: string): Promise<void> {
    const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_STORAGE_BUCKET}/o/`;
    const filePath = fileUrl.replace(baseUrl, '').split('?')[0];

    const storageRef = ref(this.storage, filePath);

    await deleteObject(storageRef);
  }
}

export default new MediaService();
