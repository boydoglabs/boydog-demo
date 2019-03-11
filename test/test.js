const Nightmare = require("nightmare");

describe("multiple simultaneous user testing", function() {
  let nightmare = null;

  this.timeout("30s");

  it("should collaborate on two different elements", done => {
    nightmareA = new Nightmare({ show: true, x: 0, y: 0 });
    nightmareB = new Nightmare({ show: true, x: 600, y: 0 });

    nightmareA
      .viewport(600, 100)
      .goto("http://localhost:3090/")
      .wait()
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
      .catch(done);

    nightmareB
      .viewport(600, 100)
      .goto("http://localhost:3090/")
      .wait()
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
        let a = document.querySelector('input[dog-value="word"]').value;
        let b = document.querySelector('input[dog-value="subject"]').value;

        chai.assert(a === "user A editing here");
        chai.assert(b === "user B editing here");
      })
      .end()
      .then(() => {
        done();
      })
      .catch(done);
  });
});
