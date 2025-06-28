// file: components/dashboard/Header.tsx
"use client";

// A simple header that is only visible on desktop
export const Header = () => {
  return (
    <header className="hidden md:flex h-14 items-center gap-4 border-b bg-background px-6">
      <div className="flex-1">
        {/* We can make this dynamic later */}
        <h1 className="font-semibold text-lg">Admin Panel</h1>
      </div>
    </header>
  );
};