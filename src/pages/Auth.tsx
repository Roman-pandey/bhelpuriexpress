import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { z } from 'zod';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";


const authSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address' }).max(255),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }).max(100),
});

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showReset, setShowReset] = useState(false);

  const { signup, login, currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (currentUser) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (isSignup: boolean) => {
    try {
      // Validate input
      const result = authSchema.safeParse({ email, password });
      if (!result.success) {
        toast.error(result.error.errors[0].message);
        return;
      }

      setLoading(true);
      if (isSignup) {
        await signup(email.trim(), password);
        toast.success('Account created successfully!');
      } else {
        await login(email.trim(), password);
        toast.success('Logged in successfully!');
      }
      navigate('/');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email already in use. Please login instead.');
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        toast.error('Invalid email or password');
      } else if (error.code === 'auth/invalid-credential') {
        toast.error('Invalid credentials. Please check your email and password.');
      } else {
        toast.error(error.message || 'Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  // 👇 Add this directly below handleSubmit
const handlePasswordReset = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!resetEmail.trim()) {
    toast.error("Please enter your email address.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, resetEmail.trim());
    toast.success("Password reset email sent! Check your inbox.");
    setShowReset(false);
    setResetEmail("");
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      toast.error("No user found with that email.");
    } else {
      toast.error("Failed to send reset email. Please try again.");
    }
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">BhelpuriExpress</CardTitle>
          <CardDescription className="text-center">
            Login or create an account to order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(false);
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your.email@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
                <p className="text-sm text-center mt-2">
  <button
    type="button"
    onClick={() => setShowReset(true)}
    className="text-blue-600 hover:underline"
  >
    Forgot Password?
  </button>
</p>

              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(true);
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your.email@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating account...' : 'Sign Up'}
                </Button>
              </form>
            </TabsContent>
            {showReset && (
  <div className="mt-6 p-4 border rounded-md bg-gray-50">
    <h3 className="text-lg font-semibold mb-3 text-center">
      Reset Password
    </h3>
    <form onSubmit={handlePasswordReset} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reset-email">Email</Label>
        <Input
          id="reset-email"
          type="email"
          placeholder="your.email@college.edu"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Send Reset Email
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => setShowReset(false)}
      >
        Back to Login
      </Button>
    </form>
  </div>
)}

          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
