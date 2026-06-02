import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Background } from './Background';

export function Layout() {
  return (
    <div className="min-h-screen bg-primary relative">
      <Background />
      <Navbar />
      <main className="relative z-10 pt-16">
        <Outlet />
      </main>
      <footer className="relative z-10 border-t border-white/5 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-light rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-semibold">
                Sah<span className="text-accent">AI</span> Guru X
              </span>
            </div>
            <p className="text-white/40 text-sm">
              © 2025 SahAI Guru X — AI Learning Twin for Rural Education
            </p>
            <div className="flex items-center gap-4">
              <span className="text-white/40 text-sm">Made with ❤️ for rural students</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
