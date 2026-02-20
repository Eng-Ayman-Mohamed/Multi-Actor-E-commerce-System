  
  
 
 import { overviewPage } from "./overveiw.js";
 import { productsPage } from "./products.js";
 import { analyticsPage } from "./analytics.js";
 
 $(document).ready(function () {
 
    
    overviewPage();
   loadCharts();
   productsPage();
 
   $('ul li').eq(0).click(function () {
     $('#content').html(overviewPage());
     loadCharts();
   });
 
   $('ul li').eq(1).click(function () {
     $('#content').html( productsPage() );
   });

    $('ul li').eq(2).click(function () {
     $('#content').html('<div class="alert alert-warning vh-100">Hi there</div>');
   });
 
   $('ul li').eq(3).click(function () {
   $('#content').html(analyticsPage());
   loadAnalyticsCharts();
    });
 
  

   $('ul li').eq(4).click(function () {
     $('#content').html('<div class="alert alert-info vh-100">Hi there</div>');
   });
 
   $('ul li').eq(5).click(function () {
     $('#content').html('<div class="alert alert-secondary vh-100">Hi there</div>');
   });
 
   // Active background
   var items = document.querySelectorAll("li");
 
   items.forEach(item => {
     item.addEventListener("click", () => {
       items.forEach(el => {
         el.style.backgroundColor = "transparent";
       });
       item.style.backgroundColor = "rgb(21, 155, 199)";
     });
   });
 
 });
 
 function loadCharts() {
 
   const salesCtx = document.getElementById('salesChart');
   const revenueCtx = document.getElementById('revenueChart');
 
   if (!salesCtx || !revenueCtx) return;
 
   new Chart(salesCtx, {
     type: 'line',
     data: {
       labels: ['Jan','Feb','Mar','Apr','May','Jun'],
       datasets: [{
         label: 'Sales',
         data: [4200,3800,5000,4600,6200,7100],
         borderWidth: 2
       }]
     }
   });
 
   new Chart(revenueCtx, {
     type: 'bar',
     data: {
       labels: ['Jan','Feb','Mar','Apr','May','Jun'],
       datasets: [{
         label: 'Revenue',
         data: [4200,3800,5000,4600,6200,7100],
         borderWidth: 1
       }]
     }
   });
 }
 function loadAnalyticsCharts() {

  const salesCtx = document.getElementById('analyticsSalesChart');
  const statusCtx = document.getElementById('ordersStatusChart');

  if (!salesCtx || !statusCtx) return;

  new Chart(salesCtx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Sales',
        data: [8200, 10400, 9600, 12100],
        borderWidth: 2
      }]
    }
  });

  new Chart(statusCtx, {
    type: 'doughnut',
    data: {
      labels: ['Delivered', 'Processing', 'Cancelled'],
      datasets: [{
        data: [65, 25, 10],
        borderWidth: 1
      }]
    }
  });
}
 
  
  