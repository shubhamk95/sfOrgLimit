import { LightningElement, track } from 'lwc';
import getLimits from '@salesforce/apex/LimitsController.getLimits';
export default class Limits extends LightningElement {
   
    @track limits;

    connectedCallback(){

        getLimits()
        .then((result)=>{
            this.limits = result;
            console.log(result);
        });
    }

}