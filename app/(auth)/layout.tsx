export default function AuthLauout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="max-w-[500px] w-full mx-auto">{children}</div>
    </div>
  );
}
