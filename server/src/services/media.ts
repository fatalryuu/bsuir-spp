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

  async upload(file: Express.Multer.File): Promise<string> {
    const ext = file.originalname.split('.').pop();
    const fileName = generateRandomHash(10) + '.' + ext;
    const storageRef = ref(this.storage, fileName);

    const snapshot = await uploadBytesResumable(storageRef, file.buffer, {
      contentType: file.mimetype,
    });

    return await getDownloadURL(snapshot.ref);
  }

  async deleteByUrl(fileUrl: string): Promise<void> {
    const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/spp-storage.appspot.com/o/';
    const filePath = fileUrl.replace(baseUrl, '').split('?')[0];

    const storageRef = ref(this.storage, filePath);

    await deleteObject(storageRef);
  }
}

export default new MediaService();
