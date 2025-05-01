import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin();

const config: NextConfig = {
  reactStrictMode: true,
};

export default withVanillaExtract(config);
