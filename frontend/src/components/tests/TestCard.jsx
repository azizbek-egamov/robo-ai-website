import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const TestCard = ({ test }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={test.image}
        alt={test.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {test.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {test.description}
        </Typography>
        <Box sx={{ mt: 'auto' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            href={test.google_form_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Testni boshlash
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TestCard; 