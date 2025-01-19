module.exports = {
    webpack: (config, env) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            url: require.resolve('url/'),
        };
        return config;
    },
};
