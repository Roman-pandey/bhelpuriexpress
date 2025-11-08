# Firebase Setup Guide for BhelpuriExpress

## Prerequisites
- Node.js and npm installed
- A Google account

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: "BhelpuriExpress"
4. Follow the setup wizard
5. Enable Google Analytics (optional)

## Step 2: Register Your Web App

1. In your Firebase project, click the web icon (</>)
2. Register app with nickname: "BhelpuriExpress Web"
3. Copy the Firebase configuration object

## Step 3: Update Firebase Configuration

1. Open `src/lib/firebase.ts`
2. Replace the placeholder values with your Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 4: Enable Firebase Authentication

1. In Firebase Console, go to Authentication
2. Click "Get Started"
3. Enable "Email/Password" sign-in method
4. Save changes

## Step 5: Create Firestore Database

1. In Firebase Console, go to Firestore Database
2. Click "Create Database"
3. Choose "Start in production mode"
4. Select a location closest to your users
5. Click "Enable"

## Step 6: Set Up Firestore Security Rules

Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Orders collection - users can create their own orders
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         request.auth.token.email == 'admin@bhelpuri.com');
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Step 7: Create Admin Account

1. Run your app: `npm run dev`
2. Go to `/auth` and sign up with email: `admin@bhelpuri.com`
3. Set a secure password
4. This account will have access to the admin dashboard

## Step 8: Deploy to Firebase Hosting (Optional)

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project:
```bash
firebase init
```
- Select "Hosting"
- Choose your existing project
- Set public directory to: `dist`
- Configure as single-page app: Yes
- Don't overwrite index.html

4. Build your app:
```bash
npm run build
```

5. Deploy:
```bash
firebase deploy
```

## Testing the Application

### As a Customer:
1. Sign up with any email (e.g., `student@college.edu`)
2. Browse products on the home page
3. Add items to cart
4. Proceed to checkout
5. Fill in delivery details
6. Place order with Cash on Delivery

### As Admin:
1. Login with `admin@bhelpuri.com`
2. Click "Admin" in the navbar
3. View all orders in real-time
4. Orders appear automatically as customers place them

## Troubleshooting

### Firebase Not Connected
- Check console for errors
- Verify Firebase config is correctly copied
- Ensure Authentication and Firestore are enabled

### Can't Place Orders
- Check Firestore security rules
- Verify you're logged in
- Check browser console for errors

### Admin Page Not Accessible
- Ensure you're logged in with `admin@bhelpuri.com`
- Check Firestore rules allow admin access

## Production Checklist

- ✅ Update Firebase config with production credentials
- ✅ Review and tighten Firestore security rules
- ✅ Enable email verification (optional)
- ✅ Set up proper admin role management
- ✅ Configure domain for Firebase Auth
- ✅ Test all user flows
- ✅ Monitor Firebase usage and billing

## Support

For Firebase documentation, visit: https://firebase.google.com/docs

## Notes

- The current setup uses email for admin identification
- For production, implement proper role-based access control
- Consider adding order status updates
- Add email notifications for order confirmations
- Implement payment gateway integration if needed
