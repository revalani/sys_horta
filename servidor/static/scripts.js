// tabela = [];

function criandoTabela() {
    $.ajax({
            url: "qlive/",
            type: 'get',
            contentType: "application/json",
            dataType: 'json'
        })
        .done(function (data) {
            // console.log(data);
            $('.table-hover').empty();
            for (var i = 0; i < data.length; i++) {
                $('.table-hover').append($('<tr>')
                    .append($('<td/>').val(data[i]['estufa']).text(data[i]['estufa']))
                    .append($('<td />').val(data[i]['cultura']).text(data[i]['cultura']))
                    .append($('<td/>').val(data[i]['termometro']).text(data[i]['termometro']))
                    .append($('<td/>').val(data[i]['co2']).text(data[i]['co2']))
                    .append($('<td/>').val(data[i]['umidade_ar']).text(data[i]['umidade_ar']))
                    .append($('<td/>').val(data[i]['luximetro']).text(data[i]['luximetro']))
                );
            }
            setTimeout(function () {
                criandoTabela();
            }, 1500);
        })
        .fail(function (jqXHR, textStatus, msg) {
            console.log((jqXHR, '\n', msg, '\n', textStatus));
        });
};

function grafico() {
    var estufa = $('#estufa').val();
    var sensor = $('#sensor').val();
    var data = $('#date').val();

    $.ajax({
            url: "qgrafco/",
            type: 'post',
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify({
                'estufa': estufa,
                'sensor': sensor,
                'data': data
            }),
        })
        .done(function (data) {
            console.log(data);
            $('.table-hover').empty();
            for (var i = 0; i < data.length; i++) {
                $('.table-hover').append($('<tr>')
                    .append($('<td/>').val(data[i][3]).text(data[i][3]))
                    .append($('<td />').val(data[i][2]).text(data[i][2]))
                );
            }
        });
}

$(document).ready(function () {
    var url = $(location).attr('pathname');

    if (url == '/graficos') {
        grafico();
    }
    if (url == '/') {
        criandoTabela();
    }
});