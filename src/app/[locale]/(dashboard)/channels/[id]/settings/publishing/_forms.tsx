import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function PublishSettingsForm() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Publising</CardTitle>
                <CardDescription>
                    Used to identify your store in the marketplace.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <Input placeholder="Store Name" />
                </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
            </CardFooter>
        </Card>
    )
}
