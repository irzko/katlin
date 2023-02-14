import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import getCreatedTime from "./getCreatedTime";
import LikeButton from "./LikeButton";
import { useContext } from "react";
import clsx from "clsx";
import { UserContext } from "@/context/user/context";
import {
  Trash,
  EyeOff,
  AlertCircle,
  MoreHorizontal,
  MessageCircle,
  CornerUpRight,
  Edit2,
} from "react-feather";






const ShowComment = ({ comment = {} }) => {
  const [author, setAuthor] = useState({});
  useEffect(() => {
    if (comment.profile_id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_HOST}/users/profile/${comment.profile_id}`
        )
        .then((result) => {
          setAuthor(result.data);
        });
    }
  }, [comment.profile_id]);
  return (
    <div className="mt-2 flex mx-2">
      <span className="w-8 h-8 mr-2">
        {author.avatar ? (
          <Image
            loader={() =>
              `${process.env.NEXT_PUBLIC_HOST}/image/${author.avatar}`
            }
            src={`${process.env.NEXT_PUBLIC_HOST}/image/${author.avatar}`}
            className="rounded-full"
            width="32"
            height="32"
            layout="fixed"
            objectFit="cover"
            unoptimized="false"
            quality="5"
            alt={"avatar"}
          ></Image>
        ) : (
          <></>
        )}
      </span>
      <div className="bg-whitesmoke flex flex-col rounded-2xl px-2 py-1">
        <span className="font-medium">{`${author.firstName} ${author.lastName}`}</span>
        <span>{comment.comment}</span>
      </div>
    </div>
  );
};

const Post = ({ post }) => {
  const [dropdown, setDropdown] = useState(false);
  const [author, setAuthor] = useState({});
  const [likeCount, setLikeCount] = useState(post.like.length);
  const [comment, setComment] = useState(post.comment);
  const [toggleComment, setToggleComment] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_HOST}/users/profile/${post.author_id}`)
      .then((result) => {
        setAuthor(result.data);
      });
  }, [post.author_id]);

  const handleClick = () => {
    setDropdown(!dropdown);
  };

  return (
    <div className="rounded-xl my-4 bg-white border shadow-sm">
      <div className="p-2 flex justify-between">
        <div className="flex items-center">
          <span className="h-10 w-10 mr-3">
            {author.avatar ? (
              <Image
                loader={() =>
                  `${process.env.NEXT_PUBLIC_HOST}/image/${author.avatar}`
                }
                src={`${process.env.NEXT_PUBLIC_HOST}/image/${author.avatar}`}
                className="rounded-full"
                width="40"
                height="40"
                layout="fixed"
                objectFit="cover"
                unoptimized="false"
                quality="5"
                alt={post.caption}
              ></Image>
            ) : (
              <></>
            )}
          </span>
          <div className="flex flex-col justify-center">
            <span className="font-medium leading-1">{`${author.firstName} ${author.lastName}`}</span>
            <span className="text-xs leading-none">
              {getCreatedTime(post.createdAt)}
            </span>
          </div>
        </div>
        <div className="relative">
          <button
            className="hover:bg-whitesmoke h-8 w-8 flex justify-center items-center rounded-full"
            onClick={handleClick}
          >
            <MoreHorizontal size={20} />
          </button>
          {dropdown ? <Dropdown post={post} /> : <></>}
        </div>
      </div>
      <div className="px-2 mb-2">{post.caption}</div>
      <div>
        <div className="relative px-2">
          {post.image ? (
            <Image
              loader={() =>
                `${process.env.NEXT_PUBLIC_HOST}/image/${post.image}`
              }
              src={`${process.env.NEXT_PUBLIC_HOST}/image/${post.image}`}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="cover"
              unoptimized="false"
              alt={post.caption}
            ></Image>
          ) : (
            <></>
          )}
        </div>
      </div>
      {post.like.length ? (
        <div className="px-4 py-2 text-xs">{likeCount} lượt thích</div>
      ) : (
        <></>
      )}
      <hr className="mx-4" />
      <div className="grid grid-cols-3 p-1">
        <LikeButton
          likeCount={likeCount}
          setLikeCount={setLikeCount}
          post={post}
        />
        <div
          className="col-span-1 flex items-center justify-center"
          onClick={() => setToggleComment(!toggleComment)}
        >
          <MessageCircle size={20} />
          <span className="font-medium ml-2">Bình luận</span>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <CornerUpRight size={20} />
          <span className="font-medium ml-2">Chia sẻ</span>
        </div>
      </div>
      {comment.length > 0 ? <hr className="mx-4" /> : <></>}
      <div className={clsx(comment.length > 0 ? "py-2" : "")}>
        {comment.map((cmt, index) => (
          <ShowComment key={index} comment={cmt} />
        ))}
      </div>
      {toggleComment ? (
        <InputComment id={post._id} setCmt={setComment} comment={comment} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Post;
