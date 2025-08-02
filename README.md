# AlluviaMaps

Advanced mapping application for bushwalking & gold fossicking enthusiasts in Australia.

## Project Overview

AlluviaMaps provides layered mapping capabilities with premium features, user-generated content, and monetization through subscription tiers. The platform specializes in uncovering hidden tracks, trails, and historical mining sites using LiDAR data and advanced GIS features.

## Technology Stack

- **Frontend**: SvelteKit (performance and developer experience)
- **Styling**: Tailwind CSS (rapid UI development)
- **Backend**: Supabase (PostgreSQL database, authentication, real-time features)
- **Mapping**: Mapbox GL JS (vector tiles, layer management, 3D terrain)
- **Version Control**: GitHub (code management, collaboration, deployment automation)
- **Deployment**: Vercel (seamless SvelteKit deployment, global CDN)

## Core Features

### 1. Layered Mapping System
- **Street Maps**: Basic navigation layer (free)
- **Terrain**: Topographic and elevation data (free)
- **LiDAR Data**: Premium layer revealing hidden tracks and historical mining sites (premium)
- **Aerial Imagery**: High-resolution satellite imagery (basic tier)
- **User-Generated Content**: Community-shared tracks and routes (free)
- **Gold Sites Database**: Crowdsourced fossicking locations (premium)

### 2. Subscription Tiers
- **Free Tier**: Street maps, terrain, user-generated content
- **Basic Tier** ($7.50/month or $75/year): Adds aerial imagery
- **Premium Tier** ($12.50/month or $125/year): Full access including LiDAR data and gold sites database

### 3. Community Features
- User-generated track uploads and sharing
- Public/private track visibility controls
- Community-contributed gold fossicking sites
- Track rating and review system

## Development Phases

### Phase 1: Core Infrastructure
- GitHub repository setup and configuration
- SvelteKit + Tailwind + Supabase setup
- Vercel deployment configuration
- Basic authentication and subscription system
- Core mapping functionality with street and terrain layers

### Phase 2: Premium Features
- LiDAR data integration
- Aerial imagery layer
- Gold sites database
- Advanced layer controls

### Phase 3: Community Features
- User-generated content system
- Track sharing and rating
- Community forums and discussions
- Mobile optimization

### Phase 4: Advanced Features
- Offline support
- Advanced GIS analysis tools
- Historical data overlays
- Performance optimizations

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Mapbox account
- Vercel account

### Installation
```bash
# Clone the repository
git clone https://github.com/the-zedman/alluviamaps.git
cd alluviamaps

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Project Link: [https://github.com/the-zedman/alluviamaps](https://github.com/the-zedman/alluviamaps)
- Website: [https://alluviamaps.com](https://alluviamaps.com) (coming soon) 