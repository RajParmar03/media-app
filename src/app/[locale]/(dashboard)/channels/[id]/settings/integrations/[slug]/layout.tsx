export default function Layout({ children, params }: { children: React.ReactNode, params: { id: string } }) {
    return (
        <div className="">
            layout
            {children}
        </div>
    )
}