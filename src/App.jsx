import {  useState, useEffect } from "react";
import "./App.css";
import max from './assets/max.jpg';
import girl from './assets/girl.jpg';
import NewPost from "./Components/AddNewPost/NewPost";
import Post from "./Components/Post/Post";

function App() {
  const [ArrayOfObjects, setArrayOfObjects] = useState([]);
  useEffect(() => {
      function CallApi() {
      fetch("http://localhost:3000/post")
      .then((response) => {
        return response.json();
      })
      .then((finalResult) => {
        setArrayOfObjects(finalResult);
      });
    }
    CallApi();
    }, []);
    

  function addNewPost(PostContent) {

    let newPostObject = {
      likes: 0,
      time: 'Now',
      photo:<img src={girl}/>,
      content: PostContent,
      id: ArrayOfObjects.length + 1,
      username: "maxblagun",
      comments: [],
    };


    let newArrayofobjects = [...ArrayOfObjects, newPostObject];


    setArrayOfObjects(newArrayofobjects);
  }


  function deleteItem(PostId) {
    const newArrayAfterDelete = ArrayOfObjects.filter((post) => {
      return post.id != PostId;
    });
    setArrayOfObjects(newArrayAfterDelete);
  }


  function addNewComment(commentContent, id) {
    let myOldPost = ArrayOfObjects.filter((post) => post.id == id)[0];
    let oldCommentCount = myOldPost.comments.length;
    let newCommentObject = {
      commentContent: commentContent,
      commentid: oldCommentCount + 1,
      commentPhoto:{max}
    };
    let newArrayAfterUpdate = ArrayOfObjects.map((currentPost) => {
      if (currentPost.id == id) {
        currentPost.comments.push(newCommentObject);
      }
      return currentPost;
    });
    setArrayOfObjects(newArrayAfterUpdate);
  }


  function deleteComment(postid, commentid) {
    let newArrayAfterCommentDelted = ArrayOfObjects.map((post) => {
      if (post.id == postid) {
        let newArrayOfComments = post.comments.filter((comment) => {
          return comment.commentid != commentid;
        });

        return { ...post, comments: newArrayOfComments };
      }

      return post;
    });

    setArrayOfObjects(newArrayAfterCommentDelted);
  }

  
  function updateComment(NewContent, postid, commentid) {
    let newArrayAfterCommentUpdated = ArrayOfObjects.map((post) => {
      if (post.id == postid) {
        let newArrayofCommentsAfterUpdate = post.comments.map((comment) => {
          if (comment.commentid == commentid) {
            return { ...comment, commentContent: NewContent };
          }
          return comment;
        });

        post = { ...post, comments: newArrayofCommentsAfterUpdate };
      }

      return post;
    });

    setArrayOfObjects(newArrayAfterCommentUpdated);
  }
  return (
    <>
      <div id="PostsWrapper">
        {ArrayOfObjects.map((post) => {
          return (
            <Post
              UniqueID={post.id}
              key={post.id}
              likes={post.likes}
              photo={post.photo}
              time={post.time}
              content={post.content}
              username={post.username}
              comments={post.comments}
              addNewComment={addNewComment}
              delteItem={deleteItem}
              deleteComment={deleteComment}
              updateComment={updateComment}
            ></Post>
          );
        })}
      </div>

      <NewPost AddnewPostInsideArray={addNewPost}></NewPost>
    </>
  );
}

export default App;
