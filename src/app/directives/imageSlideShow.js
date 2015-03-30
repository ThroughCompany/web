angular.module('throughCompanyApp').directive('imageSlideShow', [
  'utilsService',
  '$timeout',
  '$interval',
  function(utilsService, $timeout, $interval) {
    'use strict';

    return {
      restrict: 'A',
      replace: true,
      link: function(scope, element, attrs) {
        $timeout(function() {
          var els = element.children('.slide').css({
            'z-index': 0,
            display: 'none'
          }).first().css({
            'z-index': 100,
            display: 'block'
          });
          var slides = [];

          _.each(element.children('.slide'), function(slide) {
            slides.push({
              number: slides.length + 1,
              el: angular.element(slide),
              active: slides.length === 0
            });
          });

          var interval = attrs.interval || 4500;
          var fadeSpeed = attrs.fadeSpeed || 2500;

          $interval(function() {
            var activeSlide = _.find(slides, function(slide) {
              return slide.active;
            });
            var nextSlide = slides[(slides.indexOf(activeSlide) + 1) === slides.length ? 0 : slides.indexOf(activeSlide) + 1];

            activeSlide.el.fadeOut(fadeSpeed);

            nextSlide.el.fadeIn(fadeSpeed, function() {
              activeSlide.active = false;
              activeSlide.el.css('z-index', 0);
              nextSlide.active = true;
              nextSlide.el.css('z-index', 100);
            });
            
          }, interval);
        });
      }
    };
  }
]);
