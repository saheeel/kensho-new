import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Blogs.css';
import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Fix for gray-matter in some vite environments
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

const Blogs = () => {
  // Load ALL markdown files using absolute root path for Vercel consistency
  const blogFiles = import.meta.glob('/src/content/blogs/*.md', { query: '?raw', import: 'default', eager: true });
  
  console.log("Blogs found:", Object.keys(blogFiles).length);
  
  const blogs = Object.keys(blogFiles).map((path) => {
    try {
      const slug = path.split('/').pop().replace('.md', '');
      const { data } = matter(blogFiles[path]);
      
      return {
        id: slug,
        ...data,
        date: data.date instanceof Date ? data.date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }) : data.date || "No Date"
      };
    } catch (e) {
      console.error("Error parsing blog:", path, e);
      return null;
    }
  }).filter(blog => blog !== null).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="blogs-page">
      <div className="container">
        <div className="blogs-header animate-fade-in-up">
          <h1>Latest <span className="text-accent">Insights.</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Thoughts, strategies, and trends from the forefront of digital marketing.
          </p>
        </div>

        <div className="blogs-grid">
          {blogs.map((blog, index) => (
            <article key={blog.id} className={`blog-card animate-fade-in-up stagger-${index + 1}`}>
              <Link to={`/blogs/${blog.id}`} aria-label={`Read: ${blog.title}`}>
                <div className="blog-image">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="280"
                  />
                  <span className="blog-category">{blog.category}</span>
                </div>
              </Link>
              <div className="blog-content">
                <span className="blog-date">{blog.date}</span>
                <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>
                  <h3 className="blog-title">{blog.title}</h3>
                </Link>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <Link to={`/blogs/${blog.id}`} className="read-more">
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Blogs;
