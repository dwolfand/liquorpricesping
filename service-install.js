var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'LiquorPricesDBLoadPing',
  description: 'This will ping the liquor prices server on a regular interval to sync the database',
  script: 'C:\\penfed-src\\liquor-prices-service\\PingLiquorPrices.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();