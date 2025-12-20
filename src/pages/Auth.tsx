import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email('Email jo i vlefshëm'),
  password: z.string().min(6, 'Fjalëkalimi duhet të ketë të paktën 6 karaktere'),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate input
    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      setIsSubmitting(false);
      return;
    }

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Email ose fjalëkalim i gabuar');
        } else {
          toast.error('Gabim gjatë hyrjes');
        }
      } else {
        toast.success('Hyrje e suksesshme!');
        navigate('/');
      }
    } else {
      const { error } = await signUp(email, password);
      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('Ky email është regjistruar tashmë');
        } else {
          toast.error('Gabim gjatë regjistrimit');
        }
      } else {
        toast.success('Regjistrimi u krye me sukses!');
        navigate('/');
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img 
            src="/lovable-uploads/9ae32d82-5a3b-432f-a7b3-72384eeb9b4b.png" 
            alt="HOPE Logo" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <CardTitle className="text-2xl font-bold text-slate-800">
            {isLogin ? 'Hyrje' : 'Regjistrohu'}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? 'Identifikohu për të menaxhuar koleksionet' 
              : 'Krijo llogari të re'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Fjalëkalimi</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? 'Duke procesuar...' 
                : (isLogin ? 'Hyr' : 'Regjistrohu')}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline text-sm"
            >
              {isLogin 
                ? 'Nuk ke llogari? Regjistrohu' 
                : 'Ke llogari? Hyr'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
