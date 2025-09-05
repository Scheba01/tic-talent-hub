import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        navigate("/registro-talento");
      }
    };
    checkUser();

    // Check for error parameters first
    const error = searchParams.get('error');
    const error_code = searchParams.get('error_code');
    const error_description = searchParams.get('error_description');
    
    if (error) {
      console.log('Auth error detected:', { error, error_code, error_description });
      
      if (error_code === 'otp_expired') {
        toast.error(t('auth.token_expired'));
        setShowPasswordReset(true); // Show password reset form to try again
      } else if (error === 'access_denied') {
        toast.error(t('auth.access_denied'));
      } else {
        toast.error(error_description || t('auth.auth_error'));
      }
      
      // Clear the error parameters from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
      return;
    }

    // Check if this is a password reset link (success case)
    const access_token = searchParams.get('access_token');
    const refresh_token = searchParams.get('refresh_token');
    const type = searchParams.get('type');
    
    if (access_token && refresh_token && type === 'recovery') {
      setIsResetMode(true);
      // Set the session from the URL params
      supabase.auth.setSession({
        access_token,
        refresh_token,
      });
    }
  }, [navigate, searchParams, t]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(t('auth.password_mismatch'));
      return;
    }
    
    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/auth`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: nombreCompleto,
          }
        }
      });

      if (error) {
        if (error.message.includes("already been registered") || 
            error.message.includes("User already registered") ||
            error.message.includes("already exists")) {
          toast.error(t('auth.email_already_registered'));
        } else if (error.message.includes("Password should be")) {
          toast.error(t('auth.password_requirements'));
        } else {
          toast.error(error.message);
        }
      } else {
        // Check if user was created or already exists
        if (data.user && data.user.email_confirmed_at) {
          // User already exists and is confirmed
          toast.error(t('auth.email_already_registered'));
        } else if (data.user && !data.user.email_confirmed_at) {
          // New user created, needs confirmation
          toast.success(t('auth.signup_success'));
          // Switch to login tab
          const loginTab = document.querySelector('[data-value="login"]') as HTMLElement;
          loginTab?.click();
        } else {
          // Fallback success message
          toast.success(t('auth.signup_success'));
          const loginTab = document.querySelector('[data-value="login"]') as HTMLElement;
          loginTab?.click();
        }
      }
    } catch (error: any) {
      toast.error(t('auth.create_account_error'));
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error(t('auth.invalid_credentials'));
        } else if (error.message.includes("Email not confirmed")) {
          toast.error(t('auth.email_not_confirmed'));
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success(t('auth.welcome_back'));
        navigate("/registro-talento");
      }
    } catch (error: any) {
      toast.error(t('auth.login_error'));
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error(t('auth.password_mismatch'));
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error(t('auth.password_min_length'));
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success(t('auth.password_updated'));
        setIsResetMode(false);
        navigate("/registro-talento");
      }
    } catch (error: any) {
      toast.error(t('auth.password_update_error'));
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error(t('auth.email_required'));
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success(t('auth.password_reset_sent_detailed'));
        setShowPasswordReset(false);
      }
    } catch (error: any) {
      toast.error(t('auth.password_reset_error'));
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <img 
              src="/lovable-uploads/d7b9699f-31e6-4a94-a4ae-696ec5740e15.png" 
              alt="TIC SELECT" 
              className="h-12 w-auto mx-auto"
            />
          </Link>
          <h1 className="text-2xl font-display font-bold text-foreground">
            {t('auth.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('auth.subtitle')}
          </p>
        </div>

        <Card>
          <CardHeader className="text-center pb-4">
            <CardTitle>
              {isResetMode ? t('auth.reset_password_title') : t('auth.card_title')}
            </CardTitle>
            <CardDescription>
              {isResetMode ? t('auth.reset_password_description') : t('auth.card_description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isResetMode ? (
              // Password Reset Form
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">{t('auth.new_password')}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="new-password"
                      type="password"
                      placeholder={t('auth.password_placeholder')}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-new-password">{t('auth.confirm_new_password')}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="confirm-new-password"
                      type="password"
                      placeholder={t('auth.password_placeholder')}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? t('auth.updating') : t('auth.update_password')}
                </Button>
              </form>
            ) : (
              // Regular Login/Signup Tabs
              <>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login" data-value="login">{t('auth.login_tab')}</TabsTrigger>
                    <TabsTrigger value="signup">{t('auth.signup_tab')}</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">{t('auth.email')}</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder={t('auth.email_placeholder')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">{t('auth.password')}</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="login-password"
                            type="password"
                            placeholder={t('auth.password_placeholder')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setShowPasswordReset(true)}
                          className="text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          {t('auth.forgot_password')}
                        </button>
                      </div>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? t('auth.login_loading') : t('auth.login_button')}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">{t('auth.full_name')}</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="signup-name"
                            type="text"
                            placeholder={t('auth.name_placeholder')}
                            value={nombreCompleto}
                            onChange={(e) => setNombreCompleto(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">{t('auth.email')}</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder={t('auth.email_placeholder')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">{t('auth.password')}</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder={t('auth.password_placeholder')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10"
                            required
                            minLength={6}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">{t('auth.confirm_password')}</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder={t('auth.password_placeholder')}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pl-10"
                            required
                            minLength={6}
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? t('auth.signup_loading') : t('auth.signup_button')}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                {/* Password Reset Modal */}
                {showPasswordReset && (
                  <div className="mt-6 p-4 border rounded-lg bg-muted/50">
                    <h3 className="text-lg font-semibold mb-4">{t('auth.reset_password_title')}</h3>
                    <form onSubmit={handlePasswordReset} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="reset-email">{t('auth.email')}</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="reset-email"
                            type="email"
                            placeholder={t('auth.email_placeholder')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" disabled={loading} className="flex-1">
                          {loading ? t('auth.sending') : t('auth.send_reset_link')}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setShowPasswordReset(false)}
                          className="flex-1"
                        >
                          {t('auth.cancel')}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </>
            )}

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">
                {t('auth.back_home')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;