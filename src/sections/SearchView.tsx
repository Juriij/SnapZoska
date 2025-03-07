// src/sections/SearchView.tsx

"use client";

// React imports
import { useEffect, useState, useCallback } from "react";
import debounce from 'lodash/debounce';

// MUI imports
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
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
}

const SearchView = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all posts on component mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts: Post[] = await fetchPosts();
        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    loadPosts();
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (!query.trim()) {
        setFilteredPosts(posts);
        return;
      }

      const searchTerm = query.toLowerCase();
      const filtered = posts.filter((post) => {
        const captionMatch = post.caption?.toLowerCase().includes(searchTerm);
        const userNameMatch = post.user.name?.toLowerCase().includes(searchTerm);
        return captionMatch || userNameMatch;
      });
      setFilteredPosts(filtered);
    }, 300),
    [posts]
  );

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <Container sx={{ mt: 4, maxWidth: 'md' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Vyhľadávanie
      </Typography>
      
      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Vyhľadajte príspevky podľa textu alebo autora..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Results count */}
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {filteredPosts.length} {filteredPosts.length === 1 ? 'výsledok' : 'výsledkov'}
      </Typography>

      {/* Posts Grid */}
      <Grid container spacing={3}>
        {filteredPosts.map((post) => (
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
                  <IconButton size="small" color="primary">
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

      {/* No results message */}
      {filteredPosts.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Žiadne výsledky neboli nájdené
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default SearchView;