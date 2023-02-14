"use client";
// import Layout from "../components/common/layout/layout";
import { useEffect, useState, useContext, FormEvent } from "react";
import axios from "axios";
import Head from "next/head";
import { UserContext } from "@/context/user/context";
import Image from "next/image";
import getCreatedTime from "@/components/home/getCreatedTime";

import {
  Trash,
  EyeOff,
  AlertCircle,
  MoreHorizontal,
  MessageCircle,
  CornerUpRight,
  Edit2,
} from "react-feather";
import { User } from "@/type";
import clsx from "clsx";

interface PostType {
  id: string;
  caption: string;
  images: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CommentType {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const Dropdown = ({ post }: { post: PostType }) => {
  const [state, userDispatch] = useContext(UserContext);

  const deletePost = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_HOST}/post/delete`, {
        id: post.id,
      })
      .then(() => {
        // loadAllPosts().then((res) => {
        //   setNewsFeed(res);
        // });
      });
  };
  // console.log(newsfeed);
  return (
    <div className="absolute flex flex-col right-0 shadow-sm border bg-white rounded-2xl p-2 w-96 z-20">
      {state.user.id === post.author ? (
        <>
          <button className="flex p-2 items-center" onClick={deletePost}>
            <Edit2 size={20} />
            <span className="ml-2 font-medium">Chỉnh sửa bài viết</span>
          </button>
          <button className="flex p-2 items-center" onClick={deletePost}>
            <Trash size={20} />
            <span className="ml-2 font-medium">Xoá bài viết</span>
          </button>
        </>
      ) : (
        <></>
      )}
      <div className="flex p-2 items-center">
        <EyeOff size={20} />
        <span className="ml-2 font-medium">Ẩn bài viêt</span>
      </div>
      <div className="flex p-2 items-center">
        <AlertCircle size={20} />
        <span className="ml-2 font-medium">Báo cáo bài viết này</span>
      </div>
    </div>
  );
};

const InputComment = ({
  id,
  setCmt,
  comment,
}: {
  id: string;
  setCmt: Array<CommentType>;
  comment: string;
}) => {
  const [state] = useContext(UserContext);
  const [value, setValue] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { id: id, profile_id: state.user.id, comment: value };
    // setCmt([...comment, data]);
    axios
      .post(`${process.env.NEXT_PUBLIC_HOST}/newsfeed/comment`, data)
      .then((result) => {
        setValue("");
      });
  };
  return (
    <form className="mx-2 pb-2" onSubmit={handleSubmit}>
      <input
        className="w-full rounded-full p-3 h-9 bg-whitesmoke placeholder:text-black/80 focus:outline-none"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Viết bình luận"
      ></input>
    </form>
  );
};

const ShowComment = ({ comment }: { comment: CommentType }) => {
  const [author, setAuthor] = useState<User>({} as User);
  useEffect(() => {
    if (comment.authorId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_HOST}/user/${comment.authorId}`)
        .then((result) => {
          setAuthor(result.data);
        });
    }
  }, [comment.authorId]);
  return (
    <div className="mt-2 flex mx-2">
      <span className="w-8 h-8 mr-2">
        {author.avatarUrl ? (
          <Image
            loader={() =>
              `${process.env.NEXT_PUBLIC_HOST}/image/${author.avatarUrl}`
            }
            src={`${process.env.NEXT_PUBLIC_HOST}/image/${author.avatarUrl}`}
            className="rounded-full"
            width="32"
            height="32"
            layout="fixed"
            objectFit="cover"
            // unoptimized="false"
            quality="5"
            alt={"avatar"}
          ></Image>
        ) : (
          <></>
        )}
      </span>
      <div className="bg-whitesmoke flex flex-col rounded-2xl px-2 py-1">
        <span className="font-medium">{`${author.firstName} ${author.lastName}`}</span>
        <span>{comment.content}</span>
      </div>
    </div>
  );
};

