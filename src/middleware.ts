// import NextAuth from "next-auth";

// import authConfig from "@/lib/auth.config";

// export const { auth: middleware } = NextAuth(authConfig);

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };

import { auth } from "@/lib/auth";

export default auth((req) => {
  // Nothing to do here for now.
  // auth() protects the matched routes.
});

export const config = {
  matcher: ["/dashboard/:path*"],
};