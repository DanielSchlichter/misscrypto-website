# 🚀 MissCrypto - Professional Cryptocurrency Website

Professional cryptocurrency website with exchange comparison, calculators, and real-time data. Built with Next.js 15, featuring modern design and responsive layouts.

![MissCrypto Website](https://img.shields.io/badge/Status-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## ✨ Features

### 🏢 Exchange Comparison
- **Professional exchange cards** with ratings, fees, and bonuses
- **Real exchange logos** for Bitvavo, Bitpanda, Coinbase, MEXC
- **Payment method icons** (Visa, Mastercard, PayPal, SEPA, etc.)
- **Golden shimmer animations** for recommended exchanges
- **Accordion-style sections** for pros/cons and target audience

### 📊 Advanced Calculators
- **Crypto Purchase Calculator** with real-time exchange comparison
- **Investment Calculator** with historical performance data
- **Real-time crypto ticker** with price changes (24h, 7d, 30d)
- **Interactive charts** and price predictions

### 🎨 Modern Design
- **Responsive grid layouts** with mobile-first approach
- **Golden gradient theme** with professional aesthetics
- **Dark mode optimized** design
- **Smooth animations** and transitions
- **Professional typography** with optimized fonts

### 🔧 Technical Excellence
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Server-side rendering** with client-side hydration
- **API routes** with robust error handling
- **MongoDB integration** with fallback mock data
- **Optimized performance** with lazy loading

## 🏢 Supported Exchanges

| Exchange | Rating | Fees | Bonus | Features |
|----------|--------|------|-------|----------|
| **Bitvavo** | ⭐⭐⭐⭐⭐ 4.5 | 0.03% | 10€ | 190+ Cryptos, SEPA, Low Fees |
| **Bitpanda** | ⭐⭐⭐⭐ 4.25 | 0.25% | - | EU Regulated, 350+ Assets |
| **Coinbase** | ⭐⭐⭐⭐ 4.0 | 1.99% | 15€ BTC | Global Leader, High Security |
| **MEXC** | ⭐⭐⭐⭐ 3.85 | 0.1% | - | 2000+ Cryptos, Futures Trading |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB (optional - fallback data provided)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/DanielSchlichter/misscrypto-website.git
cd misscrypto-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Configure MongoDB (optional)**
```env
MONGODB_URI="your-mongodb-connection-string"
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Visit [http://localhost:3000](http://localhost:3000) to see the website.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                 # API routes
│   │   ├── coins/          # Cryptocurrency data
│   │   └── market-data/    # Market information
│   ├── components/         # React components
│   │   ├── CryptoTicker.tsx
│   │   ├── CryptoPurchaseCalculator.tsx
│   │   ├── InvestmentCalculator.tsx
│   │   └── ...
│   ├── krypto-kaufen/      # Exchange comparison page
│   └── globals.css         # Global styles
├── lib/
│   └── mongodb.ts          # Database connection
└── public/
    ├── logos/              # Exchange logos
    └── payment-icons/      # Payment method icons
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Database**: MongoDB with Mongoose
- **Deployment**: Netlify/Vercel ready
- **Icons**: Custom SVG icons + Lucide React
- **Fonts**: Geist Sans & Geist Mono

## 🌐 Deployment

### Netlify Deployment

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Netlify**
- Connect your GitHub repository
- Set build command: `npm run build`
- Set publish directory: `.next`
- Add environment variables in Netlify dashboard

### Vercel Deployment

1. **Deploy with Vercel CLI**
```bash
npx vercel
```

2. **Or connect GitHub repository**
- Import project in Vercel dashboard
- Configure environment variables
- Deploy automatically on push

## 🔧 Configuration

### Environment Variables
```env
# MongoDB (optional - fallback data provided)
MONGODB_URI=mongodb+srv://...

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

### Build Settings
```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## 📊 Performance

- **Lighthouse Score**: 95+ Performance
- **Core Web Vitals**: All passing
- **Mobile Optimized**: Responsive design
- **SEO Optimized**: Meta tags and structured data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Daniel Schlichter**
- GitHub: [@DanielSchlichter](https://github.com/DanielSchlichter)
- Website: [MissCrypto.de](https://misscrypto.de)

---

⭐ **Star this repository if you found it helpful!**
