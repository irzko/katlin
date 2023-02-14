const minimumPermissionLevelRequired = (required_permission_level: number) => {
  return (
    req: { jwt: { permissionLevel: string; user_id: any } },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        send: { (): any; new (): any };
      };
    },
    next: () => any
  ) => {
    let user_permission_level = parseInt(req.jwt.permissionLevel);
    let user_id = req.jwt.user_id;
    if (user_permission_level & required_permission_level) {
      return next();
    } else {
      return res.status(403).send();
    }
  };
};

export default minimumPermissionLevelRequired;
