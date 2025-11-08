# Deployment Instructions

## Option 1: Netlify Drag & Drop (Fastest)

1. Run `npm run build` to create the `dist` folder
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder to the deployment area
4. Your app will be live instantly

## Option 2: GitHub + Netlify (Recommended)

1. Create a new repository on GitHub
2. Push this code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/anime-search-app.git
   git branch -M main
   git push -u origin main
   ```
3. Connect the repository to Netlify
4. Build settings are already configured in `netlify.toml`

## Live URL
After deployment, update this section with your live URL.

## Verification Checklist
- [ ] App loads at the live URL
- [ ] Search functionality works
- [ ] Pagination works
- [ ] Anime detail pages load
- [ ] Mobile responsive design works