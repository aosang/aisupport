export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center overflow-y-auto p-4">
      {children}
    </div>
  )
}
