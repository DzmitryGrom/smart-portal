if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.iframeinsert = function () {
    return {

        getTemplate: function () {
            return String()
                + '<section id="redactor-modal-iframe-insert">'
                + '<label>Ширина</label>'
                + '<input type="text" id="redactor-modal-width"></<input>'
                + '<label>Высота</label>'
                + '<input type="text" id="redactor-modal-height"></<input>'
                + '<label>Url</label>'
                + '<input type="url" id="redactor-modal-url"></<input>'
                + '</section>'
                + '<footer>'
                + '<button class="redactor-modal-btn redactor-modal-close-btn" style="width: 50%;">Отменить</button>'
                + '<button id="redactor-modal-button-isertiframe" class="redactor-modal-btn redactor-modal-action-btn" style="width: 50%;">Вставить</button>'
                + '</footer>'

        },
        init: function () {
            var button = this.button.add('iframeinsert', 'Вставить iframe');
            this.button.addCallback(button, this.iframeinsert.show);
        },
        show: function () {
            this.modal.addTemplate('iframeinsert', this.iframeinsert.getTemplate());
            this.modal.load('iframeinsert', 'Встроить страницу', 600);
            $("#redactor-modal-button-isertiframe").on('click', this.iframeinsert.insert);
            this.modal.show();

        },
        insert: function () {

            var iframeUrl = $.trim($('#redactor-modal-url').val());
            var iframeUrl = iframeUrl.replace(/(<([^>]+)>)/ig, "");

            if (iframeUrl !== '') {
                var pattern = '((xn--)?[a-z0-9]+(-[a-z0-9]+)*\\.)+[a-z]{2,}';
                var re = new RegExp('^(http|ftp|https)://' + pattern, 'i');
                var re2 = new RegExp('^' + pattern, 'i');

                if (iframeUrl.search(re) == -1 && iframeUrl.search(re2) === 0 && this.opts.linkProtocol) {
                    iframeUrl = this.opts.linkProtocol + '://' + iframeUrl;
                }

            } else {
                alert('Введите url.');
                return;
            }

            var iframeWidth = $('#redactor-modal-width').val();

            if (iframeWidth == '') {
                iframeWidth = '100%';
            }

            var iframeHeight = $('#redactor-modal-height').val();

            if (iframeHeight == '') {
                iframeHeight = 1000;
            }

            var html = '<iframe src="' + iframeUrl + '" width="' + iframeWidth + '" height="' + iframeHeight + '"></iframe>';

            this.modal.close();

            this.buffer.set(); // for undo action
            this.insert.html(html);
        },
        close: function () {
            this.modal.close();
        }

    };
};