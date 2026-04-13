import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Blogs.css';

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "The Future of Digital Marketing in Qatar: What to Expect in 2026",
      category: "Marketing",
      date: "October 12, 2025",
      image: "/blogs/marketing.png",
      excerpt: "Explore the emerging trends in digital marketing and how Qatari businesses can leverage new technologies to stay ahead of the curve."
    },
    {
      id: 2,
      title: "Why High-End Visual Content is Non-Negotiable for Luxury Brands",
      category: "Production",
      date: "September 28, 2025",
      image: "/blogs/production.png",
      excerpt: "In a world of infinite scroll, aesthetic is everything. Learn how premium photography and video production drive real ROI."
    },
    {
      id: 3,
      title: "SEO vs Social Media: Where Should You Invest Your Budget?",
      category: "Strategy",
      date: "September 15, 2025",
      image: "/blogs/strategy.png",
      excerpt: "A comprehensive breakdown of where to allocate your marketing budget for maximum impact, comparing organic growth and paid visibility."
    }
  ];

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
