const config = require("../../wdio.conf").config;

const opts = {
  port:config.port,
  desiredCapabilities:config.capabilities[0]
};

const client = require("webdriverio").remote(opts);
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const page = require("../../pages/pageObject")(client,600);

jasmine.DEFAULT_TIMEOUT_INTERVAL = 110000;

describe('calc', function () {
  beforeAll(function(){
    chai.Should();
    chai.use(chaiAsPromised);
    chaiAsPromised.transferPromiseness = client.transferPromiseness;
  });

  it('should do addition', () => {
    return page.add("2","2")
      .should.eventually.be.equal("4");           
  });    
  
  it('should divide', () => {
    return page.divide("500","100")
      .should.eventually.be.equal("5");           
  });

  it('should do multiplication', () => {
    return page.multiply("5","5")
      .should.eventually.be.equal("25");           
  });

  it('should do substraction', () => {
    return page.substract("3","1")
      .should.eventually.be.equal("2");           
  });

  afterAll(()=> {
    return client.end();
  });
});