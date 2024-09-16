import { io } from '..';
import mediaService from '../services/media';
import { UploadBody } from '../types/media';
import { WS_MESSAGES } from '../types/ws';

class MediaController {
  async upload(body: UploadBody) {
    const { fileName, fileBuffer, fileType } = body;

    const buffer = Buffer.from(fileBuffer);

    const url = await mediaService.upload(fileName, buffer, fileType);

    io.emit(WS_MESSAGES.UPLOAD_SUCCESS, url);
  }
}

export default new MediaController();
