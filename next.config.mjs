// import *as global from "./src/app/globalNameVariables.js"

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: { unoptimized: true },
    basePath: '/warfarm'
};

export default nextConfig;