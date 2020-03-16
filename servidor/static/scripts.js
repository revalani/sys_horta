var modal_loop = 0;
var modal_estufa = 1;
var modal_sensor = 'temperatura';

function criandoTabela(estufa) {
    request = $.ajax({
            url: "qlive/" + estufa,
            type: 'get',
            contentType: "application/json",
            dataType: 'json',
            timeout: 1000
        })
        .done(function (data) {
            console.log(data);


            // $(".modal-content").css("background-color", "#fff");
            // $('#titulo-modal').val('').text('');
            // $('#estufa-temp').val('').text('');
            // $('#estufa-lux').val('').text('');
            // $('#estufa-umi-ar').val('').text('');
            // $('#estufa-co2').val('').text('');

            // $('#estufa-ph').val('').text('s/d');
            // $('#estufa-umi-s').val('').text('s/d');
            // $('#estufa-vento').val('').text('s/d');

            data.forEach(element => {
                if (element['co2']) {
                    $('#estufa-co2').val(element['co2'] + " ppm").text(element['co2'] + " ppm");
                }
                if (element['luximetro']) {
                    $('#estufa-lux').val(element['luximetro'] + " lux").text(element['luximetro'] + " lux");
                }
                if (element['termometro']) {
                    $('#estufa-temp').val(element['termometro'] + "°c").text(element['termometro'] + "°c");
                }
                if (element['umidade_ar']) {
                    $('#estufa-umi-ar').val(element['umidade_ar'] + "%").text(element['umidade_ar'] + "%");
                }
                if (estufa == 1) {
                    $('#estufa-co2').val("s/d").text("s/d");

                } else {
                    $('#estufa-temp').val("s/d").text("s/d");
                    $('#estufa-umi-ar').val("s/d").text("s/d");
                    $('#estufa-lux').val("s/d").text("s/d");
                    $('#estufa-co2').val("s/d").text("s/d");
                    $(".modal-content").css("background-color", "#fffdc5");
                    console.log(element['co2']);
                }


                $('#estufa-bateria').val(element['bateria'] + "%").text(element['bateria'] + "%");
                $('#estufa-status').val(element['status']).text(element['status']);
                var titulo = estufa + ' - ' + element['cultura'];
                $('#titulo-modal').val(titulo).text(titulo);
            });

            if (modal_loop) {
                setTimeout(function () {
                    criandoTabela(estufa);
                }, 1500);
            }

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

                // console.log(element, data);

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
                var bat = '';

                data.forEach(linha => {
                    // console.log(linha);
                    if (linha[3] == 'luximetro') {
                        lux = '<p class="card-text"><span class="icon-sun"></span>' + linha[5] + ' lux</p>';
                    } else if (linha[3] == 'termometro') {
                        temp = '<p class="card-text"><span class="icon-temp"></span>' + linha[5] + ' °c</p>';
                    } else if (linha[3] == 'co2') {
                        co2 = '<p class="card-text"><span class="icon-co2"></span>' + linha[5] + ' ppm</p>';
                    } else if (linha[3] == 'umidade_ar') {
                        umi = '<p class="card-text"><span class="icon-humidity"></span>' + linha[5] + ' %</p>';
                    }

                    bat = linha[6] + '%<span class="icon-bateria"></span>';

                });

                estufa_color = estufa_status;

                // console.log(estufa_color + ' - ' + typeof (estufa_status));
                $('#terreno_cards').append(
                    $('<div class="col-lg-4"><div class="card ' + estufa_color + ' mb-3"><div class="card-header "><span class="card-text font-weight-bolder">' + estufa_n + ' - ' + estufa_cultura + '</span><span class="float-right">' + bat + estufa_status + '</span></div><disv class="card-body row row-cols-2"><div class="col">' + temp + lux + umi + co2 + '</div><div class="col wrap"><button type="button" onclick="modal_bt(' + estufa_n + ')" class="btn  btn-md btn-block" data-toggle="modal" data-target=".bd-example-modal-xl"><span class="icon-chart-line"></span>Mais Detalhes</button><button class="btn btn-md btn-block" style="cursor: not-allowed;" disabled>Camera</button></div></div></div></div>'));
            })
            .fail(function (jqXHR, textStatus, msg) {
                console.log((jqXHR, '\n', msg, '\n', textStatus));
            });
    });
}


