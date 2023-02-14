import jwt from "jsonwebtoken";

const validJWTNeeded = (
  req: { headers: { [x: string]: string }; jwt: string | jwt.JwtPayload },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (): any; new (): any };
    };
  },
  next: () => any
) => {
  if (req.headers["authorization"]) {
    try {
      let authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(401).send();
      } else {
        req.jwt = jwt.verify(authorization[1], "irzko");
        return next();
      }
    } catch (err) {
      return res.status(403).send();
    }
  } else {
    return res.status(401).send();
  }
};

export default validJWTNeeded;
