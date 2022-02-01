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
        const secondKey = first["second_key"];
        const second = JSON.parse(secondData);
        const resultIndex = second.findIndex(data => data.key === secondKey);
        const result = second[resultIndex]["hi"];
        expect(result).toBe("Second 방가방가");
        done();
      });
    });
  });

  test(
    "assets/second.json에서 불러온 third_key를 이용해 third.json에서 key에 일치하는 오브젝트" +
      " 찾기",
    (done) => {
      fs.readFile("assets/second.json", (err, secondData) => {
        fs.readFile("assets/third.json", (err, thirdData) => {
          const second = JSON.parse(secondData);
          const thirdKey = second[0]["third_key"];
          const third = JSON.parse(thirdData);
          const resultIndex = third.findIndex(data => data.key === thirdKey);
          const result = third[resultIndex]["hi"];
          expect(result).toBe("Third 방가방가");
          done();
        });
      });
    }
  );
});
