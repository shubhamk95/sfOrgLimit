import { LightningElement, track,api } from 'lwc';
import chartjs from '@salesforce/resourceUrl/chart';
import { loadScript } from 'lightning/platformResourceLoader';
export default class LimitsComponent extends LightningElement {
    @api name;
    @api usedLimit;
    @api totalLimit;
    @api availableLimit;

    @track error;
    chart;
    chartjsInitialized = false;

    


    renderedCallback() {

        let config = {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: [
                            this.usedLimit,
                            this.availableLimit
                            
                        ],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)'
                            
                        ],
                        label: 'Dataset 1'
                    }
                ],
                labels: ['Used', 'Available']
            },
            options: {
                responsive: true,
                legend: {
                    position: 'right'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };


        if (this.chartjsInitialized) {
            return;
        }
        this.chartjsInitialized = true;

        loadScript(this, chartjs)
            .then(() => {
                const canvas = document.createElement('canvas');
                this.template.querySelector('div.item').appendChild(canvas);
                const ctx = canvas.getContext('2d');
                this.chart = new window.Chart(ctx, config);
            })
            .catch(error => {
                this.error = error;
            });
    }
    

}