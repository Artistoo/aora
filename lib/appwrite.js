import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

//Configuration
export const config = {
  endpoint: process.env.EXPO_PUBLIC_ENDPOINT,
  platform: process.env.EXPO_PUBLIC_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_PROJECTID,
  databaseId: process.env.EXPO_PUBLIC_DATABASEID,
  userCollectionId: process.env.EXPO_PUBLIC_USERCOLLECTIONID,
  videoCollectionId: process.env.EXPO_PUBLIC_VIDEOCOLLECTIONID,
  storageId: process.env.EXPO_PUBLIC_STORAGEID,
};

//credintials
const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

//INSTANCES
const accounts = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

//Handlers
export const CreateNewAccount = async (email, password, username) => {
  try {
    const NewAccount = await accounts.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!NewAccount) throw new Errror(`something went wrong on the backend`);
    const avatarUrl = await avatars.getInitials(username);

    const database = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        acount_id: NewAccount?.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    await Sign_in(email, password);
  } catch ({ message }) {
    throw new Error(message);
  }
};

export const Sign_in = async (email, password) => {
  try {
    const sign_in_session = await accounts.createEmailSession(email, password);
    return sign_in_session;
  } catch ({ message }) {
    throw new Error(message);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await accounts.get();
    if (!currentAccount) throw new Error(` no logged account found `);

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("acount_id", currentAccount?.$id)]
    );
    if (!currentUser) throw new Error(`no user were found `);
    return currentUser.documents[0];
  } catch ({ message: FetchingUserDataError }) {
    console.log({ FetchingUserDataError });
    return null;
  }
};

export const fetchAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );
    return posts.documents;
  } catch ({ message: FetchPostsError }) {
    console.log({ FetchPostsError });
  }
};

export const fetchLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );
    return posts.documents;
  } catch ({ message: FetchLatestPostsError }) {
    console.log({ FetchLatestPostsError });
  }
};

export const fetchSearchResults = async (query) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)]
    );
    return posts.documents;
  } catch ({ message: FetchSearchResultsError }) {
    console.log({ FetchSearchResultsError });
  }
};

export const fetchUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("creator", userId)]
    );
    return posts.documents;
  } catch ({ message: FetchUserPostsError }) {
    console.log({ FetchUserPostsError });
  }
};

export const logout = async (userId) => {
  try {
    const deleteSession = accounts.deleteSession("current");
    return deleteSession;
  } catch ({ message: LogoutError }) {
    console.log({ LogoutError });
  }
};

export const create_post = async ({
  video,
  creator,
  thumbnail,
  prompt,
  title,
  ...post
}) => {
  try {
    /* #ERR */
    if (!Object.values(post).every(Boolean)) throw new Error(`missing data`);

    //GET FILE PREVIEW
    const getPreview = async (id, type) => {
      try {
        let preview;
        if (type === "image")
          preview = storage.getFileView(config.storageId, id);
        else if (type === "video")
          preview = storage.getFilePreview(
            config.storageId,
            id,
            1500,
            1500,
            "top",
            800
          );
        else throw new Error(`invalid argument`);
        console.log({ preview });
        return preview;
      } catch ({ message }) {
        throw new Errro(`preview Error` + message);
      }
    };

    //UPLOAD FILE
    const upload_file = async (file, type) => {
      try {
        const { fileName, mimeType, filesize, uri, ...file_props } = file;
        const target_file = {
          name: fileName,
          type: mimeType,
          size: filesize,
          uri,
        };

        const upload_file = await storage.createFile(
          config.storageId,
          ID.unique(),
          target_file
        );
        if (!upload_file?.$id) throw new Error(`no id`);
        else console.log({ id: upload_file.$id });

        const preview = await getPreview(upload_file.$id, type);
        if (!preview) throw new Error(`no prview`);

        return preview;
      } catch ({ message }) {
        throw new Error(` uploading_file_error:` + message);
      }
    };

    //DESTRUCT FILE URL
    const [vid_preview, img_preview] = await Promise.all([
      upload_file(video, "video"),
      upload_file(thumbnail, "image"),
    ]);

    //UPLOAD THE FILE
    const new_post_parameter = {
      title,
      video: vid_preview,
      thumbnail: img_preview,
      prompt,
      creator,
    };
    const created_post = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      new_post_parameter
    );

    //RETURN THE NEWLY CREATED POST
    return created_post;
  } catch ({ message: create_file_error }) {
    console.log({ create_file_error });
  }
};

export const saveToBookmark = async (id, bookmarked) => {
  try {
    const result = await databases.updateDocument(
      config.databaseId,
      config.videoCollectionId,
      id,
      { bookmarked }
    );
    return result;
  } catch ({ message: saving_post_error }) {
    console.log({ saving_post_error });
  }
};

export const fetchSavedPosts = async () => {
  try {
    const bookmarked = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("bookmarked", true)]
    );

    return bookmarked.documents;
  } catch ({ message: fetchSavePostsError }) {
    console.log({ fetchSavePostsError });
  }
};
