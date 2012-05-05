/*!
 * jquery.simpledateselect.js
 *
 * Copyright 2012, Kjel Delaey (https://github.com/trimentor/jquery-simpledateselect)
 * https://github.com/trimentor/jquery-simpledateselect/blob/master/LICENSE
 */
var DateSelect = (function () {
    var updateOptions;

    updateOptions = function (select, options, daysInMonth) {
        var diff, i, value;
        diff = options.length - daysInMonth;

        if (diff > 0) {
            options.slice(daysInMonth).remove();
        } else if (diff < 0) {
            for (i = options.length; i < daysInMonth; i += 1) {
                value = i + 1;
                $("<option>").attr("value", value).text(value).appendTo(select);
            }
        }
    };

    return {
        change: function () {
            $("select[id$='_1i']").each(function () {
                var day, month, year, days, daysInMonth, options;

                year = $("#" + this.id);
                month = $("#" + this.id.replace(/1i$/, "2i"));
                day = $("#" + this.id.replace(/1i$/, "3i"));
                days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                if (parseInt($(month).val(), 10)) {
                    if ($(month).val() === "2" && ($(year).val() % 4) === 0) {
                        days[1] += 1;
                    }

                    options = $(day).children("option[value!='']");
                    daysInMonth = days[$(month).val() - 1];
                    updateOptions(day, options, daysInMonth);
                }
            });
        }
    };
}());

$(function () {
    $(document).bind("date-select", function () {
        DateSelect.change();
    });

    $(".date select").change(function () {
        $(document).trigger("date-select");
    });
});
