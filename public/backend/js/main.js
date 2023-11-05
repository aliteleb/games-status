$(document).ready(function () {

    $('.check_all').change(function () {
        var parentTable = $(this).closest('table'); // Find the parent table
        var childCheckboxes = parentTable.find('input[type=checkbox]'); // Find all child checkboxes within the table


        var isChecked = $(this).prop('checked');

        // Check child checkboxes one by one
        childCheckboxes.each(function (index) {
            let checkbox = $(this);
            if (isChecked) {
                checkbox.parent().addClass('checked');
                checkbox.prop('checked', isChecked);
            } else {
                checkbox.parent().removeClass('checked');
                checkbox.prop('checked', isChecked);
            }
        });
    });

    toastr.options = {
        closeButton: true,
        debug: false,
        newestOnTop: true,
        progressBar: true,
        positionClass: 'toast-bottom-left',
        preventDuplicates: false,
        onclick: null,
        showDuration: '300',
        hideDuration: '300',
        timeOut: '2000',
        extendedTimeOut: '1000',
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut'
    };

});
