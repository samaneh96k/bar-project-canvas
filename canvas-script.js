window.onload = function () {

    var min = 1;
    var max = 200;

    //Chart Data
    var data = [
        { label: 'فروردین', value: getRandomInt(min, max) },
        { label: 'اردیبهشت', value: getRandomInt(min, max) },
        { label: 'خرداد', value: getRandomInt(min, max) },
        { label: 'تیر', value: getRandomInt(min, max) },
        { label: 'مرداد', value: getRandomInt(min, max) },
        { label: 'شهریور', value: getRandomInt(min, max) },
    ];

    //Chart specifications
    var targetId = 'chart';
    var canvaswidth = 600;
    var canvasheight = 450;
    
    // Create Chart
    var chart = new BarChart(targetId, canvaswidth, canvasheight, data);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }