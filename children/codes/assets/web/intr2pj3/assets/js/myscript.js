$(document).ready(function() {
//section
  // section1
  var scrlls1img= 1480;
  $(window).scroll(function(){
    var num=$(window).scrollLeft();
      if(num>scrlls1img){
        $(".s1img").addClass("hidden");
      }else{
        $(".s1img").removeClass("hidden");
      }
    });

    var scrlls1txt= 1200;
    $(window).scroll(function(){
      var num=$(window).scrollLeft();
        if(num>scrlls1txt){
          $(".s1txt").addClass("hidden");
        }else{
          $(".s1txt").removeClass("hidden");
        }
      });
    // section1 end

    // section2 start
    var scrlls2txt = 1400;
    $(window).scroll(function(){
        var scrollPX = $(this).scrollLeft();
        if( scrollPX > scrlls2txt ) {
            $(".s2txt").css({"left": Math.min((scrollPX-scrlls2txt)*0.8 + -130, 80) + "px"});
        }else{
            $(".s2txt").css({"left": -130 + "px"});
        }
    });
    // section2 end

    // section4 start
    var scrlls4txt= 6130;
    $(window).scroll(function(){
      var num=$(window).scrollLeft();
        if(num>scrlls4txt){
          $(".s4txt").addClass("appear");
        }else{
          $(".s4txt").removeClass("appear");
        }
      });

      var scrlls4bttn= 6130;
      $(window).scroll(function(){
        var num=$(window).scrollLeft();
          if(num>scrlls4bttn){
            $(".s4bttn").addClass("appear");
          }else{
            $(".s4bttn").removeClass("appear");
          }
        });
      // section4 end
//section end


// petals----------------------

// petal1

      var petal1mv1 = 0;
      $(window).scroll(function(){
          var scrollPX = $(this).scrollLeft();
          if( scrollPX > petal1mv1 ) {
              $(".petal1").css({"left": Math.max(-scrollPX*2 + 100, -600) + "px"});
          }else{
              $(".petal1").css({"left": 100 + "px"});
          }
      });

      var cover = 0;
      $(window).scroll(function(){
          var scrollPX = $(this).scrollLeft();
          if( scrollPX > cover ) {
              $(".logocover").css({"left": Math.max(-scrollPX*2 + 280, -420) + "px"});
          }else{
              $(".logocover").css({"left": 280 + "px"});
          }
      });

// petal1 end


// petal2
      var petal2mv1 = 0;
      var petal2mv2 = 1400;
      $(window).scroll(function(){
          var scrollPX = $(this).scrollLeft();
          if( scrollPX > petal2mv1 ) {
              $(".petal2").css({"left": Math.min(scrollPX*5 + 100, petal2mv2) + "px"});

              if( scrollPX > petal2mv2 ) {
                  $(".petal2").css({"left": Math.max(petal2mv2 - (scrollPX - petal2mv2), 1100) + "px"});
              }

          }else{
              $(".petal2").css({"left": 100 + "px"});
          }
      });
// petal2 end

// petal3
      var petal3mv1 = 0;
      var petal3mv2 = 1800;
      var petal3mv3 = 4600;
      $(window).scroll(function(){
          var scrollPX = $(this).scrollLeft();
          if( scrollPX > petal3mv1 ) {
              $(".petal3").css({"left": Math.min(scrollPX*3 + 500, 5190) + "px"});
              //
              // if( scrollPX > petal3mv2 ) {
              //     $(".petal3").css({"left": Math.min(petal3mv2 + (scrollPX - petal3mv2)*3, petal2mv3) + "px"});
              // }

              if( scrollPX > petal3mv3 ) {
                  $(".petal3").css({"left": Math.max(5190 - (scrollPX - petal3mv3)*0.8, 4600) + "px"});
              }
          }else{
              $(".petal3").css({"left": 500 + "px"});
          }
      });

// petal3 end
// petal4
      var petal4mv1 = 0;
      var petal4mv2 = 4580;
      $(window).scroll(function(){
          var scrollPX = $(this).scrollLeft();
          if( scrollPX > petal4mv1 ) {
              $(".petal4").css({"left": Math.min(scrollPX*4 + 100, 5500) + "px"});
                if( scrollPX > petal4mv2 ) {
                $(".petal4").css({"left": Math.min(5500 + (scrollPX - petal4mv2)*1.3, 6500) + "px"});
              }
          }else{
              $(".petal4").css({"left": 100 + "px"});
          }
      });
// petal4 end
  });




  // var max = 1000; //100% 투명할때의 스크롤 값
  // $(window).scroll(function(){
  //     var scrollPX = $(this).scrollTop();
  //     if( scrollPX  < max ) {
  //         $("#bg").css({"opacity": (max-scrollPX)/max });
  //     }else{
  //         $("#bg").css({"opacity": 0});
  //     }
  // });
