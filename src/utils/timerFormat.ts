import { SECOND } from "./const";

export default function timerFormat(seconds: number) {
  const min = Math.floor(seconds / SECOND / 60)
    .toString()
    .padStart(2, "0");
  const sec = ((seconds / SECOND) % 60).toString().padStart(2, "0");

  return [min, sec];
}
