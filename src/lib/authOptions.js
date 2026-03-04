import { dbConnect } from "@/lib/dbConnect";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Email & Password",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter email" },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter Password",
                },
            },
            async authorize(credentials) {
                const { email, password } = credentials;
                const user = await dbConnect("users").findOne({ email });
                if (!user) return null;

                const isPasswordOk = await bcrypt.compare(password, user?.password);
                if (isPasswordOk) {
                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        image: user.image || null,
                        role: user.role || "user",
                    };
                }
                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ user, account }) {
            try {
                if (!user?.email) return false;

                if (account.provider === "google") {
                    const payload = {
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        provider: account.provider,
                        providerId: account.providerAccountId,
                        role: "user",
                        createdAt: new Date().toISOString(),
                    };

                    const isExist = await dbConnect("users").findOne({
                        email: user.email,
                    });
                    if (!isExist) {
                        await dbConnect("users").insertOne(payload);
                    }
                }
                return true;
            } catch (error) {
                console.error("Sign in error:", error);
                return false;
            }
        },

        async session({ session, token, trigger, newSession }) {
            if (token) {
                session.user.role = token.role;
                session.user.id = token.sub;

                // If 'update' was called from the client, token will eventually reflect it if we handle it in jwt.
                // We also want to pass token.name and token.image if they were updated.
                if (token.name) session.user.name = token.name;
                if (token.image) session.user.image = token.image;
            }
            return session;
        },

        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.email = user.email;
                token.role = user.role || "user";
            }

            // Handle session updates (e.g. from the Profile page)
            if (trigger === "update" && session) {
                if (session.name) token.name = session.name;
                if (session.image) token.image = session.image;
            }

            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
