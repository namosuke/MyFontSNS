import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  // eslint-disable-next-line
  screen_id: string;
  tags: string[];
  follow: number[];
  follower: number[];
}

interface Post {
  user: {
    id: number;
    name: string;
    // eslint-disable-next-line
    screen_id: string;
  };
  id: number;
  text: string;
}

interface Font {
  formatVersion: string;
  data: any;
  color: string;
  defaultWidth: number;
  defaultHeight: number;
  charCount: number;
}

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data } = await axios.get("./seeds/users.json");
        console.log("user tags", data[0].tags);
        setCurrentUser(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrentUser();
  }, []);

  return currentUser;
};

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("./seeds/posts.json");
        console.log("posts", data);
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return posts;
};

export const useFont = () => {
  const [font, setFont] = useState<Font>();

  useEffect(() => {
    const fetchFont = async () => {
      try {
        const { data } = await axios.get("./seeds/mfsFont.json");
        console.log("font", data);
        setFont(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFont();
  }, []);

  return font;
};

export default {
  useCurrentUser,
  usePosts,
  useFont,
};
