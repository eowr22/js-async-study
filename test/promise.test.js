const fs = require("fs");
const { readFile } = require("../src/readFile");

describe("Promise - fs.readFile를 프로미스 패턴만 사용", () => {
  test("fs.readFile을 이용해 Promise를 반환하는 readFile 함수 만들기", (done) => {
    const promise = readFile("assets/first");
    expect(promise instanceof Promise).toBe(true);
    done();
  });

  test("assets/first.json을 불러오기", (done) => {
    readFile("assets/first") //
      .then((data) => {
        const first = JSON.parse(data);
        expect(first['hi']).toBe("방가방가");
        done();
      });
  });

  test(
    "assets/first.json에서 불러온 second_key를 이용해 second.json에서 key에 일치하는 오브젝트" +
      " 찾기",
    (done) => {
      readFile("assets/first") //
        .then((firstData) => {
          const first = JSON.parse(firstData);
          return first["second_key"];
        })
        .then((secondKey) => {
          return readFile("assets/second") //
            .then((secondData) => {
              const secondObj = JSON.parse(secondData).find(
                (data) => data.key === secondKey
              );
              return secondObj["hi"];
            });
        })
        .then((result) => {
          expect(result).toBe("Second 방가방가");
          done();
        });
    }
  );

  test(
    "assets/second.json에서 불러온 third_key를 이용해 third.json에서 key에 일치하는 오브젝트" +
      " 찾기",
    (done) => {
      readFile("assets/first") //
        .then((firstData) => {
          const first = JSON.parse(firstData);
          return first["second_key"];
        })
        .then((secondKey) => {
          return readFile("assets/second") //
            .then((secondData) => {
              const secondObj = JSON.parse(secondData).find(
                (data) => data.key === secondKey
              );
              return secondObj["third_key"];
            });
        })
        .then((thirdKey) => {
          return readFile("assets/third") //
            .then((thirdData) => {
              const thirdObj = JSON.parse(thirdData).find(
                (data) => data.key === thirdKey
              );
              return thirdObj["hi"];
            });
        })
        .then((result) => {
          expect(result).toBe("Third 방가방가");
          done();
        });
    }
  );
});
