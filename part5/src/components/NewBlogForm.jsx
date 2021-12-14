import { useRef, useState } from "react";

export default function NewBlogForm(props) {
  const [Expand, setExpand] = useState(false);
  const titleInput = useRef(null);
  const authorInput = useRef(null);
  const urlInput = useRef(null);

  async function createNewBlog() {
    const titleValue = titleInput.current.value;
    const authorValue = authorInput.current.value;
    const urlValue = urlInput.current.value;
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleValue,
          author: authorValue,
          url: urlValue,
        }),
      });
      if (!response.ok) {
        throw response;
      }
      const getresponse = await fetch("/api/blogs");
      if (getresponse.ok) {
        const blogs = await getresponse.json();
        console.log(blogs);
        props.setBlogs(blogs);
        return;
      }
      throw response;
    } catch (err) {
      props.setNofication({ text: "cant add", color: "red" });
    }
  }

  if (Expand) {
    return (
      <div>
        <p>
          Title:
          <input ref={titleInput} placeholder="Elay" type="text" />
        </p>
        <p>
          Author:
          <input ref={authorInput} type="text" />
        </p>
        <p>
          URL:
          <input ref={urlInput} type="text" />
        </p>
        <button
          onClick={() => {
            createNewBlog();
          }}
        >
          Create New Blog
        </button>
      </div>
    );
  } else {
    return (
      <button
        onClick={() => {
          setExpand(true);
        }}
      >
        Create new Blog
      </button>
    );
  }
}
