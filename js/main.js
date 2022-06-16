$(document).ready(function() {
    $('.projects__box').slick({
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        autoplay: true,
        infinite: true,
    });

    $('.menu__btn').on('click', function (e) {
      e.preventDefault();
      $('.menu__btn').toggleClass('menu__btn--close');
      $('.menu__list').toggleClass('menu__list--active');
      $('.menu__btn-element').toggleClass('menu__btn-element_close');
    });

    $('.scrollto a').on('click', function scroll(e) {
      e.preventDefault();
      let href = $(this).attr('href');
      $('html, body').animate({
        scrollTop: $(href).offset().top - 95
      }, {
        duration: 370,
        easing: "linear"
      });
      $('.menu__btn').removeClass('menu__btn--close');
      $('.menu__list').removeClass('menu__list--active');
      $('.menu__btn-element').removeClass('menu__btn-element_close');
      return false;
    });

    $('.projects__box__content').click(function (e) {
      e.preventDefault();
      let elem = e.target;
      let id = '1' + elem.getAttribute('id');
      $('.modal').removeClass('modal--active');
      jQuery("#"+id).addClass('modal--active');
    });

    $('.modal__close').on('click', function (e) {
      e.preventDefault();
      $('.modal').removeClass('modal--active');
    });

    $('.modal__footer__items--scrolllto a').on('click', function scroll(e) {
      e.preventDefault();
      let href = $(this).attr('href');
      $('html, body').animate({
        scrollTop: $(href).offset().top - 95
      }, {
        duration: 370,
        easing: "linear"
      });
      $('.modal').removeClass('modal--active');
      return false;
    });

    $('#form-btn').click(function(e){
      e.preventDefault();
      x = document.getElementById('name').value;
      if (x === "") {
        document.getElementById('review__error').textContent = "Enter your full name";
        return false;
      }
      x =  document.getElementById('email').value;
      if (x === "") {
        document.getElementById('review__error').textContent = "Enter your E-mail";
        return false;
      } else {
          let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if(!re.test(x)){
              document.getElementById('review__error').textContent = "Invalid Email";
              return false;
          }
      }
      x = document.getElementById('messages').value;
      if (x === "") {
        document.getElementById('review__error').textContent = "You did not write what you are interested in";
        return false;
      }
      $('#review__error').removeClass("error");
      document.getElementById('review__error').textContent = "Sending...";
  
      
      const ContactsData = {
        'firstname': $('input[name=name]').val(),
        'email': $('input[name=email]').val(),
        'messages': $('textarea[name=messages]').val(),
      };
  
      $.ajax({
        url: 'mail.php',
        type: "POST",
        data: ContactsData,
        success: function() {
            $('#form').trigger('reset');
            $('#review__error').text("Your message has been sent!");
            setTimeout(function () {
              $('#review__error').text("").addClass("error");
            }, 2000);
        },
        error: function (jqXHR) {
            $('#review__error').text(jqXHR);
        }
      });
    });
});