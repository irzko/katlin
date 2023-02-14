const crypto = require("crypto");
import User from "../models/users";

const isPasswordAndUserMatch = (
  req: {
    body: {
      email: any;
      password?: any;
      userId?: any;
      permissionLevel?: any;
      provider?: string;
      name?: string;
    };
  },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: { errors?: string[] }): void; new (): any };
    };
  },
  next: () => any
) => {
  User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (!user) {
      res.status(404).send({});
    } else {
      let passwordFields = user.password.split("$");
      let salt = passwordFields[0];
      let hash = crypto
        .createHmac("sha512", salt)
        .update(req.body.password)
        .digest("base64");
      if (hash === passwordFields[1]) {
        req.body = {
          userId: user.id,
          email: user.email,
          permissionLevel: user.permissionLevel,
          provider: "email",
          name: user.firstName + " " + user.lastName,
        };
        return next();
      } else {
        return res.status(400).send({ errors: ["Invalid email or password"] });
      }
    }
  });
};

export default isPasswordAndUserMatch;
