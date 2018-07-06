class PageObject {
    constructor(client, defaultInterval) {
            this.client = client.init().pause(defaultInterval);
            this.defaultInterval=defaultInterval;
            
            this.click=(locator)=>this.client.click(locator);
            
            this.getButtonLocator=(locatorPart)=>`//android.widget.Button[@${locatorPart}`;
            
            this.getNumericButtonLocator=(locatorPart)=>this.getButtonLocator(`text='${locatorPart}']`);
            
            this.getSystemButtonLocator=(locatorPart)=>this.getButtonLocator(`content-desc='${locatorPart}']`);
            
            this.getResultFieldLocator=()=>"//android.widget.TextView[@index='2']";
            
            this.clickNumericButton=(buttonText)=>this.click(this.getNumericButtonLocator(buttonText));
            
            this.clickSystemButton=(buttonText)=>this.click(this.getSystemButtonLocator(buttonText));
            
            this.getText=(locator)=>this.client.getText(locator);

            this.setAction=(action)=>{
                return action.pause(this.defaultInterval);
            };
    
            this.clickButtons=(buttonsArray)=>{
                buttonsArray.split('').forEach(element => {
                    this.client = this.setAction(this.clickNumericButton(element));
                });
            };
    
            this.createChain=(n1,n2,action)=>{
                this.clickButtons(n1);
                this.client = this.setAction(this.clickSystemButton(action));                 
                this.clickButtons(n2);            
                this.client = this.setAction(this.clickSystemButton('equals'));
                return this.getResult(this.client);
            };
        };

        add(n1,n2){
            return this.createChain(n1,n2,"plus");
        }

        divide(n1,n2){
            return this.createChain(n1,n2,"divide");
        }        

        multiply(n1,n2){
            return this.createChain(n1,n2,"multiply");
        }

        substract(n1,n2){
            return this.createChain(n1,n2,"minus");
        }

        getResult(client){
            return client.getText(this.getResultFieldLocator());
        }
    }

module.exports = function (client, interval){
    return new PageObject(client, interval)
};
