import { Request, Response } from "express";
import { Post } from "../models/posts";

const createPost = async (req: Request, res: Response) => {
  await Post.create({
    caption: req.body.caption,
    images: req.body.images,
    author: req.body.author,
  });
  return res.status(201).send("OK");
};

const getAllPost = async (req: Request, res: Response) => {
  return res.send(await Post.findAll());
};

export { createPost, getAllPost };
