import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User } from 'lucide-react';
import './BlogDetail.css';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { Buffer } from 'buffer';

// Fix for gray-matter
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

const BlogDetail = () => {
  const { id: slug } = useParams();

  // Load all markdown files using absolute root path
  const blogFiles = import.meta.glob('/src/content/blogs/*.md', { query: '?raw', import: 'default', eager: true });
  
  // Find the file that matches the slug
  const filePath = Object.keys(blogFiles).find(path => path.endsWith(`${slug}.md`));
  
  if (!filePath) {
    return <div className="container" style={{ padding: '150px 0', textAlign: 'center' }}><h1>Blog not found</h1><Link to="/blogs" className="btn-sleek">BACK TO BLOGS</Link></div>;
  }

  const { data, content } = matter(blogFiles[filePath]);

  const blog = {
    ...data,
    content,
    // Ensure date is a string
    date: data.date instanceof Date ? data.date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }) : data.date,
    author: data.author || "Kensho Team",
    readTime: data.readTime || "5 min read"
  };

  return (
    <div className="blog-detail-page">
      <div className="blog-hero">
        <div className="blog-hero-overlay"></div>
        <img src={blog.image} alt={blog.title} className="blog-hero-img" />
        <div className="container">
          <div className="blog-hero-top">
            <Link to="/blogs" className="back-link">
              <div className="back-link-box">
                <ArrowLeft size={16} />
                <span>BACK</span>
              </div>
            </Link>
          </div>
          
          <div className="blog-hero-bottom">
            <h1 className="blog-main-title">{blog.title}</h1>
            <div className="blog-hero-meta-row">
              <span className="blog-category-tag">{blog.category}</span>
              <div className="blog-meta-bar">
                <div className="meta-item">
                  <User size={14} /> <span>{blog.author}</span>
                </div>
                <div className="meta-item">
                  <Clock size={14} /> <span>{blog.readTime}</span>
                </div>
                <div className="meta-item">
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="blog-article-wrapper">
          <div className="blog-article-content">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
