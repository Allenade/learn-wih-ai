    // /** @type {import('next').NextConfig} */
    // const nextConfig = {};

    // export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      // Add rule for .node files
      config.module.rules.push({
        test: /\.node$/,
        use: 'node-loader',  // Use node-loader for .node files
      });
  
      // Exclude 'onnxruntime-node' from bundling
      config.externals = config.externals || [];
      config.externals.push({
        'onnxruntime-node': 'commonjs onnxruntime-node',
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  