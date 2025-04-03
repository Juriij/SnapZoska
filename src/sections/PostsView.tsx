"use client";

// React imports
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // <-- Import useSession
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Button from "@mui/material/Button";

// Server action import
import { fetchPosts } from "@/app/actions/posts";
import { toggleLike } from "@/app/actions/likes";
import { resetAllLikes } from "@/app/actions/resetLikes";

// Post interface
interface Post {
  id: string;
  userId: string;
  imageUrl: string;
  caption?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string | null;
  };
  likes: { userId: string }[];
  _count: {
    likes: number;
  };
}

const PostsView = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts: Post[] = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    loadPosts();
  }, []);

  const handleLikeClick = async (postId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!session?.user?.id || isLoading) return;
    
    setIsLoading(true);
    try {
      const isLiked = await toggleLike(postId);
      setPosts(prevPosts => 
        prevPosts.map(post => {
          if (post.id === postId) {
            const currentLikes = post._count?.likes || 0;
            return {
              ...post,
              _count: {
                ...post._count,
                likes: isLiked ? currentLikes + 1 : currentLikes - 1
              },
              likes: isLiked 
                ? [...(post.likes || []), { userId: session.user!.id }]
                : (post.likes || []).filter(like => like.userId !== session.user!.id)
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Failed to toggle like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isLikedByUser = (post: Post) => {
    if (!session?.user?.id) return false;
    return post.likes.some(like => like.userId === session.user.id);
  };

  return (
    <Container sx={{ mt: 4, mb: 8, maxWidth: 'md', pb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Príspevky
      </Typography>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              boxShadow: 2,
              overflow: 'hidden'
            }}>
              <CardMedia
                component="img"
                sx={{
                  width: '100%',
                  height: 300,
                  objectFit: 'cover'
                }}
                image={post.imageUrl}
                alt={post.caption || "Príspevok bez popisu"}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {post.user.name || "Neznámy používateľ"}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {post.caption || "Bez popisu"}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={(e) => handleLikeClick(post.id, e)}
                    disabled={isLoading || !session}
                  >
                    {isLikedByUser(post) ? (
                      <FavoriteIcon sx={{ color: 'red' }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    {post._count?.likes || 0}
                  </Typography>
                  <IconButton size="small" color="primary">
                    <ChatBubbleOutlineIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PostsView;
