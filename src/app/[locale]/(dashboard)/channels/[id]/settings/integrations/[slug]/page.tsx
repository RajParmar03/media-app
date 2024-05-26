export default function Page({ params }: { params: { locale: string, id: string } }) {
    return (
        <div>
            Page {params.id}
        </div>
    )
}