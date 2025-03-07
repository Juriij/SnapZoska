// src/sections/SearchView.tsx

"use client";

// React imports
import { useEffect, useState, useCallback } from "react";
import debounce from 'lodash/debounce';

// MUI imports
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useRouter } from "next/navigation";

// Server action import
import { fetchUsers } from "@/app/actions/users";

// User interface
interface User {
  id: string;
  name: string | null;
  image: string | null;
}

const SearchView = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    loadUsers();
  }, []);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (!query.trim()) {
        setFilteredUsers(users);
        return;
      }

      const searchTerm = query.toLowerCase();
      const filtered = users.filter((user) => 
        user.name?.toLowerCase().includes(searchTerm)
      );
      setFilteredUsers(filtered);
    }, 300),
    [users]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleUserClick = (userId: string) => {
    router.push(`/profil/${userId}`);
  };

  return (
    <Container sx={{ mt: 4, mb: 8, maxWidth: 'md', pb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Vyhľadávanie používateľov
      </Typography>
      
      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Vyhľadajte používateľov podľa mena..."
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
        {filteredUsers.length} {filteredUsers.length === 1 ? 'používateľ' : 'používateľov'}
      </Typography>

      {/* Users Grid */}
      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid item xs={6} sm={4} md={3} key={user.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.2s' }
              }}
              onClick={() => handleUserClick(user.id)}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  src={user.image || undefined}
                  alt={user.name || "User"}
                  sx={{ width: 80, height: 80, mb: 2 }}
                >
                  {user.name?.charAt(0) || "U"}
                </Avatar>
                <Typography variant="subtitle1" align="center">
                  {user.name || "Neznámy používateľ"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No results message */}
      {filteredUsers.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Žiadni používatelia neboli nájdení
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default SearchView;