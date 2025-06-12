import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {hostname:'img.clerk'}
    ]
  }
  /* config options here */
};

export default nextConfig;
