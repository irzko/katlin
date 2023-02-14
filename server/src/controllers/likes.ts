import { Request, Response } from "express";
import { Like } from "../models/posts";

const like = async (req: Request, res: Response) => {
  await Like.create({
    postId: req.body.postId,
    userId: req.body.userId,
  });
  return res.status(201).send("OK");
};

const likePost = async (req: Request, res: Response) => {
  return res.send(
    await Like.findAll({
      where: {
        postId: req.params.postId,
      },
    })
  );
};

export { like, likePost };
