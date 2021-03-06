$(document).ready(function () {
    var $select = $("#res-party-size");
    for (i=1;i<=100;i++){
        $select.append($('<option></option>').val(i).html(i))
    }
});

function submitNewReservation(resName, resEmail, resPartySize, resMonth, resDay, resYear, resHour, resMinute) {
    // parse reservation form from front end, submit to backend if validated
    let rName = null
    if (resName) {
        rName = resName;
    } else {
        rName = document.getElementById("res-name").value;
    }
    if (rName == null || rName == '') {
        alert('Reservation name must be populated');
        return;
    }
    let rEmail = null
    if (resEmail) {
        rName = resEmail;
    } else {
        rEmail  = document.getElementById("res-email").value;
    }
    if (rEmail == null || rEmail == '') {
        alert('Reservation email must be populated');
        return;
    }

    let rSize = null
    if (resPartySize) {
        rSize = resPartySize;
    } else {
        rSize = $("#new-res-form .form-int-counter")[0].value;
    }
    if (rSize == 0) {
        alert('Reservation party must be greater than 0');
        return;
    }

    let rMon = null
    if (resMonth) {
        rMon = resMonth;
    } else {
        e = document.getElementById("form-date-mm");
        rMon = e.options[e.selectedIndex].value;
    }
    let rDay = null
    if (resDay) {
        rDay = resDay;
    } else {
        e = document.getElementById("form-date-dd");
        rDay = e.options[e.selectedIndex].value;
    }
    let rYear = null
    if (resYear) {
        rYear = resYear;
    } else {
        e = document.getElementById("form-date-yyyy");
        rYear = e.options[e.selectedIndex].value;
    }

    let rHH = null
    if (resHour) {
        rHH = resHour;
    } else {
        e = document.getElementById("form-time-hh");
        rHH = e.options[e.selectedIndex].value;
    }

    let rMM = null
    if (resMinute) {
        rMM = resMinute;
    } else {
        e = document.getElementById("form-time-mm");
        rMM = e.options[e.selectedIndex].value;
    }

    payload = {
        'name': rName,
        'email': rEmail,
        'party_size': rSize,
        'date': rYear + '-' + rMon + '-' + rDay,
        'time': rHH + ':' + rMM
    };

    return $.ajax({
        type: 'POST',
        url: '/reservation/create',
        dataType: 'json',
        data: JSON.stringify(payload),
        contentType: 'application/json;charset=UTF-8'
    }).then(function () {
        location.href = '/reservation';
        return;
    }, function(){
        location.href = '/reservation';
        return;
    });
}