function grafico(estufa, sensor, periodo) {
    // var estufa = $('#estufa').val();
    // var sensor = $('#sensor').val();
    // var data = $('#date').val();
    // var data = $('#datepicker').val();

    var estufa = estufa;
    var sensor = sensor;
    var data = Date.now();

    if (periodo == NaN || periodo == undefined) {
        periodo = 'dia';
    }

    if (data == NaN || data == undefined) {
        data = Date();
    }


    var hora = [];
    var valor = [];


    console.log(estufa, sensor, data, periodo);

    request = $.ajax({
            url: "qgrafco/",
            type: 'post',
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify({
                'estufa': estufa,
                'sensor': sensor,
                'data': data,
                'periodo': periodo
            }),
        })
        .done(function (dado) {

            $('.chart').empty();
            $('.chart').append('<canvas id="myChart"></canvas>');

            for (var i = 0; i < dado.length - 1; i++) {
                var d = moment(dado[i][3]);


                if (periodo == "hora") {
                    d = d.format('HH:mm');
                }
                if (periodo == "dia") {
                    d = d.format('HH:00');
                }
                if (periodo == "semana") {
                    d = d.format('DD/MM');
                }
                if (periodo == "mes") {
                    d = d.format('DD/MM');
                }
                hora.push(d);
                // hora.push(new Date(dado[i][3]));
                // hora.push(dado[i][3]);
                valor.push(dado[i][2]);
            }

            // console.log(dado[dado.length - 1]);
            datai = moment(dado[dado.length - 1][0]).format("DD/MM");
            dataf = moment(dado[dado.length - 1][0]).format("DD/MM");


            var margem = 0.01;
            var maxDado = parseInt(Math.max.apply(Math, valor) * (1 + margem));
            var minDado = parseInt(Math.min.apply(Math, valor) * (1 - margem));

            /* plot graficos*/
            l_legenda = {
                'hora': 'minuto',
                'dia': 'hora',
                'semana': 'dia',
                'mes': 'dia'
            }


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
                                labelString: 'De ' + dataf + ' a ' + datai + ' - tempo em ' + l_legenda[periodo]
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
                                labelString: 'Valores (média/' + l_legenda[periodo] + ')'
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


$('.bd-example-modal-xl').on('hidden.bs.modal', function (e) {
    $(".modal-content").css("background-color", "#fff");
    $('#titulo-modal').val('').text('');
    $('#estufa-temp').val('').text('');
    $('#estufa-lux').val('').text('');
    $('#estufa-umi-ar').val('').text('');
    $('#estufa-co2').val('').text('');
    console.log('ssdasda');
    modal_loop = 0;
    modal_estufa = 1;
    modal_sensor = 'termometro';

    // criandoTabela(1);
    // grafico(1, 'dia');
    // var xhr;

    // var fn = function () {
    //     if (xhr && xhr.readyState != 4) {
    //         xhr.abort();
    //     }
    //     xhr = $.ajax({
    //         success: function (data) {
    //             //do something
    //         }
    //     });
    // };

    // var interval = setInterval(fn, 500);
    // $('option:selected', this).attr('data-estufa');
    // $('#myInput').trigger('focus')
})


function modal_bt(estufa) {
    // $('.modal').empty();
    modal_loop = 1;
    modal_estufa = estufa
    grafico(estufa, modal_sensor, 'hora');

    $(".modal-content").css("background-color", "#fff");
    $('#titulo-modal').val('').text('');
    $('#estufa-temp').val('').text('');
    $('#estufa-lux').val('').text('');
    $('#estufa-umi-ar').val('').text('');
    $('#estufa-co2').val('').text('');

    $('#estufa-ph').val('').text('s/d');
    $('#estufa-umi-s').val('').text('s/d');
    $('#estufa-vento').val('').text('s/d');
    setTimeout(function () {
        criandoTabela(estufa);

    }, 150);
}

$('#hora').click(function () {
    // $('#titulo-modal').val();

    grafico(modal_estufa, modal_sensor, 'hora');
});
$('#dia').click(function () {
    grafico(modal_estufa, modal_sensor, 'dia');
});
$('#semana').click(function () {
    grafico(modal_estufa, modal_sensor, 'semana');
});
$('#mes').click(function () {
    grafico(modal_estufa, modal_sensor, 'mes');
});