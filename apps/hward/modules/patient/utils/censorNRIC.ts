export type CensoredNRIC = `*****${string}`;

/**
 *
 * @param nric 9 digit NRIC data of Patient
 * @returns Censored NRIC data (ex: *****01I)
 */
function censorNRIC(nric: string) {
  return nric.replace(/^.{5}/g, '*****') as CensoredNRIC;
}

export default censorNRIC;
