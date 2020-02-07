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

    var hora = [];
    var valor = [];

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
        .done(function (dado) {
            $('.chart').empty();
            $('.chart').append('<canvas id="myChart"></canvas>');

            for (var i = 0; i < dado.length; i++) {
                // var d = new Date(dado[i][3]);
                // var d = d.getHours();
                // hora.push(d);
                hora.push(new Date(dado[i][3]));
                // hora.push(dado[i][3]);
                valor.push(dado[i][2]);
            }

            console.log(hora);

            var margem = 0.03;
            var maxDado = parseInt(Math.max.apply(Math, valor) * (1 + margem));
            var minDado = parseInt(Math.min.apply(Math, valor) * (1 - margem));

            /* plot graficos*/
            var ctx = document.getElementById('myChart');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: hora,
                    datasets: [{
                        label: sensor,
                        data: valor,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.1)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 2
                    }],
                },
                options: {
                    responsive: true,
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Horário'
                            },
                            distribution: 'linear',
                            // type: "time",
                            // time: {
                            //     unit: 'hour',
                            //     unitStepSize: 0.5,
                            //     round: 'hour',
                            //     tooltipFormat: "h:mm:ss a",
                            //     displayFormats: {
                            //         hour: 'MMM D, h:mm A'
                            //     }
                            // }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Valores'
                            },
                            ticks: {
                                max: maxDado,
                                min: minDado
                            }
                        }]
                    }
                }
            });
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

$('#btnform').click(function () {
    grafico();
});