import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Abdullah Arif - Full Stack Developer Portfolio',
    short_name: 'Abdullah Arif',
    description:
      'Personal portfolio of Abdullah Arif, Full Stack Web Developer specializing in React, Next.js, and modern MERN stack applications.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/me.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  };
}
