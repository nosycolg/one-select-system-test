import { Request, Response } from 'express';
import { actions, searchLogs } from '../services/logs.service';

class LogsController {
    async getLogs(req: Request, res: Response) {
        try {
            const params = req.query.action as actions;

            if (actions) {
                const data = await searchLogs(params);
                return res.success(data);
            }
        } catch (err) {
            // istanbul ignore next
            return res.badRequest(err);
        }
    }
}

export default new LogsController();
