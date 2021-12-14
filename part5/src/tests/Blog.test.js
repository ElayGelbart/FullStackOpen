import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Blog from "../components/Blog"

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
});