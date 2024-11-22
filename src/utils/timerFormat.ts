import { MILLISECOND } from "./const";

export default function timerFormat(seconds: number) {
  const min = Math.floor(seconds / MILLISECOND / 60)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor((seconds / MILLISECOND) % 60)
    .toString()
    .padStart(2, "0");
  const milli = (seconds % MILLISECOND).toString().padStart(3, "0");

  return [min, sec, milli];
}
