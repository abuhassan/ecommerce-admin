export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="pt-20 flex items-center justify-center h-full">
            {children}
        </div>
    )
}

