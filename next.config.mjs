import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
        return config;
    },
    images: {
        domains: ["cloudflare-ipfs.com", "avatar.alipay.com", "avatars.githubusercontent.com", "picsum.photos"]
    },
};


export default withNextIntl(nextConfig);