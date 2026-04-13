import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Blogs.css';

// Custom lightweight parser to avoid "Buffer" errors in browser
const parseFrontmatter = (fileContent) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);
  if (!match) return { data: {}, content: fileContent };

  const frontmatterBlock = match[1];
  const content = match[2];
  const data = {};

  frontmatterBlock.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      let value = valueParts.join(':').trim();
      // Remove surrounding quotes
      value = value.replace(/^["'](.*)["']$/, '$1');
      data[key.trim()] = value;
    }
  });

  return { data, content };
};

const Blogs = () => {
  // Load ALL markdown files from the content folder
  const blogFiles = import.meta.glob('../content/blogs/*.md', { query: '?raw', eager: true });
  
  const blogs = Object.keys(blogFiles).map((path) => {
    try {
      const slug = path.split('/').pop().replace('.md', '');
      const { data } = parseFrontmatter(blogFiles[path]);
      
      return {
        id: slug,
        ...data,
        rawDate: data.date ? new Date(data.date) : new Date(0),
        date: data.date ? new Date(data.date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }) : "No Date"
      };
    } catch (e) {
      console.error("Error parsing blog:", path, e);
      return null;
    }
  }).filter(blog => blog !== null).sort((a, b) => b.rawDate - a.rawDate);

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
              <Link to={`/blogs/${blog.id}`}>
                <div className="blog-image">
                  <img src={blog.image} alt={blog.title} />
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
