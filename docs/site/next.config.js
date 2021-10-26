const CDN = process.env.NEXT_PUBLIC_CDN;

const withTM = require("next-transpile-modules")(
    ["@unforma-club/hooks", "@unforma-club/typetools"],
    { resolveSymlinks: true }
);

module.exports = withTM({
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: "/assets/:path*",
                destination: `${CDN}/:path*`,
            },
        ];
    },
});
