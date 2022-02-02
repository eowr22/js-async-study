const { readFile } = require("../src/readFile");

describe("async/await - readFile함수를 async/await 만 사용하여 테스트 통과하기", () => {
  test("assets/first.json을 불러오기", (done) => {
    async function getFirst() {
      const data = await readFile("assets/first");
      const result = JSON.parse(data);
      expect(result["hi"]).toBe("방가방가");
      done();
    }
    getFirst();
  });

  test("assets/first.json에서 불러온 second_key를 이용해 second.json에서 key에 일치하는 오브젝트" +
    " 찾기", (done) => {
    async function getSecond() {
      const first = JSON.parse(await readFile("assets/first"));
      const second = JSON.parse(await readFile("assets/second"));

      const secondKey = first["second_key"];
      const secondObj = second.find(data => data.key === secondKey);
      expect(secondObj["hi"]).toBe("Second 방가방가");
      done();
    }
    getSecond();
  });

  test("assets/second.json에서 불러온 third_key를 이용해 third.json에서 key에 일치하는 오브젝트" +
    " 찾기", (done) => {
    async function getSecond() {
      const first = JSON.parse(await readFile("assets/first"));
      const second = JSON.parse(await readFile("assets/second"));
      const third = JSON.parse(await readFile("assets/third"));

      const secondKey = first["second_key"];
      const secondObj = second.find(data => data.key === secondKey);

      const thirdKey = secondObj["third_key"];
      const thirdObj = third.find(data => data.key === thirdKey);
      expect(thirdObj['hi']).toBe("Third 방가방가");
      done();
    }
    getSecond();
  });
});
