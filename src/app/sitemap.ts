import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aseel-portfolio-eight.vercel.app'
  const routes = [
    '',
    '#about',
    '#skills',
    '#experience',
    '#contact',
  ]

  return routes.map((route) => ({
    url: ${baseUrl},
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }))
}
