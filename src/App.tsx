import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import SignInForm from './_auth/forms/SignInForm';
import SignUpForm from './_auth/forms/SignUpForm';
import { Home } from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import './globals.css';

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* PUBLIC ROUTES: Everyone can see */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        {/* PRIVATE ROUTES: only if you're signed in. */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
