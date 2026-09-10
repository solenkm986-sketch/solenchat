export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white">
            SC
          </div>
          <h1 className="text-xl font-semibold text-text-primary">SolenChat</h1>
          <p className="text-sm text-text-secondary">
            Приватное пространство для вашей семьи
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          {children}
        </div>
      </div>
    </main>
  );
}
