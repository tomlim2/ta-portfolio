$(document).ready(function() {
  $('.Bttn').click(function(){
    $('.container').toggleClass('hidden');
  });
  $.ajax({
      type: "GET",
      url: "csv/extreme_data.csv",
      dataType: "text",
      success: function(data) {processData(data);}
   });
});

function processData(allText) {
  var allTextLines = allText.split(/\r\n|\n/);
  var headers = allTextLines[1].split(',');

  for (var i=2; i<allTextLines.length; i++) {
      var data = allTextLines[i].split(',');
      if (data.length == headers.length) {

          var tarr = [];
          for (var j=0; j<headers.length; j++) {
              tarr.push(data[j]);
          }
          datapack.push(tarr)
      }
  }
  for (var i=1; i<2; i++) {
      var data = allTextLines[i].split(',');
      if (data.length == headers.length) {

          var tarr = [];
          for (var j=0; j<headers.length; j++) {
              tarr.push(data[j]);
          }
          dataheader.push(tarr)

      }
  }

  init();
  animate();
}
