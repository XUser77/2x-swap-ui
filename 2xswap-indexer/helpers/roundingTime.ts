export function floorTo4H(timestamp: bigint) {
  const ONE_DAY = 86400n;
  const FOUR_H = 14400n;

  // start of UTC day
  const dayStart = timestamp - (timestamp % ONE_DAY);

  // number of 4-h intervals since midnight
  const sinceDayStart = timestamp - dayStart;
  const bucketIndex = sinceDayStart / FOUR_H;

  return dayStart + bucketIndex * FOUR_H;
}

export function floorToDay(timestamp: bigint) {
  const ONE_DAY = 24n * 60n * 60n;
  return timestamp - (timestamp % ONE_DAY);
}

export function floorTo5Days(timestamp: bigint) {
  const date = new Date(Number(timestamp) * 1000);
  const day = date.getUTCDate(); // 1–31

  // compute which 5-day segment this is
  const bucketGroupIndex = Math.floor((day - 1) / 5);
  const startBucketDay = bucketGroupIndex * 5 + 1; // 1, 6, 11, ...

  const bucketDate = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    startBucketDay,
    0,
    0,
    0
  );

  return BigInt(Math.floor(bucketDate / 1000));
}

export function floorTo2Months(timestamp: bigint) {
  const date = new Date(Number(timestamp) * 1000);
  const month = date.getUTCMonth(); // 0–11

  // group into 2-month pairs
  const bucketGroupIndex = Math.floor(month / 2); // 0→Jan/Feb, 1→Mar/Apr, etc.
  const startBucketMonth = bucketGroupIndex * 2;

  const bucketDate = Date.UTC(
    date.getUTCFullYear(),
    startBucketMonth,
    1, // first of that pair
    0,
    0,
    0
  );

  return BigInt(Math.floor(bucketDate / 1000));
}
