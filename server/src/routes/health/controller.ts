import { Request, Response } from 'express';
import pkgJson from '../../../package.json';

class HealthController {
  async status(_req: Request, res: Response) {
    res.json({ version: pkgJson.version });
  }
}

export default new HealthController();
