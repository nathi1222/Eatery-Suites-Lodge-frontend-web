import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// In-memory user store (for demo only)
let users: any[] = [
  { 
    id: "1", 
    name: "Guest User", 
    email: "guest@example.com", 
    password: "password",
    role: "user"
  },
  { 
    id: "2", 
    name: "Admin User", 
    email: "admin@eaterysuites.co.za", 
    password: "password",
    role: "admin"
  },
];

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        
        // Find existing user
        let user = users.find((u) => u.email === credentials.email);
        
        // If user doesn't exist and we have a name (registration), create new user
        if (!user && credentials.name) {
          user = {
            id: String(users.length + 1),
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            role: "user", // Regular users get 'user' role
          };
          users.push(user);
          return user;
        }
        
        // If user exists, check password (in demo, accept any password)
        if (user && credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }
        
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-this",
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };