'use client';

import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import Image from 'next/image';

interface TestCardProps {
  test: {
    id: number;
    name: string;
    image: string;
    description: string;
    google_form_link: string;
  };
}

export default function TestCard({ test }: TestCardProps) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'relative', height: 200 }}>
        <Image
          src={test.image}
          alt={test.name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>
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
} 