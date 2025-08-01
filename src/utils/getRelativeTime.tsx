import { Timestamp } from "firebase/firestore";

function format(unit: string, value: number): string {
  const rounded = Math.floor(value);
  const suffix = rounded === 1 ? unit : `${unit}s`;
  return `${rounded} ${suffix} ago`;
}

export function getRelativeTime(input: Timestamp | Date | string): string {
  let date: Date;

  // Convert input to Date
  if (input instanceof Timestamp) {
    date = input.toDate();
  } else if (input instanceof Date) {
    date = input;
  } else {
    date = new Date(input);
  }

  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000; // seconds

  if (diff < 60) return format("sec", diff);
  if (diff < 3600) return format("min", diff / 60);
  if (diff < 86400) return format("hr", diff / 3600);
  if (diff < 2592000) return format("day", diff / 86400);
  if (diff < 31536000) return format("month", diff / 2592000);
  return format("yr", diff / 31536000);
}
  