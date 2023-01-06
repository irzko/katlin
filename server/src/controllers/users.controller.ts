import { Request, Response } from "express";
import User from "../models/users.model";

exports.findAll = async (req: Request, res: Response): Promise<Response> => {
  return res.send(await User.findAll());
};



exports.createUser = async (req: Request, res: Response): Promise<Response> => {
  await User.create(
    {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      gender: parseInt(req.body.gender),
      email: req.body.email,
      password: req.body.password,
      birthday: new Date(req.body.birthday)
    }
    );
  return res.status(201).send('OK');
};


exports.findUserById = async (req: Request, res: Response): Promise<Response> => {
  const user = await User.findByPk(req.params.id);
  return res.status(200).json(user);
};