/**
 * Truncates a Stellar public key or transaction hash to format `GABC...1234`.
 */
export function truncateAddress(address?: string | null, start = 4, end = 4): string {
  if (!address) return '';
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

