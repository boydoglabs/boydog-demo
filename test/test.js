const Nightmare = require("nightmare");
const url = "http://localhost:3090/";

const showScreens = true;

describe("E2E USER TESTING", function() {
  describe("for a single user", function() {
    let nightmare = null;
    this.timeout("30s");

    beforeEach(() => {
      nightmare = new Nightmare({ show: showScreens, x: 0, y: 0 });
      nightmare.viewport(600, 600)
        .goto(url)
        .wait(3000);
        });

    xit("should load page", async () => {
      await nightmare
        .evaluate(() => {
          const t = document.querySelector(".boydoglabs-link").innerText;

          chai.assert.isNotEmpty(t);
        })
        .end()
        .then(() => {})
        .catch();
    });

    it("should load changes from made from server", async () => {
      await nightmare
        .goto(url + "testScopeChangeFromServer")
        .wait(1000)
        .goto(url)
        .wait(3000)
        .evaluate(() => {
          const a = document.querySelector('input[dog-value="word"]').textContent;
          const b = document.querySelector('input[dog-value="title"]').textContent;
          const c = document.querySelector('input[dog-value="subject"]').textContent;

          chai.assert.equal(a, "Changes");
          chai.assert.equal(b, "From");
          chai.assert.equal(c, "Server");
        })
        .end()
        .then(() => {})
        .catch();
    });
  });

  xdescribe("for multiple users at the same time", function() {
    let nightmareA = null;
    let nightmareB = null;
    this.timeout("30s");

    beforeEach(() => {
      nightmareA = new Nightmare({ show: showScreens, x: 0, y: 0 });
      nightmareB = new Nightmare({ show: showScreens, x: 600, y: 0 });

      nightmareA
        .viewport(600, 600)
        .goto(url)
        .wait(3000);

      nightmareB
        .viewport(600, 600)
        .goto(url)
        .wait(3000);
    });

    it("should collaborate on 2 dog-value's", async () => {
      nightmareA
        .click('input[dog-value="word"]')
        .type(
          'input[dog-value="word"]',
          "\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008"
        ) //Backspace
        .type(
          'input[dog-value="word"]',
          "\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F"
        ) //Delete
        .type('input[dog-value="word"]', "user A editing here")
        .end()
        .then(() => {});

      await nightmareB
        .click('input[dog-value="subject"]')
        .type(
          'input[dog-value="subject"]',
          "\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008"
        ) //Backspace
        .type(
          'input[dog-value="subject"]',
          "\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F"
        ) //Delete
        .type('input[dog-value="subject"]', "user B editing here")
        .wait(1000)
        .evaluate(() => {
          const a = document.querySelector('input[dog-value="word"]').value;
          const b = document.querySelector('input[dog-value="subject"]').value;

          chai.assert.equal(a, "user A editing here");
          chai.assert.equal(b, "user B editing here");
        })
        .end()
        .then(() => {})
        .catch();
    });

    //TODO: Make async/await
    it("should update a parent dog-html content", async () => {
      nightmareA
        .click('input[dog-value="data>name"]')
        .type(
          'input[dog-value="data>name"]',
          "\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008"
        ) //Backspace
        .type(
          'input[dog-value="data>name"]',
          "\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F"
        ) //Delete
        .type('input[dog-value="data>name"]', "first")
        .end()
        .then(() => {});

      await nightmareB
        .click('input[dog-value="data>address"]')
        .type(
          'input[dog-value="data>address"]',
          "\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008"
        ) //Backspace
        .type(
          'input[dog-value="data>address"]',
          "\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F"
        ) //Delete
        .type('input[dog-value="data>address"]', "second")
        .wait(1000)
        .evaluate(() => {
          let a = document.querySelector('p[dog-html="data"]').textContent;
          let b = document.querySelector('input[dog-value="data>name"]').value;
          let c = document.querySelector('input[dog-value="data>address"]').value;

          chai.assert.include(a, b);
          chai.assert.include(a, c);
        })
        .end()
        .then(() => {})
        .catch();
    });
  });
});