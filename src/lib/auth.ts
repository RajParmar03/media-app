import { validateRequest } from "./lucia-auth"
import { Session, User } from "lucia";

export type IAuth = {
    user: User,
    session: Session,
    isAuthenticated: boolean
    roles: string[]
}

export const auth = async (): Promise<IAuth> => {
    const { user, session } = await validateRequest()
    // add permissions here if needed
    return {
        user,
        session,
        isAuthenticated: !!user,
        roles: user?.roles || []
    }
}
