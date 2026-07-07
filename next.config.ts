import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Every page here is dynamic (auth runs on every request) and content
    // is admin-editable. Without this, Next's client-side Router Cache can
    // show a page as it looked up to ~30s ago when navigating back to it —
    // which reads as "my edit didn't save" even though it did. Forces a
    // fresh server fetch on every navigation to a dynamic route instead.
    staleTimes: {
      dynamic: 0,
    },
  },
};

export default nextConfig;
