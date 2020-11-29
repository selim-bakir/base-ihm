import Swiper from 'swiper';
import 'jquery-inview';

function renderLink(count) {
    return $('.donation-form__actions').attr('data-link') + count;
}

function calclatePercent(number) {
    return Math.ceil(number * 0.34);
}
//DON
var donationForm = $('.donation-form');

$('input[name=donation]', donationForm).on('change', function () {

    var $this = $(this);
    var parent = $this.parents('.donation-form');
    var count = $("input[name='donation']:checked").val();
    var percent = calclatePercent(count);
    var discount = percent ? percent : '……';

    $('.count', parent).text(discount);
    if (count) {
        var url = renderLink(count);
        parent.find('.btn').attr('href', url);
    }
    $('input[name=donation]').parent().parent().removeClass('active');
    $(this).parent().parent().addClass('active');
});

$('.donation-form__input', donationForm).on('focus', function () {
    var $this = $(this),
        form = $this.parents('.donation-form'),
        radioBtn = $('.donation-form__item');
    radioBtn.removeClass('active');
    $('input[name=donation]', form).prop('checked', false);
    $('.count', form).text('……');
    $this.attr('placeholder', '');
    $this.addClass('active');
});

$('.donation-form__input', donationForm).on('focusout', function () {
    $(this).attr('placeholder', 'Montant libre');
    if (!$(this).val()) {
        $(this).removeClass('active');
    }

});

$('.donation-form__input', donationForm).on('input', function () {
    var $this = $(this);
    var parent = $this.parents('.donation-form');
    var count = $this.val();
    count = count.replace(/ /g, "");
    var percent = calclatePercent(count);
    var discount = percent ? percent : '……';
    $('.count', parent).text(discount);
    if (percent) {
        var url = renderLink(count);
        parent.find('.btn').attr('href', url);
    }
});

$('.donation-form__input', donationForm).keypress(function (evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
});

$('.donation-form__input', donationForm).keyup(function (event) {

    // format number
    $(this).val(function (index, value) {
        return value.
        replace(/\D/g, "").
        replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    });
});



"use strict";(function ($) {
    $.fn.countTo = function (options) {
      options = options || {};
  
      return $(this).each(function () {
        // set options for current element
        var settings = $.extend({}, $.fn.countTo.defaults, {
          from: $(this).data('from'),
          to: $(this).data('to'),
          speed: $(this).data('speed'),
          refreshInterval: $(this).data('refresh-interval'),
          decimals: $(this).data('decimals') },
        options);
  
        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;
  
        // references & variables that will change with each update
        var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data('countTo') || {};
  
        $self.data('countTo', data);
  
        // if an existing interval can be found, clear it first
        if (data.interval) {
          clearInterval(data.interval);
        }
        data.interval = setInterval(updateTimer, settings.refreshInterval);
  
        // initialize the element with the starting value
        render(value);
  
        function updateTimer() {
          value += increment;
          loopCount++;
  
          render(value);
  
          if (typeof settings.onUpdate == 'function') {
            settings.onUpdate.call(self, value);
          }
  
          if (loopCount >= loops) {
            // remove the interval
            $self.removeData('countTo');
            clearInterval(data.interval);
            value = settings.to;
  
            if (typeof settings.onComplete == 'function') {
              settings.onComplete.call(self, value);
            }
          }
        }
  
        function render(value) {
          var formattedValue = settings.formatter.call(self, value, settings);
          $self.html(formattedValue);
        }
      });
    };
  
    $.fn.countTo.defaults = {
      from: 0, // the number the element should start at
      to: 0, // the number the element should end at
      speed: 1000, // how long it should take to count between the target numbers
      refreshInterval: 100, // how often the element should be updated
      decimals: 0, // the number of decimal places to show
      formatter: formatter, // handler for formatting the value before rendering
      onUpdate: null, // callback method for every time the element is updated
      onComplete: null // callback method for when the element finishes updating
    };
  
    function formatter(value, settings) {
      return value.toFixed(settings.decimals);
    }
  })(jQuery);
  
  jQuery(function ($) {
    // custom formatting example
    $('.count-number').data('countToOptions', {
      formatter: function formatter(value, options) {
        return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
      } });
  
  
  
    $('.numbers-block').one('inview', function () {
  
      // start all the timers
      $('.timer').each(count);
  
    });
  
    function count(options) {
      var $this = $(this);
      options = $.extend({}, options || {}, $this.data('countToOptions') || {});
      $this.countTo(options);
    }
  });
  
  