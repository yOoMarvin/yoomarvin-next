import blog from "../data/blog";

const api = {
  getBlogPostFromSlug: slug => blog.find(post => post.slug === slug)
};

export default api;
