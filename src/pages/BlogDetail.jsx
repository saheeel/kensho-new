import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Share2 } from 'lucide-react';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();

  // Mock data - in a real app, you'd fetch this based on the ID
  const blogs = [
    {
      id: 1,
      title: "The Future of Digital Marketing in Qatar: What to Expect in 2026",
      category: "Marketing",
      date: "October 12, 2025",
      author: "Sarah Ahmed",
      readTime: "8 min read",
      image: "/blogs/marketing.png",
      content: `
        <p>The digital landscape in Qatar is shifting at an unprecedented pace. As we approach 2026, the convergence of AI, immersive technologies, and hyper-localized content is redefining how brands communicate with their audiences.</p>
        
        <h3>1. The Rise of AI-Powered Personalization</h3>
        <p>Marketing is no longer about broad strokes. It's about precision. Qatari businesses are increasingly adopting AI tools to analyze consumer behavior in real-time, allowing for personalized experiences that resonate on a cultural and individual level. From automated chat ecosystems to predictive shopping trends, AI is the backbone of the future.</p>
        
        <h3>2. Short-Form Video Dominance</h3>
        <p>Attention spans are shrinking, but engagement is peaking through short-form video content. Platforms like TikTok and Instagram Reels have become the primary search engines for the younger generation in Doha. Brands that fail to master cinematic, high-energy vertical video will find themselves invisible.</p>
        
        <h3>3. The 'Phygital' Experience</h3>
        <p>Convergence of physical and digital spaces is becoming the norm. Expect to see more AR-integrated marketing in flagship stores across Msheireb and Lusail, where digital storytelling enhances the physical luxury shopping experience.</p>
        
        <p>Conclusion: Staying ahead in 2026 requires more than just following trends—it requires defining them through innovation and cultural authenticity.</p>
      `
    },
    {
      id: 2,
      title: "Why High-End Visual Content is Non-Negotiable for Luxury Brands",
      category: "Production",
      date: "September 28, 2025",
      author: "Marcus Chen",
      readTime: "6 min read",
      image: "/blogs/production.png",
      content: `
        <p>In the luxury sector, your visual content isn't just marketing—it is the product. High-end visual storytelling acts as the ultimate gatekeeper of brand equity.</p>
        
        <h3>The Psychology of Aesthetics</h3>
        <p>Luxury is about emotion, aspiration, and exclusivity. When a potential client views your brand, the quality of your lighting, the precision of your color grade, and the fluidity of your camera movements communicate your brand's value before a single word is read.</p>
        
        <h3>Cinematic Production vs. Amateur Content</h3>
        <p>While "lo-fi" content has its place in social media, luxury brands require the polish of cinematic production. This means using high-end cinema glass, professional lighting setups, and meticulous post-production workflows. It's the difference between being noticed and being remembered.</p>
        
        <p>At Kensho Media, we treat every frame as a piece of art. Because in the luxury world, if it doesn't look premium, it isn't premium.</p>
      `
    },
    {
      id: 3,
      title: "SEO vs Social Media: Where Should You Invest Your Budget?",
      category: "Strategy",
      date: "September 15, 2025",
      author: "Layla Hassan",
      readTime: "10 min read",
      image: "/blogs/strategy.png",
      content: `
        <p>The age-old debate continues: do you build for the search engine or for the social feed? In 2025, the answer is neither—and both.</p>
        
        <h3>The Long-Term Asset: SEO</h3>
        <p>SEO is the architectural foundation of your digital presence. It provides compounding returns over time. A well-optimized site in the Qatari market ensures that when high-intent customers search for your premium services, you are the first name they see.</p>
        
        <h3>The Immediate Wave: Social Media</h3>
        <p>Social media is your brand's pulse. It's where you build community, test ideas, and drive immediate traffic. It's fast, reactive, and essential for staying relevant in the "now."</p>
        
        <h3>The Hybrid Strategy</h3>
        <p>The most successful brands we work with use a 60/40 split. 60% of efforts go into long-term organic visibility (SEO & Content Architecture), while 40% drives aggressive community growth through social channels. They feed each other: great social content drives search volume, and great SEO provides the credibility that social audiences demand.</p>
      `
    }
  ];

  const blog = blogs.find(b => b.id === parseInt(id)) || blogs[0];

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
          <div className="blog-article-content" dangerouslySetInnerHTML={{ __html: blog.content }}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
