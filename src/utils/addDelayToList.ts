function addDelayToList(delay: number) {
  const ulElement = document.querySelector(".delay-list")!;
  const li = document.createElement("li");

  li.innerText = `[delay] ${delay}`;
  ulElement.appendChild(li);
  ulElement.scrollTop = ulElement.scrollHeight;
}

export default addDelayToList;
