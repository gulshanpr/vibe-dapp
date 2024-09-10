/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: { unoptimized: true },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.wasm$/,
            type: "asset/resource",
        });
        return config;
    },

    experiments: {
        asyncWebAssembly: true,
    },
    module: {
        rules: [
            {
                test: /\.wasm$/,
                type: "webassembly/async",
            },
        ],
    },
};

export default nextConfig;
