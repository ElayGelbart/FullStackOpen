import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from "../components/Blog"

describe('Blog Comp Testing', () => {
  it('should only render title and author', () => {
    const blog = {
      title: "4test",
      author: "Tester",
      url: "http://test.test",
      likes: 10
    }
    const BlogComponent = render(
      <Blog blog={blog} />
    )
    expect(BlogComponent.container).toHaveTextContent(
      '4test' && "Tester"
    )
    expect(BlogComponent.container).not.toHaveTextContent(
      'http://test.test' && "10"
    )

  })
});