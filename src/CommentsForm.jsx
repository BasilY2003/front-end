import { useState } from "react";
import useCommentsPOST from "../CustomHooks/useCommentsPOST";
import { usePosts } from "../PostsProvider";

const POST_URL = `http://localhost:8080/posts`;

export default function CommentsForm({id}) {
  const {setComments, comments} = usePosts()
  const [textarea, setTextArea] = useState("");
  const { postJsonData } = useCommentsPOST(`${POST_URL}/${id}/comments`);

  const addComment = () => {
  
    const commentObject = {
        commentId: 989,
      userName: "Owner", 
        postid: id, 
        likes: [],
        date: new Date().toISOString(), 
        content: textarea
      };

    postJsonData(commentObject)
      .then((res) => {
        setComments([...comments, commentObject]);
        
        setTextArea("");
      })
      .catch(error => {
        console.error("Failed to add comment:", error);
      });
  };

  return (
    <>
      <div className="my-3">
        <button className="btn btn-primary" onClick={addComment}>
          Add Comment
        </button>
        <textarea
          className="form-control mt-3"
          name="comment" 
          id=""
          cols="10"
          rows="5"
          placeholder="Write your comment here..."
          value={textarea}
          onChange={(e) => setTextArea(e.target.value)}
        ></textarea>
      </div>
    </>
  );
}
