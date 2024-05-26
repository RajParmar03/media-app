import Header from "./header";

export default function PageInnerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:ps-14">
            <Header title="Dashboardw" />
            <main className="grid w-full  flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 ">
                {children}
            </main>
        </div>
    )
}