import { Response, Request } from 'express'

export default function msgApi(msg: string, status = 200) {
  return function (req: Request, res: Response): void {
    res.status(status).send(msg)
  }
}
