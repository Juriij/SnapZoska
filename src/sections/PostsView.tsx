"use client";

// React imports
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // <-- Import useSession
import { likePost, unlikePost } from "@/app/actions/posts";

// MUI imports
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

// Server action import
import { fetchPosts } from "@/app/actions/posts";

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
  _count: {
    likes: number;
  };
}

const PostsView = () => {
  const { data: session } = useSession(); // <-- Use the session here
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

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

  // Handle like/unlike in PostsView.tsx
  const handleLike = async (postId: string) => {
    try {
      await likePost(session.user.id, postId); // Call the API to like the post
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, _count: { likes: post._count.likes + 1 } } : post
      ));
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  const handleUnlike = async (postId: string) => {
    try {
      await unlikePost(session.user.id, postId); // Call the API to unlike the post
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, _count: { likes: post._count.likes - 1 } } : post
      ));
    } catch (error) {
      console.error("Error unliking post", error);
    }
  };

  return (
    <Container sx={{ mt: 4, maxWidth: 'md' }}>
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
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => {
                      if (likedPosts.has(post.id)) {
                        handleUnlike(post.id);
                      } else {
                        handleLike(post.id);
                      }
                    }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
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
