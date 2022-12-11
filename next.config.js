/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["localhost", "telegram-copy-server.onrender.com"],
    },
    // env: {
    //     NEXT_PUBLIC_API_URl: "qwe",
    // },

    compiler: {
        // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
        styledComponents: {
            displayName: true,
            ssr: true,
        },
    },
}

module.exports = nextConfig
