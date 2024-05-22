import Image from "next/image";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex min-h-screen w-full justify-between">
             {children}
             <div className="auth-asset">
                <div>
                    <Image
                        width={500}
                        height={500}
                        src="/icons/auth-image.svg"
                        alt="auth-image"
                        className="-rotate-12"
                    />
                </div>
             </div>
        </main>
    );
}
