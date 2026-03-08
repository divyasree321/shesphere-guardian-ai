import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ThumbsUp, Share2, Send } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Post {
  author: string;
  time: string;
  text: string;
  likes: number;
  comments: number;
  liked: boolean;
  showComments: boolean;
}

const initialPosts: Post[] = [
  { author: "Meera S.", time: "2h ago", text: "Just got promoted to Lead Engineer! 🎉 SheSphere's career module helped me prepare for the interview.", likes: 42, comments: 8, liked: false, showComments: false },
  { author: "Riya K.", time: "5h ago", text: "Looking for co-founders for my EdTech startup. Anyone interested in building something amazing together?", likes: 28, comments: 15, liked: false, showComments: false },
  { author: "Anjali M.", time: "1d ago", text: "Completed the Data Science roadmap suggested by SkillRise AI. Already got 3 interview calls! 💪", likes: 65, comments: 12, liked: false, showComments: false },
];

const CommunityPage = () => {
  const { toast } = useToast();
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const createPost = () => {
    if (!newPost.trim()) return;
    setPosts([
      { author: "Divya S.", time: "Just now", text: newPost, likes: 0, comments: 0, liked: false, showComments: false },
      ...posts,
    ]);
    setNewPost("");
    toast({ title: "📝 Post Created!", description: "Your post is now visible to the community." });
  };

  const toggleLike = (index: number) => {
    setPosts((prev) => prev.map((p, i) =>
      i === index ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const toggleComments = (index: number) => {
    setPosts((prev) => prev.map((p, i) =>
      i === index ? { ...p, showComments: !p.showComments } : p
    ));
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold mb-2 flex items-center gap-2">
          <MessageCircle className="h-7 w-7 text-secondary" /> Community
        </h1>
        <p className="text-muted-foreground mb-6">Share, inspire, and support each other</p>

        {/* New Post */}
        <GlassCard hover={false} className="mb-6">
          <Textarea
            placeholder="Share something inspiring..."
            className="bg-muted/50 border-border/50 mb-3 resize-none"
            rows={3}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <div className="flex justify-end">
            <GlowButton size="sm" onClick={createPost}><Send className="h-4 w-4" /> Post</GlowButton>
          </div>
        </GlassCard>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard hover={false}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{post.author[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                </div>
                <p className="text-sm mb-4">{post.text}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <button
                    className={`flex items-center gap-1 transition-colors ${post.liked ? "text-primary font-semibold" : "hover:text-primary"}`}
                    onClick={() => toggleLike(i)}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" /> {post.likes}
                  </button>
                  <button
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                    onClick={() => toggleComments(i)}
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> {post.comments}
                  </button>
                  <button
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                    onClick={() => toast({ title: "🔗 Link Copied!", description: "Post link copied to clipboard." })}
                  >
                    <Share2 className="h-3.5 w-3.5" /> Share
                  </button>
                </div>
                {post.showComments && (
                  <div className="mt-4 pt-3 border-t border-border">
                    <div className="flex gap-2">
                      <Input placeholder="Write a comment..." className="bg-muted/50 text-sm" />
                      <GlowButton size="sm" onClick={() => { toggleComments(i); toast({ title: "Comment Added!" }); }}>Send</GlowButton>
                    </div>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default CommunityPage;
