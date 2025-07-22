import { useState, useEffect } from "react";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import Footer from "@/components/layout/Footer";
import { CardGradient } from "@/components/ui/card-gradient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Users, MessageSquare, Settings, Send, ThumbsUp, Link2, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for community posts
interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  liked?: boolean;
  votes?: number;
  voted?: "up" | "down" | null;
  replies: Reply[];
  category: "general" | "settings" | "support";
  hasTradingSettings?: boolean;
  userBadge?: "Verified" | "Expert" | "Moderator" | "New";
}

interface Reply {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  liked?: boolean;
}

// Sample community posts
const samplePosts: Post[] = [
  {
    id: 1,
    author: "TradingPro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TradingPro",
    content: "Just discovered that the BOSS indicator works best on EUR/USD with 5-minute charts during London session. 73% win rate so far!",
    timestamp: "2 hours ago",
    likes: 12,
    votes: 18,
    hasTradingSettings: true,
    userBadge: "Expert",
    replies: [
      {
        id: 101,
        author: "BinaryTrader",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BinaryTrader",
        content: "What settings are you using? I'm getting mixed results.",
        timestamp: "1 hour ago",
        likes: 3,
      },
      {
        id: 102,
        author: "TradingPro",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TradingPro",
        content: "Using 14-period RSI with 5-period EMA. Also set entry delay to 2 seconds for better execution.",
        timestamp: "45 minutes ago",
        likes: 5,
      }
    ],
    category: "settings"
  },
  {
    id: 2,
    author: "MT5Master",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MT5Master",
    content: "Welcome to all new traders! If you need help getting started with Binary Baseline, check out the Documentation page or drop your questions here.",
    timestamp: "1 day ago",
    likes: 24,
    votes: 32,
    hasTradingSettings: false,
    userBadge: "Moderator",
    replies: [
      {
        id: 201,
        author: "NewTrader2025",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NewTrader2025",
        content: "Thanks! I'm struggling with connecting MT5 to Pocket Option. Any quick tips?",
        timestamp: "22 hours ago",
        likes: 1,
      },
      {
        id: 202,
        author: "Support_Team",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Support_Team",
        content: "Make sure you've enabled API access in Pocket Option settings first. Then in MT5, ensure you're using the correct API key format. If you still have issues, check the connection guide in Documentation.",
        timestamp: "20 hours ago",
        likes: 7,
      }
    ],
    category: "support"
  },
  {
    id: 3,
    author: "BinaryOption_Expert",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BinaryOption_Expert",
    content: "Just shared my optimized settings for the Awesome Oscillator on the Telegram channel. Getting 78% accuracy on GBP/JPY! Join us there for more real-time discussions.",
    timestamp: "3 days ago",
    likes: 38,
    votes: 42,
    hasTradingSettings: true,
    userBadge: "Verified",
    replies: [
      {
        id: 301,
        author: "CryptoTrader",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoTrader",
        content: "Do these settings work for crypto pairs too?",
        timestamp: "2 days ago",
        likes: 2,
      },
      {
        id: 302,
        author: "BinaryOption_Expert",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BinaryOption_Expert",
        content: "Yes, they work well with BTC/USD but you'll need to adjust the time periods to account for higher volatility. I recommend doubling the EMA periods.",
        timestamp: "2 days ago",
        likes: 5,
      }
    ],
    category: "settings"
  }
];

