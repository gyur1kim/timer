function addDelayToList(delay: number) {
  const ulElement = document.querySelector(".delay-list")!;
  const li = document.createElement("li");

  if (ulElement.children.length > 50) {
    ulElement.removeChild(ulElement.firstChild!);
  }

  li.innerText = `[delay] ${delay}`;
  ulElement.appendChild(li);
  ulElement.scrollTop = ulElement.scrollHeight;
}

export default addDelayToList;
