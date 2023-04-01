$(document).ready(function(){
  // init
  init_image_scroll();
  const swiper_rewies = new Swiper('.swiper-rewies', {
      slidesPerView: 3,
      spaceBetween: 45,
      navigation: {
        nextEl: '#swiper-rewies-prev',
        prevEl: '#swiper-rewies-next',
      },
      pagination: {
        el: ".scroll_bar_mobile",
        type: "progressbar",
      },
      breakpoints:{
      
        300:{
          slidesPerView: 1,
          spaceBetween: 20
        },
  
        800:{
          slidesPerView: 2,
        },
        
        1200:{
          slidesPerView: 2.3,
        },
        1500:{
          slidesPerView: 3,
        }
      }
  });

  const swiper_team = new Swiper('.swiper-team', {
    slidesPerView: 4,
    spaceBetween: 11,
    breakpoints:{
      
      300:{
        slidesPerView: 1,
      },

      800:{
        slidesPerView: 2,
      },
      
      1200:{
        slidesPerView: 3,
      },
      1600:{
        slidesPerView: 4,
      }
    }
  });

  const swiper_blog = new Swiper('.container-blogs', {
    slidesPerView: "auto",
    spaceBetween: 30,
    breakpoints:{
      
      300:{
        slidesPerView: 1,
      },

      800:{
        slidesPerView: 2,
      },
      
      1200:{
        slidesPerView: "auto",
      },
      1900:{
        slidesPerView: "auto",
      }
    }
  });

  allSlides();
  resizer();

  $(".trigger_close").click(function(){
    $("#close_burger_menu").trigger("click");
  });
  function resizer(){
    let width = $(window).width();
    
    if(width > 1200){
      $('.section__result .cards > .wrapper').masonry({
        // options
        itemSelector: '.slide',
        gutter: 20,
        horizontalOrder: true
      });
    }else{
      // initClass
      $(".swiper-init_001").addClass("swiper");
      $(".swiper-init_001").children().addClass("swiper-wrapper");
      $(".swiper-init_001").find(".slide").addClass("swiper-slide");

      const swiper_coments = new Swiper('.swiper-init_001', {
        spaceBetween: 30,
        slidesPerView: 3,
        breakpoints:{
      
          300:{
            slidesPerView: 1,
          },
    
          800:{
            slidesPerView: 2
          },
          1900:{
            slidesPerView: 3,
          }
        }
      });
    }
 }
  


 $(".phone-mask").inputmask('38 (099) 999-9999');

// addClick burger
  $("#btn_burger_open").click(function(){
    $(".burger_menu").fadeIn(300);
  });

  $("#close_burger_menu").click(function(){
    $(".burger_menu").fadeOut(300);
  });

  $(".send_feedback").click(function(){
    let name = $(".name-mask");
    let phone = $(".phone-mask");
    let telegram = $(".telegram-maks");
    
    if(name.val().length === 0){
      $(name).addClass("error");
    }else if(phone.val().length === 0){
      $(name).removeClass("error");
      $(phone).addClass("error");
    }else if(telegram.val().length === 0){
      $(phone).removeClass("error");
      $(telegram).addClass("error");
    }else{
      $(name).removeClass("error");
      $(phone).removeClass("error");
      $(telegram).removeClass("error");

      let data = {"status": "send_data", "chat":"804472904", "name": $(name).val(), "phone": $(phone).val(), "telegram": $(telegram).val()};
      // sendAjax
      $.ajax({
         url: "/server/server.php",
         method: "GET",
         data: data,
         success: function(){
            console.log("thx");
            $(".feedback").fadeOut(300);
         }
      });
    }
  });

  $(".feedback .close").click(function(){
    $(".feedback").fadeOut(300);
  });
  $(".button-feedback").click(function(){
    $(".feedback").fadeIn(300);
  });
  $(".video-popup .close").click(function(){
    $(".video-popup").fadeOut(300);
  });


  $(".iframe_load").click(function(){
    let iframe_src = $(this).find(".serverice").children(".iframe").text();

    $(".video-popup").find("iframe").attr("src" , iframe_src);
    $(".video-popup").fadeIn(300);
  });


  swiper_rewies.on('slideChange', function () {
    setTimeout(()=>{
      let index = (swiper_rewies.activeIndex)+1;
      let active = "0" + index;
      $(".section__rewievs .pagin_num .wrapper_active").text(active);
    });
  });

  function allSlides(){
    let index = (swiper_rewies.slides.length - 2);
    let active = "0" + index;
    $(".section__rewievs .pagin_num .wrapper_all").text(active);
  }
  
  $(".ui-button-more").click(function(){
    let isOpen = $(this).attr("data-open");

    if(isOpen == "false"){
      $(this).attr("data-open","true");
      $(this).parent().children(".title").text("Убрать отзывы");

      $(".section__result .cards > .wrapper .slide.hide").fadeIn();
      
      let width = $(window).width();
      setTimeout(function(){
        if(width > 1200){
          $('.section__result .cards > .wrapper').masonry({
            itemSelector: '.slide',
            gutter: 20,
            horizontalOrder: true
          });
        }
        // adaptive
      });
    }else{
      $(this).attr("data-open","false");
      $(this).parent().children(".title").text("Больше отзывов");

      $(".section__result .cards > .wrapper .slide.hide").fadeOut();
      
      setTimeout(function(){
        let width = $(window).width();
    
        if(width > 1200){
          $('.section__result .cards > .wrapper').masonry({
            itemSelector: '.slide',
            gutter: 20,
            horizontalOrder: true
          });
        }
      },500);
      // adaptive

    }
  });

  function init_image_scroll(){
    const image = $(".image_scroll");
    let start = .7;
    if($(window).width() < 500){
      start = 2.5;
    }
    $(window).scroll(function(e){
      let scroll = $(window).scrollTop();
      let offset = (image.closest("section").offset().top - image.height()) - 200;
      if(scroll > offset){
        let scroll_block = scroll - offset;
        let precent = ((scroll_block / image.closest("section").height()) - start ) * 100;
        image.css("right",precent+"%");
      }
    });
  }

});