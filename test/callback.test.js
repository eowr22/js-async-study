const fs = require("fs");

describe("Callback - fs.readFile를 콜백 패턴만 사용", () => {
  test("assets/first.json을 불러오기", (done) => {
    fs.readFile("assets/first.json", (err, data) => {
      const first = JSON.parse(data);
      expect(first["hi"]).toBe("방가방가");
      done();
    });
  });

  test("assets/first.json에서 불러온 second_key를 이용해 second.json에서 key에 일치하는 오브젝트 찾기", (done) => {
    fs.readFile("assets/first.json", (err, firstData) => {
      fs.readFile("assets/second.json", (err, secondData) => {
        const first = JSON.parse(firstData);
        const second = JSON.parse(secondData);

        const secondKey = first["second_key"];
        const secondObj = second.find((data) => data.key === secondKey);

        expect(secondObj["hi"]).toBe("Second 방가방가");
        done();
      });
    });
  });

  test(
    "assets/second.json에서 불러온 third_key를 이용해 third.json에서 key에 일치하는 오브젝트" +
      " 찾기",
    (done) => {
      fs.readFile("assets/first.json", (err, firstData) => {
        fs.readFile("assets/second.json", (err, secondData) => {
          fs.readFile("assets/third.json", (err, thirdData) => {
            const first = JSON.parse(firstData);
            const second = JSON.parse(secondData);
            const third = JSON.parse(thirdData);

            const secondKey = first["second_key"];
            const secondObj = second.find((data) => data.key === secondKey);
            const thirdKey = secondObj["third_key"];
            const thirdObj = third.find((data) => data.key === thirdKey);

            expect(thirdObj['hi']).toBe("Third 방가방가");
            done();
          });
        });
      });
    }
  );
});
