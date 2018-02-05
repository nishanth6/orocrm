
$.fn.initMutliSelect = function () {
    $('.list-group.checked-list-box .list-group-item').each(function () {
        // Settings
        var $widget = $(this),
                $checkbox = $('<input type="checkbox" class="hidden" />'),
                color = ($widget.data('color') ? $widget.data('color') : "primary"),
                style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
                settings = {
                    on: {
                        icon: 'glyphicon glyphicon-check'
                    },
                    off: {
                        icon: 'glyphicon glyphicon-unchecked'
                    }
                };

        $widget.css('cursor', 'pointer');
        $checkbox.prop('checked', $(this).hasClass("active"));
        $widget.append($checkbox);

        // Event Handlers
        $widget.on('click', function (event) {
            event.stopImmediatePropagation();
            if (typeof validateMultiSelect == 'function' && validateMultiSelect(this)) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
                $checkbox.triggerHandler('change');
            } else if (typeof validateMultiSelect != 'function') {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
                $checkbox.triggerHandler('change');
            }
             if (typeof updateMultiSelect == 'function') {
                 updateMultiSelect(this);
             }
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });


        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $widget.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $widget.find('.state-icon')
                    .removeClass()
                    .addClass('state-icon ' + settings[$widget.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $widget.addClass(style + color + ' active');
            } else {
                $widget.removeClass(style + color + ' active');
            }
        }

        // Initialization
        function init() {

            if ($widget.data('checked') == true) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
            }

            updateDisplay();

            // Inject the icon if applicable
            if ($widget.find('.state-icon').length == 0) {
                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
            }
        }
        init();
    });
};
$.fn.getSelectdId = function () {
    var checkedItems = [], counter = 0;
    $(this).children(".check-list-box li.active").each(function (idx, li) {
        checkedItems[counter] = $(li).data('id');
        counter++;
    });
    return checkedItems;
};
$.fn.getSelectdIdAndText = function () {
    var checkedItems = [], counter = 0;
    $(this).children(".check-list-box li.active").each(function (idx, li) {
        var dataItem = {};
        dataItem.id = $(li).data('id');
        dataItem.name = $(li).text();
        checkedItems.push(dataItem);
        counter++;
    });
    return checkedItems;
};
$.fn.clearSelection = function () {
    $(this).children(".check-list-box li.active").each(function (idx, li) {
        $(li).children("input:checkbox").prop('checked', false);
        $(li).children("input:checkbox").change();
    });
};