export default function Community() {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [newPost, setNewPost] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [hasTradingSettings, setHasTradingSettings] = useState(false);
  const [postCategory, setPostCategory] = useState<"general" | "settings" | "support">("general");
  const { toast } = useToast();

  const filteredPosts = activeCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.trim()) return;
    
    const newPostObj: Post = {
      id: Date.now(),
      author: "You",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      votes: hasTradingSettings ? 0 : undefined,
      hasTradingSettings: hasTradingSettings,
      replies: [],
      category: postCategory,
      userBadge: "New"
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost("");
    
    toast({
      title: "Post Published",
      description: "Your message has been posted to the community.",
    });
  };

  const handleReplySubmit = (postId: number) => {
    if (!replyContent.trim()) return;
    
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newReply: Reply = {
          id: Date.now(),
          author: "You",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
          content: replyContent,
          timestamp: "Just now",
          likes: 0
        };
        
        return {
          ...post,
          replies: [...post.replies, newReply]
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    setReplyingTo(null);
    setReplyContent("");
    
    toast({
      title: "Reply Posted",
      description: "Your reply has been added to the conversation.",
    });
  };

  const handleLike = (postId: number) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
  };
  
  const handleVote = (postId: number, voteType: "up" | "down") => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        // If already voted the same way, remove vote
        if (post.voted === voteType) {
          return {
            ...post,
            votes: (post.votes || 0) + (voteType === "up" ? -1 : 1),
            voted: null
          };
        }
        
        // If voted the opposite way, change vote (counts as 2)
        else if (post.voted !== null) {
          return {
            ...post,
            votes: (post.votes || 0) + (voteType === "up" ? 2 : -2),
            voted: voteType
          };
        }
        
        // If not voted yet
        else {
          return {
            ...post,
            votes: (post.votes || 0) + (voteType === "up" ? 1 : -1),
            voted: voteType
          };
        }
      }
      return post;
    });
    
    setPosts(updatedPosts);
    
    toast({
      title: voteType === "up" ? "Upvoted" : "Downvoted",
      description: "Thank you for rating this trading setting",
    });
  };

  const handleReplyLike = (postId: number, replyId: number) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedReplies = post.replies.map(reply => {
          if (reply.id === replyId) {
            return {
              ...reply,
              likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
              liked: !reply.liked
            };
          }
          return reply;
        });
        
        return {
          ...post,
          replies: updatedReplies
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNavbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center mb-8">
            <Users className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold gradient-text">Community</h1>
          </div>
          
          <p className="text-gray-300 mb-8">
            Connect with other Binary Baseline users, share your experiences, exchange indicator settings, and get help from the community.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="md:col-span-1">
              <CardGradient className="p-4 sticky top-24">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  <Button 
                    variant={activeCategory === "all" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveCategory("all")}
                  >
                    <MessageSquare size={16} className="mr-2" />
                    All Posts
                  </Button>
                  <Button 
                    variant={activeCategory === "settings" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveCategory("settings")}
                  >
                    <Settings size={16} className="mr-2" />
                    Indicator Settings
                  </Button>
                  <Button 
                    variant={activeCategory === "support" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveCategory("support")}
                  >
                    <ThumbsUp size={16} className="mr-2" />
                    Support & Tips
                  </Button>
                  <Button 
                    variant={activeCategory === "general" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveCategory("general")}
                  >
                    <MessageSquare size={16} className="mr-2" />
                    General Discussion
                  </Button>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-800">
                  <h3 className="font-semibold mb-3">Join Telegram</h3>
                  <p className="text-sm text-gray-400 mb-3">Get real-time updates and chat with community members</p>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="https://t.me/+JmFXqobG0xIxYWMx" target="_blank" rel="noopener noreferrer">
                      <Link2 size={14} className="mr-2" />
                      Join Binary Baseline
                    </a>
                  </Button>
                </div>
              </CardGradient>
            </div>
            
            <div className="md:col-span-3 space-y-6">
              <CardGradient className="p-4">
                <form onSubmit={handlePostSubmit}>
                  <h3 className="font-semibold mb-3">Share with the community</h3>
                  <Textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your indicator settings, ask questions, or start a discussion..."
                    className="mb-4"
                    rows={3}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">Post Category</label>
                      <div className="flex space-x-2">
                        <Button 
                          type="button"
                          size="sm"
                          variant={postCategory === "general" ? "default" : "outline"}
                          onClick={() => setPostCategory("general")}
                        >
                          <MessageSquare size={14} className="mr-1" /> General
                        </Button>
                        <Button 
                          type="button"
                          size="sm"
                          variant={postCategory === "settings" ? "default" : "outline"}
                          onClick={() => setPostCategory("settings")}
                        >
                          <Settings size={14} className="mr-1" /> Settings
                        </Button>
                        <Button 
                          type="button"
                          size="sm"
                          variant={postCategory === "support" ? "default" : "outline"}
                          onClick={() => setPostCategory("support")}
                        >
                          <ThumbsUp size={14} className="mr-1" /> Support
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="hasTradingSettings"
                        checked={hasTradingSettings}
                        onChange={(e) => setHasTradingSettings(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-600 text-primary focus:ring-primary accent-primary cursor-pointer"
                      />
                      <label htmlFor="hasTradingSettings" className="text-sm font-medium cursor-pointer flex-1">
                        This post contains trading settings or parameters
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      Be respectful and follow community guidelines
                    </div>
                    <Button type="submit" disabled={!newPost.trim()}>
                      <Send size={16} className="mr-2" />
                      Post
                    </Button>
                  </div>
                </form>
              </CardGradient>
              
              {filteredPosts.length === 0 ? (
                <div className="text-center p-8 bg-secondary/20 rounded-lg">
                  <p className="text-gray-400">No posts in this category yet. Be the first to start a conversation!</p>
                </div>
              ) : (
                filteredPosts.map(post => (
                  <CardGradient key={post.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <img 
                        src={post.avatar} 
                        alt={post.author} 
                        className="w-10 h-10 rounded-full bg-secondary"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{post.author}</h4>
                            {post.userBadge && (
                              <span className={`px-2 py-0.5 text-xs rounded-full ${
                                post.userBadge === "Expert" ? "bg-blue-500/20 text-blue-400" : 
                                post.userBadge === "Verified" ? "bg-green-500/20 text-green-400" :
                                post.userBadge === "Moderator" ? "bg-purple-500/20 text-purple-400" :
                                post.userBadge === "New" ? "bg-yellow-500/20 text-yellow-400" :
                                "bg-gray-500/20 text-gray-400"
                              }`}>
                                {post.userBadge}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-400">
                            <span>{post.timestamp}</span>
                            <button className="ml-1 p-1 rounded hover:bg-secondary/50">
                              <MoreHorizontal size={16} />
                            </button>
                          </div>
                        </div>
                        <p className="my-2 text-gray-200">{post.content}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <button 
                            className={`flex items-center gap-1 text-sm ${post.liked ? 'text-primary' : 'text-gray-400'} hover:text-primary transition-colors`}
                            onClick={() => handleLike(post.id)}
                          >
                            <ThumbsUp size={14} />
                            <span>{post.likes}</span>
                          </button>
                          <button 
                            className="flex items-center gap-1 text-sm text-gray-400 hover:text-primary transition-colors"
                            onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                          >
                            <MessageSquare size={14} />
                            <span>Reply</span>
                          </button>
                          
                          {post.hasTradingSettings && (
                            <div className="flex items-center ml-2 gap-1">
                              <span className="text-xs text-gray-400">Setting Rating:</span>
                              <button 
                                className={`p-1 ${post.voted === 'up' ? 'text-green-500' : 'text-gray-400'} hover:text-green-500 transition-colors`}
                                onClick={() => handleVote(post.id, 'up')}
                                title="Works well"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                              </button>
                              <span className={`text-sm font-medium ${(post.votes || 0) > 0 ? 'text-green-500' : (post.votes || 0) < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                                {post.votes || 0}
                              </span>
                              <button 
                                className={`p-1 ${post.voted === 'down' ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors`}
                                onClick={() => handleVote(post.id, 'down')}
                                title="Doesn't work well"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                              </button>
                            </div>
                          )}
                          
                          {post.hasTradingSettings && (
                            <span className="ml-auto px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
                              Trading Settings
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Replies */}
                    {post.replies.length > 0 && (
                      <div className="mt-4 pl-12 border-l border-gray-800 space-y-4">
                        {post.replies.map(reply => (
                          <div key={reply.id} className="flex items-start gap-3">
                            <img 
                              src={reply.avatar} 
                              alt={reply.author} 
                              className="w-8 h-8 rounded-full bg-secondary"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h5 className="font-semibold text-sm">{reply.author}</h5>
                                <span className="text-xs text-gray-400">{reply.timestamp}</span>
                              </div>
                              <p className="my-1 text-sm text-gray-300">{reply.content}</p>
                              <button 
                                className={`flex items-center gap-1 text-xs ${reply.liked ? 'text-primary' : 'text-gray-400'} hover:text-primary transition-colors`}
                                onClick={() => handleReplyLike(post.id, reply.id)}
                              >
                                <ThumbsUp size={12} />
                                <span>{reply.likes}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Reply form */}
                    {replyingTo === post.id && (
                      <div className="mt-4 pl-12">
                        <div className="flex gap-2">
                          <Textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write a reply..."
                            className="flex-1 text-sm min-h-[80px]"
                          />
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setReplyingTo(null)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleReplySubmit(post.id)}
                            disabled={!replyContent.trim()}
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardGradient>
                ))
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <CardGradient className="p-6">
              <h3 className="text-xl font-bold mb-3">About Binary Baseline App</h3>
              <p className="mb-4 text-gray-300">
                The Binary Baseline app automatically creates and manages Session IDs (SSIDs) when you log in. There's no need to manually enter API keys or Session IDs.
              </p>
              <div className="bg-secondary/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">How it works:</h4>
                <ul className="text-gray-400 space-y-2 list-disc pl-5">
                  <li>Log in to your MT5 and Pocket Option accounts</li>
                  <li>Launch the Binary Baseline application</li>
                  <li>The app automatically creates new SSIDs for your session</li>
                  <li>All trading is handled securely through these session connections</li>
                </ul>
              </div>
            </CardGradient>
            
            <CardGradient className="p-6">
              <h3 className="text-xl font-bold mb-2">Community Guidelines</h3>
              <p className="mb-4 text-gray-300">Please follow these guidelines to maintain a helpful and respectful community:</p>
              <ul className="text-left text-gray-400 space-y-2 mb-4 list-disc pl-5">
                <li>Be respectful and courteous to other members</li>
                <li>Do not share personal information or contact details</li>
                <li>Share indicator settings that have been tested and verified</li>
                <li>Provide context when asking questions (platform, indicator, timeframe)</li>
                <li>Do not post spam, advertisements, or promotional content</li>
              </ul>
              <p className="text-sm text-gray-500">
                Binary Baseline moderators may remove content that violates these guidelines
              </p>
            </CardGradient>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}