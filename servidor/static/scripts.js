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
                // criandoTabela();
            }, 1500);
        })
        .fail(function (jqXHR, textStatus, msg) {
            console.log((jqXHR, '\n', msg, '\n', textStatus));
        });
};

function cards_lista() {
    var estufas = [];

    $.ajax({
            url: "/consulta/SELECT id_estufa FROM estufa",
            type: 'get',
            contentType: "application/json",
            dataType: 'json'
        })
        .done(function (data) {
            data.forEach(element => {
                estufas.push(element[0]);
            });

            criando_cards(estufas);

        })
        .fail(function (jqXHR, textStatus, msg) {
            console.log((jqXHR, '\n', msg, '\n', textStatus));
        });
};

function criando_cards(estufas) {
    // estufas = [1];
    estufas.forEach(element => {
        $.ajax({
                url: "/status_estufas/" + element,
                type: 'get',
                contentType: "application/json",
                dataType: 'json'
            })
            .done(function (data) {

                console.log(element, data);

                estufa_n = data[0][0];
                estufa_cultura = data[0][1];
                estufa_status = data[0][2];

                // extencao = ['termometro'
                //     'u': 'umidade_ar', 'c': 'carbono_ar', 'l': 'luximetro'
                // ]

                var co2 = '';
                var lux = '';
                var temp = '';
                var umi = '';

                data.forEach(linha => {
                    console.log(linha[3]);
                    if (linha[3] == 'luximetro') {
                        lux = '<p class="card-text"><span class="icon-sun"></span>' + linha[5] + ' lux</p>';
                    } else if (linha[3] == 'termometro') {
                        temp = '<p class="card-text"><span class="icon-temp"></span>' + linha[5] + ' °c</p>';
                    } else if (linha[3] == 'co2') {
                        co2 = '<p class="card-text"><span class="icon-co2"></span>' + linha[5] + ' ppm</p>';
                    } else if (linha[3] == 'umidade_ar') {
                        umi = '<p class="card-text"><span class="icon-humidity"></span>' + linha[5] + ' %</p>';
                    }
                });

                estufa_color = estufa_status;

                // console.log(estufa_color + ' - ' + typeof (estufa_status));
                $('#terreno_cards').append(
                    $('<div class="col-lg-4"><div class="card ' + estufa_color + ' mb-3"><div class="card-header "><span class="card-text font-weight-bolder">' + estufa_n + ' - ' + estufa_cultura + '</span><span class="float-right">' + estufa_status + '</span></div><disv class="card-body row row-cols-2"><div class="col">' + temp + lux + umi + co2 + '</div><div class="col wrap"><button type="button" data-estufa="' + estufa_n + '"class="btn  btn-md btn-block" data-toggle="modal" data-target=".bd-example-modal-xl"><span class="icon-chart-line"></span>Mais Detalhes</button><button class="btn btn-md btn-block" style="cursor: not-allowed;" disabled>Camera</button></div></div></div></div>'));
            })
            .fail(function (jqXHR, textStatus, msg) {
                console.log((jqXHR, '\n', msg, '\n', textStatus));
            });
    });
}


function grafico() {
    var estufa = $('#estufa').val();
    var sensor = $('#sensor').val();
    // var data = $('#datepicker').val();
    var data = $('#date').val();

    var estufa = '1';
    var sensor = 'termometro';
    var data = '01-01-2020';
    console.log(data);

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
                var d = new Date(dado[i][3]);
                var d = d.getHours();
                hora.push(d);
                // hora.push(new Date(dado[i][3]));
                // hora.push(dado[i][3]);
                valor.push(dado[i][2]);
            }

            console.log(hora, valor);

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
                        lineTension: 0,
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
                            //     tooltipFormat: "HH",
                            //     displayFormats: {
                            //         hour: 'HH:mm'
                            //     }
                            // }
                        }],
                        yAxes: [{
                            gridLines: {
                                color: '#000000f',
                                borderDash: [2, 5],
                            },
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Valores (média/hora)'
                            },
                            ticks: {
                                // max: maxDado,
                                // min: minDado
                            }
                        }]
                    }
                }
            });
        });
}

$(document).ready(function () {
    var url = $(location).attr('pathname');

    grafico();
    if (url == '/graficos') {
        // $('#datepicker').datepicker({});
    }
    if (url == '/') {
        cards_lista();
    }
    // $('[data-toggle="popover"]').popover();
    setTimeout(function () {
        $('[data-estufa="1"]').click()
    }, 1000);

});

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

// $(window).resize(function () {
//     h_table()
// });
$('#btnform').click(function () {
    grafico();
});