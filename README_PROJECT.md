# BhelpuriExpress 🌶️

A fully functional e-commerce website for selling Bhelpuri (Indian street food) in a college campus. Built with React, Firebase, and Tailwind CSS.

## 🚀 Features

### For Customers
- **User Authentication**: Sign up and login with email/password
- **Product Catalog**: Browse 3 delicious Bhelpuri variants (₹50, ₹80, ₹100)
- **Shopping Cart**: Add/remove items, adjust quantities
- **Easy Checkout**: Simple form for hostel delivery details
- **Cash on Delivery**: No online payment hassles
- **Mobile Responsive**: Works perfectly on all devices

### For Admin
- **Real-time Order Dashboard**: View all orders instantly
- **Order Details**: Customer info, items, delivery address
- **Order Tracking**: Monitor order status

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Backend**: Firebase (Auth + Firestore)
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context API
- **Toast Notifications**: Sonner

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Firebase
Follow the detailed guide in `FIREBASE_SETUP.md` to:
- Create a Firebase project
- Enable Authentication and Firestore
- Update `src/lib/firebase.ts` with your config

### 3. Run Development Server
```bash
npm run dev
```

The app will open at `http://localhost:8080`

## 🔐 Security Features

- ✅ **Input Validation**: All forms use Zod schema validation
- ✅ **Email/Password Validation**: Prevents invalid credentials
- ✅ **Protected Routes**: Authentication required for cart/checkout
- ✅ **Firestore Security Rules**: Proper access control
- ✅ **No Sensitive Logging**: Credentials never logged to console

## 📱 Pages

- `/` - Home page with hero section and products
- `/auth` - Login/Signup page
- `/cart` - Shopping cart
- `/checkout` - Order placement form
- `/admin` - Admin dashboard (requires admin@bhelpuri.com)

## 🎨 Design System

The project uses a custom design system with:
- **Primary Color**: Warm orange (#FF6B35) - street food vibes
- **Secondary Color**: Golden yellow
- **Accent Color**: Deep red
- **Semantic Tokens**: All colors defined in `index.css`
- **Component Variants**: Custom button styles (default, hero, secondary)

## 🧪 Testing Instructions

### As a Customer:
1. Go to `/auth` and sign up
2. Browse products on home page
3. Add items to cart
4. Go to cart and adjust quantities
5. Proceed to checkout
6. Fill in delivery details (name, mobile, hostel, room)
7. Place order with COD

### As Admin:
1. Sign up/login with `admin@bhelpuri.com`
2. Click "Admin" in navbar
3. View all orders in real-time
4. See customer details and order items

## 📝 Firebase Setup Checklist

- [ ] Create Firebase project
- [ ] Enable Email/Password authentication
- [ ] Create Firestore database
- [ ] Set up security rules
- [ ] Update `src/lib/firebase.ts` with your config
- [ ] Create admin account (admin@bhelpuri.com)
- [ ] Test user signup and login
- [ ] Test order placement
- [ ] Verify admin dashboard access

## 🚀 Deployment

### Option 1: Firebase Hosting
```bash
npm run build
firebase deploy
```

### Option 2: Vercel/Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder

## 📂 Project Structure

```
src/
├── assets/              # Generated Bhelpuri images
├── components/          
│   ├── ui/             # shadcn/ui components
│   ├── Navbar.tsx      # Navigation bar
│   └── ProductCard.tsx # Product display card
├── contexts/           
│   ├── AuthContext.tsx # Firebase auth management
│   └── CartContext.tsx # Shopping cart state
├── lib/
│   ├── firebase.ts     # Firebase configuration
│   └── utils.ts        # Utility functions
├── pages/
│   ├── Home.tsx        # Landing page
│   ├── Auth.tsx        # Login/Signup
│   ├── Cart.tsx        # Shopping cart
│   ├── Checkout.tsx    # Order placement
│   ├── Admin.tsx       # Admin dashboard
│   └── Layout.tsx      # Page layout wrapper
├── index.css           # Design system tokens
└── App.tsx             # Main app with routes
```

## 🔧 Configuration Files

- `src/lib/firebase.ts` - **IMPORTANT**: Update with your Firebase credentials
- `tailwind.config.ts` - Tailwind configuration
- `index.css` - Design system (colors, gradients, shadows)

## 💡 Tips

- The admin email is hardcoded as `admin@bhelpuri.com` for simplicity
- All images are AI-generated and optimized
- Cart persists in memory (not localStorage)
- Orders are stored in Firestore with timestamps
- Real-time updates use Firestore's `onSnapshot`

## 🐛 Troubleshooting

### Firebase errors?
- Check console for specific error codes
- Verify Firebase config is correct
- Ensure Auth and Firestore are enabled

### Can't see orders in admin?
- Make sure you're logged in as admin@bhelpuri.com
- Check Firestore security rules
- Verify orders collection exists

### Images not loading?
- Check if images are in `src/assets/`
- Verify imports are using ES6 syntax
- Run `npm run dev` to rebuild

## 📚 Learn More

- [Firebase Docs](https://firebase.google.com/docs)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## 🙏 Credits

Built with ❤️ using Lovable.dev
