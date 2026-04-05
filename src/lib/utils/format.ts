import { formatDistanceToNow } from "date-fns";

export function formatRelativeDate(date?: string | null) {
  if (!date) {
    return "Just now";
  }

  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function truncate(value: string | null | undefined, length = 120) {
  if (!value) {
    return "";
  }

  if (value.length <= length) {
    return value;
  }

  return `${value.slice(0, length - 1)}…`;
}
