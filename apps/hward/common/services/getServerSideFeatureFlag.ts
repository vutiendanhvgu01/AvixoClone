import { flagsClient, getFrontendFlags } from '@unleash/nextjs';

type IConfig = Parameters<typeof getFrontendFlags>[0];

/**
 * Get feature flags from Unleash Proxy on server-side
 *
 * NOTE: This should only be used in `getServerSideProps` (or any server-side code)
 */
async function getServerSideFeatureFlag(key: string, config?: IConfig) {
  const { toggles } = await getFrontendFlags(config);
  const flags = flagsClient(toggles);

  return {
    isEnabled: flags.isEnabled(key),
    variants: flags.getVariant(key),
  };
}

export default getServerSideFeatureFlag;
