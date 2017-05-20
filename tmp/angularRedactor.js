
var redactorOptions = {
  minHeight: 20,
  plugins: ['fullscreen', 'iframeinsert', 'video', 'fontcolor', 'fontfamily', 'fontsize', 'table'],
  buttons: [
    'html',
    'formatting',
    'bold',
    'italic',
    'deleted',
    'underline',
    'unorderedlist',
    'orderedlist',
    'outdent',
    'indent',
    'image',
    'file',
    'link',
    'alignment',
    'horizontalrule',
  ]
  // buttons: ['html', 'bold', 'italic', 'orderedlist', 'horizontalrule', 'image']
};


angular
  .module('app')
  .constant('redactorOptions', redactorOptions)
  .directive('redactor', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {

        scope.redactorLoaded = false;

        var updateModel = function updateModel(value) {
            console.log('update');
            $timeout(function () {
              scope.$apply(function () {
                ngModel.$setViewValue(value);
              });
            });
          },
          options = {
            changeCallback: updateModel
          },
          additionalOptions = attrs.redactor ?
            scope.$eval(attrs.redactor) : {},
          editor;


        angular.extend(options, redactorOptions, additionalOptions);

        var changeCallback = false;//additionalOptions.changeCallback || redactorOptions.changeCallback;
        if (changeCallback) {
          options.changeCallback = function (value) {
            updateModel.call(this, value);
            changeCallback.call(this, value);
          }
        }

        $timeout(function () {
          editor = element.redactor(options);
          ngModel.$render();
        });

        scope.$on('$destroy', function () {
          element.redactor('core.destroy');
        });

        ngModel.$render = function () {
          if (angular.isDefined(editor)) {
            $timeout(function () {
              element.redactor('code.set', ngModel.$viewValue || '');
              element.redactor('placeholder.toggle');
              scope.redactorLoaded = true;
            });
          }
        };
      }
    };
  }]);