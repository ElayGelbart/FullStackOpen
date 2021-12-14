import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Blog from "../components/Blog"
import NewBlogForm from "../components/NewBlogForm"
describe('Blog Comp Testing', () => {
  const blog = {
    title: "4test",
    author: "Tester",
    url: "http://test.test",
    likes: 10
  }
  const setNofication = jest.fn()
  function generateBlog() {
    return render(
      <Blog blog={blog} setNofication={setNofication} />
    )
  }
  it('should only render title and author', () => {
    expect(generateBlog().container).toHaveTextContent(
      '4test' && "Tester"
    )
    expect(generateBlog().container).not.toHaveTextContent(
      'http://test.test' && "10"
    )

  })
  it('should show likes and url if show more is clicked', () => {
    const Blog = generateBlog();
    const button = Blog.getByText("Show More")
    fireEvent.click(button)
    expect(Blog.container).toHaveTextContent(
      '4test' && "Tester" && 'http://test.test' && "10"
    )
  });
  it('should fire 2 like button', async () => {
    const Blog = generateBlog();
    const button = Blog.getByText("Show More")
    fireEvent.click(button)
    const LikeButton = Blog.getByText("Like")
    fireEvent.click(LikeButton)
    fireEvent.click(LikeButton)
    await waitFor(() => { expect(setNofication.mock.calls.length).toBe(2) })
  });
  const setBlogs = jest.fn()
  function generateNewBlogForm() {
    return render(
      < NewBlogForm setBlogs={setBlogs} setNofication={setNofication} />)
  }
  it('should be valid event with new blog form', async () => {
    const NewBlogForm = generateNewBlogForm();
    const LikeButton = NewBlogForm.getByTestId("Create new Blog")
    fireEvent.click(LikeButton)
    NewBlogForm.container.querySelector("#titleInput").value = "Test"
    NewBlogForm.container.querySelector("#authorInput").value = "Elay"
    NewBlogForm.container.querySelector("#urlInput").value = "http://test.com"
    const CreateBtn = NewBlogForm.getByTestId("Create new Blog2")
    fireEvent.click(CreateBtn)
    await waitFor(() => { expect(setNofication.mock.calls.length).toBe(1) })
  })
});