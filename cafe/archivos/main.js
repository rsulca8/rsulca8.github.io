
(function($) {
  "use strict";


  // preloader - start
  // --------------------------------------------------

  // preloader - end
  // --------------------------------------------------


  // main search btn - start
  // --------------------------------------------------
  $('.main_search_btn').on('click', function() {
    $('.main_search_btn > i').toggleClass('fa-times');
  });
  // main search btn - end
  // --------------------------------------------------

  // wow js - start
  // --------------------------------------------------

  // popup images & videos - end
  // --------------------------------------------------

  // main slider - start
  // --------------------------------------------------
  $('.main_slider').slick({
    dots: true,
    fade: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    autoplaySpeed: 6000,
    prevArrow: ".main_left_arrow",
    nextArrow: ".main_right_arrow"
  });

  $('.main_slider').on('init', function (e, slick) {
    var $firstAnimatingElements = $('div.slider_item:first-child').find('[data-animation]');
    doAnimations($firstAnimatingElements);
  });
  $('.main_slider').on('beforeChange', function (e, slick, currentSlide, nextSlide) {
    var $animatingElements = $('div.slider_item[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
    doAnimations($animatingElements);
  });
  var slideCount = null;

  $('.main_slider').on('init', function (event, slick) {
    slideCount = slick.slideCount;
    setSlideCount();
    setCurrentSlideNumber(slick.currentSlide);
  });
  $('.main_slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    setCurrentSlideNumber(nextSlide);
  });

  function setSlideCount() {
    var $el = $('.slide_count_wrap').find('.total');
    if (slideCount < 10) {
      $el.text('0' + slideCount);
    } else {
      $el.text(slideCount);
    }
  }

  function setCurrentSlideNumber(currentSlide) {
    var $el = $('.slide_count_wrap').find('.current');
    $el.text(currentSlide + 1);
  }

  function doAnimations(elements) {
    var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    elements.each(function () {
      var $this = $(this);
      var $animationDelay = $this.data('delay');
      var $animationType = 'animated ' + $this.data('animation');
      $this.css({
        'animation-delay': $animationDelay,
        '-webkit-animation-delay': $animationDelay
      });
      $this.addClass($animationType).one(animationEndEvents, function () {
        $this.removeClass($animationType);
      });
    });
  }

  var $timer = 6000;
  function progressBar() {
    $(".slick-progress").find("span").removeAttr("style");
    $(".slick-progress").find("span").removeClass("active");
    setTimeout(function () {
      $(".slick-progress").find("span").css("transition-duration", $timer / 1000 + "s").addClass("active");
    }, 100);
  }

  progressBar();
  $('.main_slider').on("beforeChange", function (e, slick) {
    progressBar();
  });
  // main slider - end
  // --------------------------------------------------


  (async () => {
    // mostrarLoader();
    var response = await fetch("https://script.google.com/macros/s/AKfycbylQi2ia0LoeZYIxw7zv_T1aEb3CC0vhScN-tJqR-e6_YWzNzu6XZacMyCXykLRuE6q/exec");
    var json_productos = await response.json();
    function agregar_categoria(nombre_categoria) {
        var id_categoria = nombre_categoria.replace(" ", "_");
        var botones_categorias = document.querySelector("#categorias_id");
        botones_categorias.innerHTML += `<li>
                                          <button class="button text-uppercase" data-filter=".${id_categoria}">${nombre_categoria}</button>
                                        </li>`;
        var contenido_categoria = document.createElement("div");
        contenido_categoria.id = id_categoria;
        contenido_categoria.className = `element-item ${id_categoria}`;
        contenido_categoria.setAttribute("data-category", id_categoria);
        contenido_categoria.setAttribute("style", "position: absolute; left: 0px; top: 0px;");
        let menu_content = document.querySelector(".contenido-menu");
        menu_content.append(contenido_categoria);


    }

    function existeImagen(image_url){
      try{
        var http = new XMLHttpRequest();
    
        http.open('HEAD', image_url, false);
        http.send();
        return http.status != 404;
      }
      catch(error){
        return false;
      }
    }



    function agregar_producto(nombre_categoria, nombre_producto, precio, comentario, descripcion, url_imagen) {
        let id_categoria = nombre_categoria.replace(" ", "_");
        let contenido_categorias = document.getElementById(id_categoria);


        if(url_imagen == ""){
          let base_url = window.location.protocol + window.location.host + window.location.pathname
          base_url = base_url.substring(0, base_url.length - 1);
          url_imagen = base_url + "/imagenes/sin_imagen.png";
        }


        if (comentario != "") {
          contenido_categorias.innerHTML += `<div class="recipe_item">
          <div class="content_col">
            <a class="item_image" href="#">
              <img src="${url_imagen}" he alt="Imagen de ${nombre_producto}">
            </a>
            <div class="item_content">
              <h3 class="item_title text-uppercase">
                <a href="#">${nombre_producto}</a>
              </h3>
              <p class="mb-0">
                ${descripcion}
              </p>
              <span class="comentario">${comentario}</span>
            </div>
          </div>
          <div class="content_col">
            <strong class="item_price">
              <sub>$</sub>${precio}
            </strong>
          </div>
          </div>`;
        }
        else {
          contenido_categorias.innerHTML += `<div class="recipe_item">
          <div class="content_col">
            <a class="item_image" href="#">
              <img src="${url_imagen}" alt="Imagen de ${nombre_producto}">
            </a>
            <div class="item_content">
              <h3 class="item_title text-uppercase">
                <a href="#">${nombre_producto}</a>
              </h3>
              <p class="mb-0">
                ${descripcion}
              </p>
            </div>
          </div>
          <div class="content_col">
            <strong class="item_price">
              <sub>$</sub>${precio}
            </strong>
          </div>
          </div>`;
        }

    }

    var categorias = Object.keys(json_productos);
    for (let id_categoria of categorias) {
        agregar_categoria(json_productos[id_categoria].nombre_categoria);
        var productos = Object.keys(json_productos[id_categoria].productos);
        for (let id_producto of productos) {
            agregar_producto(json_productos[id_categoria].nombre_categoria,
                json_productos[id_categoria].productos[id_producto].nombre_producto,
                json_productos[id_categoria].productos[id_producto].precio,
                json_productos[id_categoria].productos[id_producto].comentario,
                json_productos[id_categoria].productos[id_producto].descripcion,
                json_productos[id_categoria].productos[id_producto].url_imagen);
        }
    }
        // ocultarLoader();


          // back to top - start
      // --------------------------------------------------
      if ($(this).scrollTop() > 200) {
        $('.backtotop:hidden').stop(true, true).fadeIn();
      } else {
        $('.backtotop').stop(true, true).fadeOut();
      }
    
    
      $(".scroll").on('click', function() {
        $("html,body").animate({scrollTop: 0}, "slow");
        return false
      });
    
    // back to top - end
    // --------------------------------------------------
   
    

  // sticky header - start
  // --------------------------------------------------
  if ($(this).scrollTop() > 120) {
    $('.header_section').addClass("sticky")
  } else {
    $('.header_section').removeClass("sticky")
  }

// sticky header - end
// --------------------------------------------------
var wow = new WOW({
  animateClass: 'animated',
  offset: 100,
  mobile: true,
  duration: 1000,
});
wow.init();
// wow js - end
// --------------------------------------------------

// popup images & videos - start
// --------------------------------------------------
$('.popup_video').magnificPopup({
  type: 'iframe',
  preloader: false,
  removalDelay: 160,
  mainClass: 'mfp-fade',
  fixedContentPos: false
});

$('.zoom-gallery').magnificPopup({
  delegate: '.popup_image',
  type: 'image',
  closeOnContentClick: false,
  closeBtnInside: false,
  mainClass: 'mfp-with-zoom mfp-img-mobile',
  gallery: {
    enabled: true
  },
  zoom: {
    enabled: true,
    duration: 300,
    opener: function(element) {
      return element.find('img');
    }
  }
  
});


  // isotope filter - start
  // --------------------------------------------------
  var $grid = $(".grid").isotope({
    itemSelector: ".element-item",
    layoutMode: "fitRows"
  });

  var filterFns = {

    numberGreaterThan50: function () {
      var number = $(this).find(".number").text();
      return parseInt(number, 10) > 50;
    },

    ium: function () {
      var name = $(this).find(".name").text();
      return name.match(/ium$/);
    }
  };

  $(".filters-button-group").on("click", "button", function () {
    var filterValue = $(this).attr("data-filter");

    filterValue = filterFns[filterValue] || filterValue;
    $grid.isotope({ filter: filterValue });
  });

  $(".filters-button-group").each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "button", function () {
      $buttonGroup.find(".active").removeClass("active");
      $(this).addClass("active");
    });
  });
  // isotope filter - end
  // --------------------------------------------------
  $('#preloader').fadeOut('slow',function(){$(this).remove();});


})();


})(jQuery);


