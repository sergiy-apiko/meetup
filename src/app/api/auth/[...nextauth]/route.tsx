import { getUserByEmail } from '@/actions/user'
import { verifyPassword } from '@/utils/password'
import NextAuth from 'next-auth'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                if (!credentials) return null
                const user = await getUserByEmail(credentials?.email)
                if (!user) {
                    return null
                }
                const isPassValid = await verifyPassword(
                    credentials.password,
                    user.password
                )

                if (!isPassValid) return null

                // Return null if user data could not be retrieved
                return {
                    id: user.id,
                    name: user.username,
                    email: user.email,
                }
            },
        }),
    ],
    pages: {
        signIn: '/sign-in',
    },
    callbacks: {
        jwt: ({ token, ...params }) => {
            if (params.user) {
                token.name = params.user.name
            }
            return token
        },
        session: ({ session }) => {
            return session
        },
    },
    session: {
        strategy: 'jwt',
    },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
