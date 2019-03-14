const Nightmare = require("nightmare");
const assert = require("assert");
const url = "http://localhost:3090/";

xdescribe("for a single user", function() {
  let nightmare = null;
  this.timeout("30s");

  beforeEach(async () => {
    nightmare = new Nightmare({ show: false, x: 0, y: 0 });
    await nightmare.viewport(600, 100);
  });
  
  it("should load page", async () => {
    try {
      const title = await nightmare
        .goto(url)
        .wait()
        .evaluate(() => document.querySelector(".boydoglabs-link").innerText);

      assert(title.length);
    } catch(e) { throw e; }
    finally {
      await nightmare.end();
    }
  });

  it("should load changes from made from server", async () => {
    try {
      await nightmare
        .goto(url + "testScopeChangeFromServer")
        .wait()
        .goto(url)
        .wait()
        
      const a = await nightmare.evaluate(() => document.querySelector('input[dog-value="word"]').value);
      const b = await nightmare.evaluate(() => document.querySelector('input[dog-value="title"]').value);
      const c = await nightmare.evaluate(() => document.querySelector('input[dog-value="subject"]').value);
      
      assert(a === "Changexs");
      assert(b === "From");
      assert(c === "Server");
    } catch(e) { throw e; }
    finally {
      await nightmare.end();
    }
  });
});

describe("for multiple users at the same time", function() {
  let nightmareA = null;
  let nightmareB = null;
  this.timeout("30s");

  beforeEach(() => {
    nightmareA = new Nightmare({ show: false, x: 0, y: 0 });
    nightmareB = new Nightmare({ show: false, x: 600, y: 0 });

    nightmareA
      .viewport(600, 100)
      .goto(url)
      .wait();

    nightmareB
      .viewport(600, 100)
      .goto(url)
      .wait();
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
    
    console.log("thenA")
    
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
      
    const a = await nightmareB.evaluate(() => document.querySelector('input[dog-value="word"]').value);
    const b = await nightmareB.evaluate(() => document.querySelector('input[dog-value="subject"]').value);
    
    console.log("aaa", a);
    console.log("bbb", b);
    
    try {
      assert(a === "user A editing here");
      assert(b === "user B editing here");
    } catch(e) { throw e; }
    finally {
      await nightmareB.end()
    }
  })

  //TODO: Make async/await
  xit("should update a parent dog-value", done => {
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
      .catch(done);

    nightmareB
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
        let a = document.querySelector('input[dog-value="data"]').value;
        let b = document.querySelector('input[dog-value="data>name"]').value;
        let c = document.querySelector('input[dog-value="data>address"]').value;

        chai.assert.include(a, b);
        chai.assert.include(a, c);
      })
      .end()
      .then(() => {
        done();
      })
      .catch(done);
  });
});
