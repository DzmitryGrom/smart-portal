var app = angular.module('app', [
  'ngDialog',
  'ngTagsInput'
]);

app.controller('TestController', ['$scope', 'ngDialog', '$q', function ($scope, ngDialog, $q) {

  $scope.loadTags = function (query) {
    console.log('test');
    return [{id: 1, name: 'test'}, {id: 2, name: 'test 2'}];

    // return {data: [{id: 1, name: 'test'}, {id: 1, name: 'test'}]};
  };

  $scope.open = function () {
    ngDialog.open({
      className: 'ngdialog_full-width',
      template: '<div class="ng-dialog__full-width ng-dialog__wrapper">\n <div class="ng-dialog__header header"><h1 class="header__description">Добавить ссылку в раздел</h1><div class="nav"><div class="nav__link nav__link_dropdown"><span class="text">Распространители</span><div class="i-arrow i-arrow_to_down"></div></div></div><div class="header-side"><button class="button button_success button_success-full" type="button">Сохранить</button><button class="button" type="button">Отменить</button></div></div>\n    <div class="ng-dialog__content">\n        <div class="scroll">\n            <div class="article article_modal">\n                <div class="article__header">\n                    <div class="category__item category__item_full-width category__item_input category__item_icon">\n                        <i class="fa fa-link icon_blue" aria-hidden="true"></i>\n                        <input class="input" type="text" placeholder="http://www.annexus.su/">\n                    </div>\n                </div>\n                <div class="sidebar">\n                    <div class="avatar">\n                        <div class="avatar__cover avatar__cover_square avatar__cover_small">\n                            <div class="avatar__link">\n                                <img class="pic" src="interface/ava.jpg" alt="" height="65" width="65">\n                                <div class="avatar__shadow">\n                                    <span class="avatar__opacity"></span>\n                                    <a href="#" class="avatar__edit_small circle circle_xs circle_green">\n                                       <span class="icon icon-up-arrow"></span>\n                                    </a>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class="content article__content">\n                    <div class="content__caption">\n                        <textarea class="input textarea">За 25 тысяч километров я не потратил заправку признаков хорошего интерфейса</textarea>\n                    </div>\n                </div>\n                <div class="article__content">\n                    <div class="article__editor"\n                         ng-model="$ctrl.model.content"\n                         redactor="$ctrl.redactorConfig">\n                    </div>\n                    <div class="category__item category__item_full-width category__item_input category__item_icon">\n                        ссылка на доку\n                        <br>\n                        http://mbenford.github.io/ngTagsInput/demos\n                        <br>\n                        https://github.com/mbenford/ngTagsInput\n                        <tags-input ng-model="tags" display-property="name" placeholder="Добавьте теги через запятую">\n                            <auto-complete source="loadTags($query)" display-property="name"></auto-complete>\n                        </tags-input>\n                    </div>\n                    <div class="category__item category__item_tag category__item_input  category__item_icon">\n                        <span class="icon-group icon_blue"></span>\n                        <div class="tag">\n              <span class="tag__item tag__item_closer">\n                <span class="tag__text">Менеджеры</span>\n                <i class="i-closer"></i>\n              </span>\n                            <span class="tag__item tag__item_closer">\n                <span class="tag__text">Игорь Павлов</span>\n              <i class="i-closer"></i>\n              </span>\n                            <span class="tag__item tag__item_closer">\n                <span class="tag__text">Стажеры</span>\n              <i class="i-closer"></i>\n              </span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>',
      plain: true,
      scope: $scope
    });
  };

  $scope.openConfirm = function () {
    ngDialog.openConfirm({
      className: 'ngdialog_normal  ngdialog-theme-default',
      template: '<div class="ng-dialog__wrapper">\n <p class="title">Удалить раздел: Распространители</p> <p class="description">Все материалы из этого раздела буду перенесены в:</p> <div class="category__item category__item_drop category__item_input"><input class="input" type="text" placeholder="Type here" value="Неотсортированное" readonly="true"><div class="i-arrow i-arrow_to_down"></div></div><div class="category__footer  category__footer_justify-center"><button class="button button_success" type="button">Сохранить</button></div>\n</div>',
      plain: true,
      scope: $scope
    }).then(function (value) {
      console.log('Modal promise resolved. Value: ', value);
    }, function (reason) {
      console.log('Modal promise rejected. Reason: ', reason);
    });
  };
}]);