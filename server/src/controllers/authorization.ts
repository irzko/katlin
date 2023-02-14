import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const login = (req: Request, res: Response) => {
  const jwtSecret = "irzko";
  try {
    let refreshId = req.body.userId + jwtSecret;
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(refreshId)
      .digest("base64");
    req.body.refreshKey = salt;
    let token = jwt.sign(req.body, jwtSecret);
    let b = Buffer.from(hash);
    let refresh_token = b.toString("base64");
    return res.status(201).send({
      id: req.body.userId,
      accessToken: token,
      refreshToken: refresh_token,
    });
  } catch (err) {
    return res.status(500).send({ errors: err });
  }
};

export default login;
