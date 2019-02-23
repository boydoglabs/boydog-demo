const Nightmare = require('nightmare')

describe('single user testing', function() {
  let nightmare = null
  
  this.timeout('30s')
  
  beforeEach(() => {
    //Register press keyboard action (available buttons: https://github.com/electron/electron/blob/master/docs/api/accelerator.md)
    Nightmare.action(
      'press',
      function(name, options, parent, win, renderer, done) {
        parent.respondTo('press', function(keyCode, done) {
          win.webContents.sendInputEvent({ type: 'keyDown', keyCode: keyCode })
          win.webContents.sendInputEvent({ type: 'keyUp', keyCode: keyCode })
          done()
        })
        done()
      },
      function(selector, keyCode, done) {
        // focus, press, blur
        // TODO: clean me up
        return this.evaluate_now(
          selector => document.querySelector(selector).focus(),
          () =>
            this.child.call('press', keyCode, () => {
              this.evaluate_now(
                selector => document.querySelector(selector).blur(),
                () => done(),
                selector
              )
            }),
          selector
        )
      }
    )
    
    nightmare = new Nightmare({ show: true, x: 0, y: 0 })
    nightmare
      //.on('console', (log, msg) => { console.log(msg) }) // Use this to show console.log's from inside the browser into the Node console
      .viewport(800, 600)
      .goto('http://localhost:7873/')
      .inject('js', 'public/chai.js')
      .wait()
  })
  
  it('should clear input "word"', done => {
    nightmare
      .click('input[dog-value="word"]')
      .type('input[dog-value="word"]', '\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008') //Backspace
      .type('input[dog-value="word"]', '\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F') //Delete
      .evaluate(() => {
        let a = document.querySelector('input[dog-value="word"]').value
        let b = document.querySelector('[dog-html="word"]').innerHTML
        
        chai.assert.equal(a, b)
        chai.assert.equal(a, '')
      })
      .end()
      .then(() => { done() })
      .catch(done)
  })
})

describe('multiple simultaneous user testing', function() {
  let nightmare = null
  
  this.timeout('30s')
  
  it('should collaborate on two different elements', done => {
    nightmareA = new Nightmare({ show: true, x: 0, y: 0 })
    nightmareB = new Nightmare({ show: true, x: 0, y: 600 })
    
    nightmareA
      .viewport(800, 600)
      .goto('http://localhost:7873/')
      .inject('js', 'public/chai.js')
      .wait()
      .click('input[dog-value="word"]')
      .type('input[dog-value="word"]', '\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008') //Backspace
      .type('input[dog-value="word"]', '\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F') //Delete
      .type('input[dog-value="word"]', 'user A editing here')
      .wait(250)
      .evaluate(() => {
        let a = document.querySelector('input[dog-value="word"]').value
        let b = document.querySelector('input[dog-value="number"]').value
        
        chai.assert.equal(a, 'user A editing here')
        chai.assert.equal(b, '0987654321')
      })
      .wait(3000)
      .end()
      .then(() => { done() })
      .catch(done)
      
    nightmareB
      .viewport(800, 600)
      .goto('http://localhost:7873/')
      .inject('js', 'public/chai.js')
      .wait()
      .click('input[dog-value="number"]')
      .type('input[dog-value="number"]', '\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008') //Backspace
      .type('input[dog-value="number"]', '\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F\u007F') //Delete
      .type('input[dog-value="number"]', '0987654321')
      .wait(1500)
      .type('input[dog-value="number"]', '123') //Write just any data
      .end()
      .then()
      .catch(done)
  })
})