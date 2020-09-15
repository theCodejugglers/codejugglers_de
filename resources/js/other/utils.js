function isArray(variable) {
	if(Object.prototype.toString.call(variable) === '[object Array]') {
		return true;
	} else {
		return false;
	}
}

function isString(variable) {
	if(typeof variable === 'string') {
		return true;
	} else {
		return false;
	}
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

var isValidFunctionName = function() {
	var validName = /^[$a-zA-Z_][0-9a-zA-Z_$]*$/i;
	var reserved = {
		'abstract':true,
		'boolean':true,
		'null':true,
		'NaN':true
		//...
	};
	return function(s) {
		// Ensure a valid name and not reserved.
		return validName.test(s) && !reserved[s];
	};
}();

/**
 * FROM: http://anentropic.wordpress.com/2009/06/25/javascript-iso8601-parser-and-pretty-dates/
 */
function parseISO8601StringToDate(str) {
	// we assume str is a UTC date ending in 'Z'

	var parts = str.split('T'),
	dateParts = parts[0].split('-'),
	timeParts = parts[1].split('Z'),
	timeSubParts = timeParts[0].split(':'),
	timeSecParts = timeSubParts[2].split('.'),
	timeHours = Number(timeSubParts[0]),
	newDate = new Date;

	newDate.setUTCFullYear(Number(dateParts[0]));
	newDate.setUTCMonth(Number(dateParts[1])-1);
	newDate.setUTCDate(Number(dateParts[2]));
	newDate.setUTCHours(Number(timeHours));
	newDate.setUTCMinutes(Number(timeSubParts[1]));
	newDate.setUTCSeconds(Number(timeSecParts[0]));
	if (timeSecParts[1]) newDate.setUTCMilliseconds(Number(timeSecParts[1]));

	// by using setUTC methods the date has already been converted to local time(?)
	return newDate;
}

function getOsType(string) {
	if (string.toLowerCase().indexOf("android") !== -1) {
		return "android";
	} else if (string.toLowerCase().indexOf("ios") !== -1) {
		return "ios";
	}
	return "";
}

function htmlEncode(value){
	return $('<div/>').text(value).html();
}

function htmlDecode(value){
	return $('<div/>').html(value).text();
}

function hide(jqueryObject) {
	jqueryObject.addClass('hide');
}

function show(jqueryObject) {
	jqueryObject.removeClass('hide');
}

function l(string) {
	console.log(string);
}

function getAjaxContextPath(requestedPath) {
	if (requestedPath != null) {
		var pathArray = requestedPath.split("/");
		var firstFolder = "";
		for ( i = 0; i < pathArray.length; i++ ) {
			if (pathArray[i] != "") {
				firstFolder = pathArray[i];
				break;
			}
		}
		var locationPath = window.location.pathname;
		var position = locationPath.indexOf(firstFolder);
		if (position > -1) {
			return locationPath.substr(0, position-1);
		}
	}
	return contextPath;
}

function getAjaxContextPathComplete(requestedPath) {
	if (requestedPath != null) {
		var locationPath = window.location.pathname;
		var position = locationPath.indexOf(requestedPath);
		if (position > -1) {
			return locationPath.substr(0, position);
		}
	}
	return contextPath;
}

function getHtmlForLockState(locked) {
	if (locked != null && locked == true) {
		var htmlLocked = '<div class="pagination-centered alert alert-error" style="padding:5px; width: 30px; margin-bottom: 0px; margin-left: auto; margin-right: auto; "><i class="icon-lock"></i></div>';
		return htmlLocked;
	} else {
		var htmlOpen = '<div class="pagination-centered alert alert-success" style="padding:5px; width: 30px; margin-bottom: 0px; margin-left: auto; margin-right: auto; "><i class="icon-ok-sign"></i></div>';
		return htmlOpen;
	}
}

function getHtmlForActiveState(isActive) {
	if (isActive != null && isActive == true) {
		var htmlActive = '<div class="pagination-centered alert alert-success" style="padding:5px; width: 30px; margin-bottom: 0px; margin-left: auto; margin-right: auto; "><i class="icon-ok"></i></div>';
		return htmlActive;
	} else {
		var htmlInActive = '<div class="pagination-centered alert alert-error" style="padding:5px; width: 30px; margin-bottom: 0px; margin-left: auto; margin-right: auto; "><i class="icon-remove"></i></div>';
		return htmlInActive;
	}
}

function getHtmlForYesNeutralState(isActive) {
	if (isActive != null && isActive == true) {
		var htmlActive = '<div class="pagination-centered alert alert-success" style="padding:5px; width: 30px; margin-bottom: 0px; margin-left: auto; margin-right: auto; "><i class="icon-ok"></i></div>';
		return htmlActive;
	} else {
		var htmlInActive = '<div class="pagination-centered alert alert-block" style="padding:5px; width: 30px; margin-bottom: 0px; margin-left: auto; margin-right: auto; "><i class="icon-minus-sign"></i></div>';
		return htmlInActive;
	}
}

function getHtmlForLiveState(isLive) {
	if (isLive != null && isLive == true) {
		var htmlActive = '<div class="pagination-centered alert alert-success" style="padding:5px; width: 60px; margin-bottom: 0px; margin-left: auto; margin-right: auto; "><i class="icon-ok-sign"></i>&nbsp;|&nbsp;<i class="icon-warning-sign"></i></div>';
		return htmlActive;
	} else {
		var htmlInActive = '<div class="pagination-centered alert alert-info" style="padding:5px; width: 60px; margin-bottom: 0px; margin-left: auto; margin-right: auto; "><i class="icon-minus-sign"></i>&nbsp;|&nbsp;<i class="icon-eye-open"></i></div>';
		return htmlInActive;
	}
}

function disableButton(button, disable) {
	if (button != null) {
		if (disable != null && disable == true) {
			button.addClass('disabled');
			button.attr('disabled');
		} else {
			button.removeClass('disabled');
			button.removeAttr('disabled');
		}
	}
}

function unselectUITableRows(table) {
	table.$('tr.row_selected').removeClass('row_selected').tooltip('hide');
	toggleEditButtons();
}

function toggleEditButtons() {
	if (selected_id == null) {
		disableButton($('#bt_push'), true);
		disableButton($('#bt_update'), true);
		disableButton($('#bt_delete'), true);
	} else {
		disableButton($('#bt_push'), false);
		disableButton($('#bt_update'), false);
		disableButton($('#bt_delete'), false);
	}
}

function deleteOperation(entityType, id){
	$('#modalLabel').html('Warning:');
	$('#modalMsg').html('Do you really want to delete this entry?');
	$('#modalBody').attr('class', 'modal-body');
	$('#buttonSubmit').attr('class', 'btn btn-danger no_return');
	$('#modalCheck').modal('show');

	$('#buttonSubmit').click(function(e){
		$('#modalCheck').modal("hide");
		$.ajax({
			type: "DELETE",
			url: contextPath + '/entity/' + entityType + '/' + id,
			success: function(response,status,xhr){
				if (response != null && isArray(response)) {
					$('#errorModalLabel').html('Warning:');
					$('#errorModalMsg').html('Entry could not be deleted. It is referenced by: <strong>' + response[0] + '</strong>.');
					$('#errorModalBody').attr('class', 'modal-body error alert-error');
					$('#errorModal').modal();
				} else {
					unselectUITableRows(oTable);
					selected_id = null;
					oTable.fnDraw(false);
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				$('#errorModalLabel').html("Error Server "+xhr.status+":");
				$('#errorModalMsg').html(xhr.responseText);
				$('#errorModalBody').attr('class', 'modal-body error alert-error');
				$('#errorModal').modal();
			}
		});
	})
;
}
