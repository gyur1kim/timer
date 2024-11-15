export default function timerFormat(seconds: number) {
  const min = Math.floor(seconds / 1000 / 60)
    .toString()
    .padStart(2, "0");
  const sec = ((seconds / 1000) % 60).toString().padStart(2, "0");

  return [min, sec];
}