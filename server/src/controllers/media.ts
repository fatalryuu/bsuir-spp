import { Request, Response } from 'express';
import mediaService from '../services/media';
import { io } from '../services/ws';
import { WS_MESSAGES } from '../types/ws';
import { UploadBody } from '../types/media';

class MediaController {
  async upload(body: UploadBody) {
    const { fileName, fileBuffer, fileType } = body;

    const buffer = Buffer.from(fileBuffer);

    const url = await mediaService.upload(fileName, buffer, fileType);

    io.emit(WS_MESSAGES.UPLOAD_SUCCESS, url);
  }
}

export default new MediaController();
