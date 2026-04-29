# Website Praktikum Cloud-Native

Website interaktif yang menjelaskan seluruh materi 8 pertemuan praktikum Cloud-Native Application Development.

## Features

- 📚 Materi lengkap 8 pertemuan
- 🎨 Visualisasi diagram yang mudah dipahami
- 🌙 Dark/Light mode
- 📱 Responsive (Desktop & Mobile)
- ⚡ Fast & lightweight (~22 KB gzipped)
- 🖥️ Syntax highlighting untuk code examples

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Website akan terbuka di `http://localhost:3000`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Output akan ada di folder `dist/`

## Deployment

### Option 1: Static Hosting (Recommended)

Upload isi folder `dist/` ke hosting statis seperti:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

### Option 2: GitHub Pages

1. Build project: `npm run build`
2. Push folder `dist/` ke branch `gh-pages`
3. Enable GitHub Pages di repository settings

### Option 3: Local/Offline

Cukup buka file `dist/index.html` di browser.

## Project Structure

```
website/
├── index.html              # Entry point HTML
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── public/
│   └── favicon.svg         # Favicon
├── src/
│   ├── main.js             # Main JavaScript entry
│   ├── style.css           # CSS entry point
│   ├── styles/
│   │   ├── variables.css   # CSS variables & reset
│   │   ├── layout.css      # Layout styles
│   │   ├── components.css  # Component styles
│   │   └── diagrams.css    # Diagram styles
│   ├── components/
│   │   ├── sidebar.js      # Sidebar navigation
│   │   ├── theme.js        # Theme toggle
│   │   ├── codeblock.js    # Code syntax highlighting
│   │   ├── diagrams.js     # Diagram components
│   │   └── sections.js     # Section renderers
│   └── data/
│       └── content.js      # Content data (8 pertemuan)
└── dist/                   # Production build output
```

## Content Structure

Website mencakup:

1. **Overview** - Informasi mata kuliah dan roadmap
2. **Pertemuan 1** - Cloud-Native & 12-Factor App
3. **Pertemuan 2** - Docker Fundamentals
4. **Pertemuan 3** - Dockerfile Best Practices
5. **Pertemuan 4** - Docker Compose
6. **Pertemuan 5** - Container Registry
7. **Pertemuan 6** - Kubernetes Architecture
8. **Pertemuan 7** - Pods, Deployments, Services
9. **Pertemuan 8** - UTS Guidelines

## Customization

### Mengubah Konten

Edit file `src/data/content.js` untuk mengubah materi pembelajaran.

### Mengubah Style

Edit file di `src/styles/`:
- `variables.css` - Warna, font, spacing
- `layout.css` - Layout sidebar dan main content
- `components.css` - Style komponen (cards, tables, etc)
- `diagrams.css` - Style diagram

## Tech Stack

- **Vite** - Build tool & dev server
- **Vanilla JavaScript** - No framework
- **CSS3** - Custom Properties, Flexbox, Grid
- **Google Fonts** - Inter & JetBrains Mono

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Educational use - Universitas Muhammadiyah Makassar

---

Made with ❤️ by [devnolife](https://github.com/devnolife)
