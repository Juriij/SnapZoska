import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
}

interface CommentDialogProps {
  open: boolean;
  onClose: () => void;
  postId: string;
  comments: Comment[];
  onAddComment: (content: string) => Promise<void>;
}

export default function CommentDialog({ 
  open, 
  onClose, 
  comments, 
  onAddComment 
}: CommentDialogProps) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('sk-SK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAddComment(newComment);
      setNewComment('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Komentáre</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2, maxHeight: 400, overflowY: 'auto' }}>
          {comments.map((comment) => (
            <Box key={comment.id} sx={{ mb: 2, display: 'flex', gap: 2 }}>
              <Avatar src={comment.user.image || undefined}>
                {comment.user.name?.charAt(0) || '?'}
              </Avatar>
              <Box>
                <Typography variant="subtitle2">
                  {comment.user.name || 'Neznámy používateľ'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  {formatDate(comment.createdAt)}
                </Typography>
                <Typography variant="body1">{comment.content}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            placeholder="Napíšte komentár..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isSubmitting}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={!newComment.trim() || isSubmitting}
            >
              Pridať komentár
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
} 