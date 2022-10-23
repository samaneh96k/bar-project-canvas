/**
 * 
 * bar.js
 * simple,elegant bar chart library
 * {data}-version 1.0
 * {url}
 * copyright 2022 {samaneh96k}
 */

"use strict";
function BarChart(targetId, width, height, data) {
  //Base
    var chart = this;

    //specify Confiurations
    chart.configureChart(targetId, width, height, data);
    //pre Operations
    chart.performPreOperations();
    //draw chart
    chart.drawChart();

}
BarChart.prototype.configureChart = function(targetId, width, height, data) {
  //Base
  var chart = this;

  //canvas Specifictions come from outside
    chart.setCanvasParameters(targetId, width, height, data);

  //chart Specifictions
chart.setChartParameters(targetId, width, height, data)

};
BarChart.prototype.setCanvasParameters = function (targetId, width, height, data) {
      //Base
  var chart = this;

  //canvas Specifictions come from outside
  chart.id = targetId;
  chart.width = width;
  chart.height = height;
  chart.data = data;
}
BarChart.prototype.setChartParameters = function () {
     //Base
  var chart = this;
      //Axis configorations
  chart.axisRatio = 10; //in terms of percentage
  chart.verticalMargin = chart.height * chart.axisRatio / 100;
  chart.horzintalMargin = chart.width * chart.axisRatio / 100;
  chart.axisColor = "#b1b1b1";
  chart.axisWidth = 0.75;
  //label Configorations
  chart.fontRatio = 3; //in terms of percentage
  chart.fontFamily = "times";
  chart.fontStyle = "normal";
  chart.fontWeight = "300";
  chart.fontColor = "#666";
  chart.verticalFontSize = chart.height * chart.fontRatio / 100;
  chart.horizontalFontSize = chart.width * chart.fontRatio / 100;
  //Giudeline Configurations
  chart.guideLineColor = "#e5e5e5";
  chart.guideLinewidth = 0.5;
}
BarChart.prototype.performPreOperations = function () {
      //Base
    var chart = this;
    // create Canvas
    chart.createCanvas();
    // get data
    chart.handleData();
    // prepare data
    chart.preopareData();
}
BarChart.prototype.createCanvas = function () {
       //Base
    var chart = this;
    //Create canvas
    var canvas = document.createElement('canvas');
    canvas.id = chart.id + '-' + Math.random();
    canvas.width = chart.width;
    canvas.height = chart.height;
    //Append canvas to target container
    document.getElementById(chart.id).innerHTML = '';
    document.getElementById(chart.id).appendChild(canvas);
    //add  canvas to chart object
    chart.canvas = canvas;
    chart.context = canvas.getContext('2d');




}
BarChart.prototype.handleData = function () {
          //Base
    var chart = this;
    // Data sets
    chart.labels = [];
    chart.values = [];
    //handle data
    chart.data.forEach(item => {
        chart.labels.push(item.label);
        chart.values.push(item.value);
        
    });
}
BarChart.prototype.preopareData=function () {
          //Base
    var chart = this;
    // Global Variables
    chart.itemsNum = chart.data.length;
    chart.maxvalue = Math.max.apply(null, chart.values);
    chart.minvalue = Math.min.apply(null, chart.values);
    //Axis Specifications
    chart.verticalAxisWidth = chart.height - 2 * chart.verticalMargin;//bottom and top margin
    chart.horizontalAxiswidth = chart.width - 2 * chart.horzintalMargin;//left and right margin
    //label Specifications
    chart.verticalUpperBound = Math.ceil(chart.maxvalue / 10)*10;
    chart.verticalLabelFreq = Math.floor(chart.verticalUpperBound / chart.itemsNum);
    chart.horizontalLabelFreq =chart.horizontalAxiswidth / chart.itemsNum;

}
BarChart.prototype.drawChart = function () {
      //Base
    var chart = this;
    //vertical Axis
    chart.drawVerticalAxis();
    //vertical labels
    chart.drawVerticalLabels();
    // horizontal Axis
    chart.drawHorizontalAxis();
    // horizontal labels
    chart.drawHorizontalLables();
    //Horizontal GideLines
    chart.drawHorizontalGuideLines();
    //vertical GideLines
    chart.drawVerticalGuidelines();
    //draw bars
    chart.DrawBars();

    
    
}
BarChart.prototype.drawVerticalAxis = function () {
        //Base
    var chart = this;
    //vertical Axis
    chart.context.beginPath();
    chart.context.strokeStyle = chart.axisColor;
    chart.context.lineWidth = chart.axisWidth;
    chart.context.moveTo(chart.horzintalMargin,chart.verticalMargin)
    chart.context.lineTo(chart.horzintalMargin,chart.height-chart.verticalMargin)
    chart.context.stroke();    
}
BarChart.prototype.drawVerticalLabels = function () {
    //Base
    var chart = this;
    //text specifications
    var labelFont = chart.fontStyle + ' ' + chart.fontWeight + ' ' + chart.verticalFontSize + 'px ' + chart.fontFamily;
    chart.context.fillStyle = chart.fontColor;
    chart.context.textAlign='right'
    chart.context.font = labelFont;
    //scale values
    var scaledVertcalLabelFerq = (chart.verticalAxisWidth / chart.verticalUpperBound) * chart.verticalLabelFreq;
    for (var i = 0; i <= chart.itemsNum; i++) {
        var labelText = chart.verticalUpperBound - i * chart.verticalLabelFreq;
        var verticalLabelX = chart.horzintalMargin - chart.horzintalMargin/chart.axisRatio;
        var verticalLabelY = chart.verticalMargin + i * scaledVertcalLabelFerq;
        chart.context.fillText(labelText,verticalLabelX,verticalLabelY)
     
      
    }
    console.log(chart.verticalUpperBound,"vdfvd")
}
BarChart.prototype.drawHorizontalAxis=function () {
         //Base
         var chart = this;
         //horizontal Axis
         chart.context.beginPath();
         chart.context.strokeStyle = chart.axisColor;
         chart.context.lineWidth = chart.axisWidth;
         chart.context.moveTo(chart.horzintalMargin,chart.height-chart.verticalMargin)
         chart.context.lineTo(chart.width-chart.horzintalMargin,chart.height-chart.verticalMargin)
         chart.context.stroke();    
}
BarChart.prototype.drawHorizontalLables=function () {
    //Base
    var chart = this;  
    //text specifications

    var labelFont = chart.fontStyle + ' ' + chart.fontWeight + ' ' + chart.verticalFontSize + 'px' + chart.fontFamily;
    chart.context.fillStyle = chart.fontColor;
    chart.context.font = labelFont;
    chart.context.textAlign = "center";
    chart.context.textBaseline='top'
    //draw Labels
    for (var i = 0; i < chart.itemsNum; i++){
        var horizontalLabelX = chart.horzintalMargin + i * chart.horizontalLabelFreq+chart.horizontalLabelFreq/2;
        var horizontalLabelY = chart.height - chart.verticalMargin+(chart.verticalMargin/chart.axisRatio);
        chart.context.fillText(chart.labels[i], horizontalLabelX, horizontalLabelY);

    }
}
BarChart.prototype.drawHorizontalGuideLines=function () {
     //Base
    var chart = this;
    //specifications
    chart.context.strokeStyle = chart.guideLineColor;
    chart.context.lineWidth = chart.guideLinewidth;
     //scale values
     var scaledVerticalLabelFerq = (chart.verticalAxisWidth / chart.verticalUpperBound) * chart.verticalLabelFreq;
     for (var i = 0; i < chart.itemsNum; i++) {
      
         var horizontalGideLineStartX = chart.horzintalMargin;
         var horizontalGideLineStartY = chart.verticalMargin + i * scaledVerticalLabelFerq;
         var horizontalGideLineEndX = chart.horzintalMargin + chart.horizontalAxiswidth;
         var horizontalGideLineEndY = chart.verticalMargin + i * scaledVerticalLabelFerq;
         chart.context.beginPath();
         chart.context.moveTo(horizontalGideLineStartX, horizontalGideLineStartY);
         chart.context.lineTo(horizontalGideLineEndX, horizontalGideLineEndY);
         chart.context.stroke();
    }
    

}
BarChart.prototype.drawVerticalGuidelines = function () {
    //Base
    var chart = this;
    //specifications
    chart.context.strokeStyle = chart.guideLineColor;
    chart.context.lineWidth = chart.guideLinewidth;
     //scale values
     var scaledVerticalLabelFerq = (chart.verticalAxisWidth / chart.verticalUpperBound) * chart.verticalLabelFreq;
     for (var i = 0; i < chart.itemsNum; i++) {
      
         var verticalGuideLineStartX = chart.horzintalMargin + i * chart.horizontalLabelFreq;
         var verticalGuideLineStartY = chart.height - chart.verticalMargin;
         var verticalGuideLineEndX=chart.horzintalMargin + i * chart.horizontalLabelFreq;
         var verticalGuideLineEndY=chart.verticalMargin;
         
         chart.context.beginPath();
         chart.context.moveTo(verticalGuideLineStartX, verticalGuideLineStartY);
         chart.context.lineTo(verticalGuideLineEndX, verticalGuideLineEndY);
         chart.context.stroke();
    }
    

}
BarChart.prototype.DrawBars = function () {
       //Base
    var chart = this;
   
    for (let i = 0; i < chart.itemsNum; i++) {
        var color = chart.createRandomRGBcolor();
        var fillOpacity = '0.5';
        var fillcolor = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + fillOpacity + ')';
        var bordercolor = 'rgb(' + color.r + ',' + color.g + ',' + color.b +  ')';
        
        chart.context.beginPath();
        chart.context.fillStyle = fillcolor;
        chart.context.strokeStyle = bordercolor;
 


        var barX = chart.horzintalMargin + i * chart.horizontalLabelFreq+2*chart.axisRatio;
        var barY = chart.height - chart.verticalMargin;
        var barWidth = chart.horizontalLabelFreq-4*chart.axisRatio;
        var barHeight =-1* chart.verticalAxisWidth * chart.values[i] / chart.maxvalue;
        chart.context.rect(barX, barY, barWidth, barHeight);
        chart.context.stroke();
        chart.context.fill();
        
    }
    
}
BarChart.prototype.createRandomRGBcolor = function () {
    var red=getRandomInt(0,257)
    var green=getRandomInt(0,257)
    var blue = getRandomInt(0, 257)
    return { r: red, g: green, b: blue };
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }