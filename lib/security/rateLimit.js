const buckets = new Map();

export function checkRateLimit(key, { limit = 5, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const current = buckets.get(key) || { count: 0, resetAt: now + windowMs };

  if (current.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (current.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  buckets.set(key, current);

  return { allowed: true, remaining: limit - current.count };
}
