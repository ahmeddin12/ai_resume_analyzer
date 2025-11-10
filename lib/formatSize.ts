/**
 * Converts a byte count into a human-readable string using binary units (KB, MB, GB, ...).
 *
 * Rules:
 * - Uses base 1024 (1 KB = 1024 bytes).
 * - Chooses the most appropriate unit among B, KB, MB, GB, TB, PB.
 * - Defaults to 2 decimal places, trimming unnecessary trailing zeros.
 *
 * Examples:
 * formatSize(0)            -> "0 B"
 * formatSize(512)          -> "512 B"
 * formatSize(1024)         -> "1 KB"
 * formatSize(1536)         -> "1.5 KB"
 * formatSize(1048576)      -> "1 MB"
 * formatSize(1073741824)   -> "1 GB"
 */
export function formatSize(bytes: number, decimals: number = 2): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    throw new Error("formatSize: 'bytes' must be a non-negative finite number");
  }

  const units = ["B", "KB", "MB", "GB", "TB", "PB"] as const;

  if (bytes === 0) return "0 B";

  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value = value / 1024;
    unitIndex++;
  }

  const fixed = value.toFixed(decimals);
  // Trim trailing zeros and optional decimal point
  const trimmed = fixed.replace(/(?:\.0+$)|(?:\.(\d*?)0+$)/, (_, d) => (d ? `.${d}` : ""));

  return `${trimmed} ${units[unitIndex]}`;
}

export default formatSize;