const LikeButton = ({ post, likeCount, setLikeCount }) => {
  const [like, setLike] = useState(false);
  // const { user } = useContext(Context);
  // const [isConnected, setIsConnected] = useState(socket.connected);

  // useEffect(() => {
  //   if (user && user._id) {
  //     post.like.includes(user._id) ? setLike(true) : setLike(false);
  //   }
  // }, [post.like, user]);

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     setIsConnected(true);
  //   });

  //   socket.on("disconnect", () => {
  //     setIsConnected(false);
  //   });
  // }, []);

  const handleLike = () => {
    // if (!post.like.includes(user._id)) {
    //   setLike(true);
    //   post.like.push(user._id);
    //   setLikeCount(likeCount + 1);
    // socket.emit("like", { profile_id: user._id, post_id: post._id });
    // axios.post(`${process.env.NEXT_PUBLIC_HOST}/newsfeed/like`, {
    //   _id: post._id,
    //   profile_id: user._id,
    // });
    // } else {
    //   setLike(false);
    //   setLikeCount(likeCount - 1);
    //   post.like = post.like.filter(function (value, index, arr) {
    //     return value !== user._id;
    //   });
    //   axios.post(`${process.env.NEXT_PUBLIC_HOST}/newsfeed/unlike`, {
    //     _id: post._id,
    //     profile_id: user._id,
    //   });
    // }
  };

  return (
    <button
      onClick={handleLike}
      className={clsx(
        "col-span-1 flex justify-center items-center",
        like ? "text-red-500" : "text-black"
      )}
    >
      <i
        className={clsx(
          like ? "bi bi-suit-heart-fill" : "bi bi-suit-heart",
          "mr-2 text-2xl"
        )}
      ></i>
      <span className="font-medium">Thích</span>
    </button>
  );
};

const Post = ({ post }: { post: PostType }) => {
  const [dropdown, setDropdown] = useState(false);
  const [author, setAuthor] = useState<User>({} as User);
  const [likeCount, setLikeCount] = useState([]);
  // const [comment, setComment] = useState(post.comment);
  const [toggleComment, setToggleComment] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_HOST}/user/${post.author}`)
      .then((result) => {
        setAuthor(result.data);
      });
  }, [post.author]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_HOST}/post/like/${post.id}`)
      .then((result) => {
        setLikeCount(result.data);
      });
  }, [post.id]);

  const handleClick = () => {
    setDropdown(!dropdown);
  };

  return (
    <div className="rounded-xl my-4 bg-white border shadow-sm">
      <div className="p-2 flex justify-between">
        <div className="flex items-center">
          <span className="h-10 w-10 mr-3 rounded-full border">
            {author.avatarUrl ? (
              <Image
                loader={() =>
                  `${process.env.NEXT_PUBLIC_HOST}/image/${author.avatarUrl}`
                }
                src={`${process.env.NEXT_PUBLIC_HOST}/image/${author.avatarUrl}`}
                className="rounded-full"
                width="40"
                height="40"
                layout="fixed"
                objectFit="cover"
                // unoptimized="false"
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
          {post.images ? (
            <Image
              loader={() =>
                `${process.env.NEXT_PUBLIC_HOST}/image/${post.images}`
              }
              src={`${process.env.NEXT_PUBLIC_HOST}/image/${post.images}`}
              width="100"
              height="100"
              layout="responsive"
              objectFit="cover"
              // unoptimized="false"
              alt={post.caption}
            ></Image>
          ) : (
            <></>
          )}
        </div>
      </div>
      {likeCount.length ? (
        <div className="px-4 py-2 text-xs">{likeCount.length} lượt thích</div>
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
      {/* {comment.length > 0 ? <hr className="mx-4" /> : <></>}
      <div className={clsx(comment.length > 0 ? "py-2" : "")}>
        {comment.map((cmt, index) => (
          <ShowComment key={index} comment={cmt} />
        ))}
      </div>
      {toggleComment ? (
        <InputComment id={post._id} setCmt={setComment} comment={comment} />
      ) : (
        <></>
      )} */}
    </div>
  );
};

const Homex = () => {
  const [post, setPost] = useState<Array<PostType>>([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/post`).then((result) => {
      setPost(result.data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Công đồng</title>
      </Head>

      <div className="max-w-sm mx-auto">
        {/* <CreatePostNav post={post} setNewsFeed={setPost} /> */}
        {post
          .slice(0)
          .reverse()
          .map((post) => (
            <Post key={post.id} post={post} />
          ))}
      </div>
    </>
  );
};

export default Homex;
