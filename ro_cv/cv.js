$(function(){
  $("section").css("height", $("section").width());


html2canvas(document.body, {
  onrendered: function(canvas) {
    //    document.body.appendChild(canvas);
    window.cnv = canvas;
    var image = canvas.toDataURL("image/png");
    var mm2pt = 2.834645669291;
    var pdf = new jsPDF('l','mm','lol');
    var w = 1197 / mm2pt;
    var h = (w/canvas.width) * canvas.height;
    pdf.addImage(image, 'png', 0, 0, w,h);
    pdf.save('Test.pdf');
  }
});




//   

// pdf.addHTML(document.body, function(){});
//   pdf.save('Test.pdf');

});