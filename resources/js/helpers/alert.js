import {trans} from "@/helpers/i18n";

/**
 * Custom alert message
 * @param type
 * @param message
 * @param title
 * @private
 */
const _message = function (type, message, title = '') {
    if (!title) {
        for (var i in ['success', 'warning', 'danger']) {
            if (type === i) {
                title = trans('global.alerts.' + i);
                break;
            }
        }
    }
    window.alert(title + ' ' + message);

}

/**
 * Custom confirm alert
 * @param func_if_yes
 * @param func_if_cancel
 * @param msg
 * @param title
 * @param type
 * @private
 */
const _confirm = function (func_if_yes, func_if_cancel, msg, title, type) {

    // Default implementation
    if (!type) {
        type = 'success';
    }
    if (!msg) {
        msg = trans('global.alerts.confirm_action_message');
    }
    if (!title) {
        title = trans('global.alerts.confirm');
    }
    msg = title + ' - ' + msg;
    if (window.confirm(msg)) {
        if (func_if_yes) {
            func_if_yes();
        }
    } else {
        if (func_if_cancel) {
            func_if_cancel();
        }
    }
    // Swal implementation
    /*
    swal($.extend({
            title: title,
            text: msg,
            type: type,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Ok",
            allowEscapeKey: false,
            allowOutsideClick: false
        }, params || {})
    ).then(function(isConfirm) {
        if (isConfirm && func_if_yes instanceof Function){
            func_if_yes();
        }
    }, function(dismiss) {
        // dismiss can be 'cancel', 'overlay', 'close', 'timer'
        if (dismiss === 'cancel' && func_if_cancel instanceof Function) {
            func_if_cancel()
        }
    })*/
};

/**
 * Success alert
 * @param message
 * @param title
 */
const messageSuccess = function (message, title = '') {
    _message('success', message, title);
}

/**
 * Warning alert
 * @param message
 * @param title
 */
const messageWarning = function (message, title = '') {
    _message('warning', message, title);
}

/**
 * Danger alert
 * @param message
 * @param title
 */
const messageDanger = function (message, title = '') {
    _message('danger', message, title);
}

/**
 * Success confirmation
 * @param callback_yes
 * @param callback_cancel
 * @param msg
 * @param title
 */
const confirmSuccess = function (callback_yes, callback_cancel, msg, title) {
    _confirm(callback_yes, callback_cancel, msg, title, 'success')
}

/**
 * Warning confirmation
 * @param callback_yes
 * @param callback_cancel
 * @param msg
 * @param title
 */
const confirmWarning = function (callback_yes, callback_cancel, msg, title) {
    _confirm(callback_yes, callback_cancel, msg, title, 'warning')
}

/**
 * Danger confirmation
 * @param callback_yes
 * @param callback_cancel
 * @param msg
 * @param title
 */
const confirmDanger = function (callback_yes, callback_cancel, msg, title) {
    _confirm(callback_yes, callback_cancel, msg, title, 'danger')
}


export default {
    messageSuccess,
    messageWarning,
    messageDanger,
    confirmSuccess,
    confirmWarning,
    confirmDanger
}
