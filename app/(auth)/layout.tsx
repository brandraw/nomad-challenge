export default function AuthLauout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-2">
      <div className="max-w-[500px] w-full mx-auto rounded-xl px-5 py-10 shadow-sm border">
        {children}
      </div>
    </div>
  );
}
