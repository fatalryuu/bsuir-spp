import { Request, Response } from 'express';
import mediaService from '../../services/media';

class MediaController {
  async upload(req: Request, res: Response) {
    if (!req.file) {
      return res.status(400).json({ error: 'File is required' });
    }

    const url = await mediaService.upload(req.file);

    res.status(201).json({ url });
  }
}

export default new MediaController();
