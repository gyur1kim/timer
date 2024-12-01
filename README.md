### 타이머 실행해보는 법

1. `yarn install`

2. `yarn run dev`

3. 원하는 기능의 타이머를 확인할 수 있다.

   ![241130_setInterval](https://github.com/user-attachments/assets/041bc523-1e05-4c3c-a17c-ea423cc0328c)

4. 타이머의 시간을 설정하고 싶다면 `src/App.tsx:10` 에서 `TIMER_TIME` 변수에 원하는 시간(ms 단위) 할당하면 된다.

5. `타이머 지연` 버튼을 눌러 콜스택에 1초 이상의 태스크가 있을 때 타이머가 어떻게 동작하는지 확인할 수 있다.
