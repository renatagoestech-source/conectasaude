// =====================================================
// CONECTA SAÚDE
// JAVASCRIPT V3
// =====================================================


const UBS = [

    {
        id: "A",
        nome: "UBS A",
        endereco: "Rua da Saúde, 100",
        telefone: "(87) 3333-1001",
        horario: "07h às 17h",

        servicos: [
            "Clínico geral",
            "Dentista",
            "Enfermagem",
            "Vacinação",
            "Curativos",
            "Acompanhamento de hipertensão e diabetes"
        ],

        campanhas: [
            "Vacinação contra Influenza",
            "Atualização da caderneta de vacinação"
        ],

        documentos: [
            "Cartão SUS",
            "Documento de identificação com foto"
        ],

        funcionarios: [
            ["Mariana Alves", "Enfermeira"],
            ["Carlos Lima", "Clínico geral"],
            ["Joana Martins", "Dentista"]
        ]
    },


    {
        id: "C",
        nome: "UBS C",
        endereco: "Av. Esperança, 250",
        telefone: "(87) 3333-1003",
        horario: "07h às 17h",

        servicos: [
            "Clínico geral",
            "Dentista",
            "Enfermagem",
            "Vacinação",
            "Pré-natal",
            "Saúde da mulher"
        ],

        campanhas: [
            "Vacinação de rotina",
            "Campanha de saúde da mulher"
        ],

        documentos: [
            "Cartão SUS",
            "Documento de identificação"
        ],

        funcionarios: [
            ["Patrícia Gomes", "Enfermeira"],
            ["André Costa", "Clínico geral"],
            ["Luciana Melo", "Dentista"]
        ]
    },


    {
        id: "D",
        nome: "UBS D",
        endereco: "Rua das Flores, 45",
        telefone: "(87) 3333-1004",
        horario: "08h às 18h",

        servicos: [
            "Clínico geral",
            "Dentista",
            "Enfermagem",
            "Curativos",
            "Acompanhamento de idosos",
            "Vacinação"
        ],

        campanhas: [
            "Prevenção e controle da dengue",
            "Acompanhamento de hipertensão"
        ],

        documentos: [
            "Cartão SUS",
            "Documento com foto"
        ],

        funcionarios: [
            ["Fernanda Rocha", "Clínica geral"],
            ["Diego Nunes", "Enfermeiro"],
            ["Camila Freire", "Dentista"]
        ]
    },


    {
        id: "E",
        nome: "UBS E",
        endereco: "Praça do Cuidado, 80",
        telefone: "(87) 3333-1005",
        horario: "07h às 16h",

        servicos: [
            "Clínico geral",
            "Dentista",
            "Enfermagem",
            "Saúde do idoso",
            "Vacinação",
            "Acompanhamento infantil"
        ],

        campanhas: [
            "Vacinação de rotina",
            "Saúde do idoso"
        ],

        documentos: [
            "Cartão SUS",
            "Documento com foto"
        ],

        funcionarios: [
            ["Renata Moura", "Enfermeira"],
            ["Fábio Castro", "Clínico geral"],
            ["Aline Dias", "Dentista"]
        ]
    },


    {
        id: "F",
        nome: "UBS F",
        endereco: "Av. Vida Nova, 310",
        telefone: "(87) 3333-1006",
        horario: "07h às 17h",

        servicos: [
            "Clínico geral",
            "Dentista",
            "Enfermagem",
            "Vacinação",
            "Saúde da mulher",
            "Orientação nutricional"
        ],

        campanhas: [
            "Vacinação contra Influenza",
            "Prevenção do câncer do colo do útero"
        ],

        documentos: [
            "Cartão SUS",
            "Documento com foto"
        ],

        funcionarios: [
            ["Bianca Ferreira", "Enfermeira"],
            ["Gustavo Oliveira", "Clínico geral"],
            ["Sofia Ramos", "Dentista"]
        ]
    }

];


// =====================================================
// ESPECIALIDADES
// =====================================================

const especialidades = [

    {
        id: "clinico",
        nome: "Clínico geral",
        icone: "🩺",
        descricao: "Avaliação e acompanhamento geral."
    },

    {
        id: "dentista",
        nome: "Dentista",
        icone: "🦷",
        descricao: "Atendimento em saúde bucal."
    },

    {
        id: "enfermagem",
        nome: "Enfermagem",
        icone: "🩹",
        descricao: "Consultas e orientações de enfermagem."
    }

];


// =====================================================
// HORÁRIOS
// =====================================================

const horarios = {

    manha: [
        "07:00",
        "07:30",
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30"
    ],

    tarde: [
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30"
    ]

};


// =====================================================
// ESTADO
// =====================================================

let paciente = null;

let ubsSelecionada = null;

let especialidadeSelecionada = null;

let dataSelecionada = null;

let agendamentoAtual = null;


// =====================================================
// STORAGE
// =====================================================

function pegarAgendamentos() {

    return JSON.parse(
        localStorage.getItem("agendamentosConecta") || "[]"
    );

}


function salvarAgendamentos(lista) {

    localStorage.setItem(
        "agendamentosConecta",
        JSON.stringify(lista)
    );

}


function pegarFuncionarios() {

    return JSON.parse(
        localStorage.getItem("funcionariosConecta") || "{}"
    );

}


function salvarFuncionarios(lista) {

    localStorage.setItem(
        "funcionariosConecta",
        JSON.stringify(lista)
    );

}


// =====================================================
// FUNÇÕES AUXILIARES
// =====================================================

function mostrar(id) {

    document
        .querySelectorAll("main > section")
        .forEach(section => {

            section.classList.add("hidden");

        });


    document
        .getElementById(id)
        .classList.remove("hidden");

}


function mensagem(texto) {

    const toast =
        document.getElementById("toast");

    toast.textContent = texto;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


function formatarData(data) {

    return new Date(
        data + "T12:00:00"
    ).toLocaleDateString("pt-BR");

}


// =====================================================
// CADASTRO
// =====================================================

document
    .getElementById("formCadastro")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const nome =
            document
                .getElementById("nome")
                .value
                .trim();


        const telefone =
            document
                .getElementById("telefone")
                .value
                .trim();


        const sus =
            document
                .getElementById("cartaoSUS")
                .value
                .replace(/\D/g, "");


        if (nome.split(" ").length < 2) {

            mensagem(
                "Digite seu nome completo."
            );

            return;

        }


        if (sus.length < 8) {

            mensagem(
                "Digite um Cartão SUS válido."
            );

            return;

        }


        paciente = {

            nome,
            telefone,
            sus

        };


        carregarUBSs();

        mostrar("ubsSection");

    });


// =====================================================
// LISTAR UBS
// =====================================================

function carregarUBSs() {

    const lista =
        document.getElementById("listaUBS");


    lista.innerHTML = "";


    UBS.forEach(ubs => {

        lista.innerHTML += `

            <div class="ubs-card">

                <h3>
                    ${ubs.nome}
                </h3>

                <p>
                    📍 ${ubs.endereco}
                    <br>
                    ☎ ${ubs.telefone}
                    <br>
                    🕐 ${ubs.horario}
                </p>

                <button
                    class="primary"
                    onclick="acessarUBS('${ubs.id}')"
                >
                    Acessar UBS
                </button>

            </div>

        `;

    });

}


// =====================================================
// ACESSAR UBS
// =====================================================

function acessarUBS(id) {

    ubsSelecionada =
        UBS.find(
            ubs => ubs.id === id
        );


    mostrarInformacoesUBS();


    document
        .getElementById("nomeUBSSelecionada")
        .textContent =
        ubsSelecionada.nome;


    carregarEspecialidades();


    mostrar("detalhesUBS");

}


// =====================================================
// INFORMAÇÕES DA UBS
// =====================================================

function mostrarInformacoesUBS() {

    const ubs =
        ubsSelecionada;


    const funcionariosExtras =
        pegarFuncionarios()[ubs.id] || [];


    const funcionarios =
        [
            ...ubs.funcionarios,
            ...funcionariosExtras
        ];


    let html = `

        <h2>
            ${ubs.nome}
        </h2>

        <p>
            ${ubs.endereco}
            <br>
            ${ubs.telefone}
            <br>
            Atendimento:
            ${ubs.horario}
        </p>


        <div class="detalhes-grid">

            <div class="info-box">

                <h3>
                    🩺 Serviços oferecidos
                </h3>

                <ul>

                    ${ubs.servicos.map(
                        servico =>
                        `<li>${servico}</li>`
                    ).join("")}

                </ul>

            </div>


            <div class="info-box">

                <h3>
                    💉 Campanhas
                </h3>

                <ul>

                    ${ubs.campanhas.map(
                        campanha =>
                        `<li>${campanha}</li>`
                    ).join("")}

                </ul>

            </div>


            <div class="info-box">

                <h3>
                    📄 Documentos
                </h3>

                <ul>

                    ${ubs.documentos.map(
                        documento =>
                        `<li>${documento}</li>`
                    ).join("")}

                </ul>

            </div>


            <div class="info-box">

                <h3>
                    👩‍⚕️ Funcionários
                </h3>

                <div class="funcionarios">

                    ${funcionarios.map(
                        funcionario => `

                            <div class="funcionario">

                                <strong>
                                    ${funcionario.nome || funcionario[0]}
                                </strong>

                                <span>
                                    ${funcionario.funcao || funcionario[1]}
                                </span>

                            </div>

                        `
                    ).join("")}

                </div>

            </div>

        </div>

        <br>

        <button
            class="primary"
            onclick="irParaEspecialidade()"
        >
            Continuar para especialidades
        </button>

    `;


    document
        .getElementById("dadosUBS")
        .innerHTML = html;

}


// =====================================================
// VOLTAR UBS
// =====================================================

document
    .getElementById("voltarUBS")
    .onclick = function() {

        mostrar("ubsSection");

    };


// =====================================================
// ESPECIALIDADES
// =====================================================

function irParaEspecialidade() {

    mostrar("especialidadeSection");

}


function carregarEspecialidades() {

    const lista =
        document.getElementById(
            "listaEspecialidades"
        );


    lista.innerHTML = "";


    especialidades.forEach(
        especialidade => {

            lista.innerHTML += `

                <div class="especialidade">

                    <div style="font-size:35px">
                        ${especialidade.icone}
                    </div>

                    <h3>
                        ${especialidade.nome}
                    </h3>

                    <p>
                        ${especialidade.descricao}
                    </p>

                    <button
                        class="primary"
                        onclick="selecionarEspecialidade('${especialidade.id}')"
                    >
                        Selecionar
                    </button>

                </div>

            `;

        }
    );

}


function selecionarEspecialidade(id) {

    especialidadeSelecionada =
        especialidades.find(
            item => item.id === id
        );


    document
        .getElementById(
            "resumoAgendamento"
        )
        .textContent =
        `${ubsSelecionada.nome} • ${especialidadeSelecionada.nome}`;


    configurarCalendario();


    mostrar("agendaSection");

}


// =====================================================
// VOLTAR ESPECIALIDADE
// =====================================================

document
    .getElementById("voltarEspecialidade")
    .onclick = function() {

        mostrar("detalhesUBS");

    };


// =====================================================
// CALENDÁRIO
// =====================================================

function configurarCalendario() {

    const campo =
        document.getElementById(
            "dataConsulta"
        );


    const hoje =
        new Date();


    const ano =
        hoje.getFullYear();


    const mes =
        String(
            hoje.getMonth() + 1
        ).padStart(2, "0");


    const dia =
        String(
            hoje.getDate()
        ).padStart(2, "0");


    campo.min =
        `${ano}-${mes}-${dia}`;


    campo.addEventListener(
        "change",
        function() {

            dataSelecionada =
                campo.value;

            carregarHorarios();

        }
    );

}


// =====================================================
// FERIADOS
// =====================================================

function feriado(data) {

    const d =
        new Date(
            data + "T12:00:00"
        );


    const dia =
        d.getDate();


    const mes =
        d.getMonth() + 1;


    const feriados = [

        "1/1",
        "21/4",
        "1/5",
        "7/9",
        "12/10",
        "2/11",
        "15/11",
        "20/11",
        "25/12"

    ];


    return feriados.includes(
        `${dia}/${mes}`
    );

}


// =====================================================
// CARREGAR HORÁRIOS
// =====================================================

function carregarHorarios() {

    const data =
        new Date(
            dataSelecionada +
            "T12:00:00"
        );


    if (
        data.getDay() === 0 ||
        data.getDay() === 6 ||
        feriado(dataSelecionada)
    ) {

        mensagem(
            "Essa data não possui atendimento."
        );

        return;

    }


    carregarPeriodo(
        "manha",
        "horariosManha"
    );


    carregarPeriodo(
        "tarde",
        "horariosTarde"
    );

}


function carregarPeriodo(
    periodo,
    elemento
) {

    const div =
        document.getElementById(
            elemento
        );


    div.innerHTML = "";


    const agendamentos =
        pegarAgendamentos();


    horarios[periodo].forEach(
        (hora, index) => {

            const ocupado =
                agendamentos.some(
                    agendamento =>

                        agendamento.status ===
                        "ativo" &&

                        agendamento.ubs ===
                        ubsSelecionada.id &&

                        agendamento.especialidade ===
                        especialidadeSelecionada.id &&

                        agendamento.data ===
                        dataSelecionada &&

                        agendamento.hora ===
                        hora
                );


            const botao =
                document.createElement(
                    "button"
                );


            botao.className =
                "horario";


            if (ocupado) {

                botao.classList.add(
                    "ocupado"
                );

                botao.disabled = true;

            }


            botao.innerHTML = `

                <strong>
                    ${hora}
                </strong>

                <br>

                <small>
                    ${
                        ocupado
                        ? "Ocupado"
                        : `${index + 1}ª posição`
                    }
                </small>

            `;


            if (!ocupado) {

                botao.onclick =
                    () =>
                    realizarAgendamento(
                        periodo,
                        hora,
                        index + 1
                    );

            }


            div.appendChild(
                botao
            );

        }
    );

}


// =====================================================
// AGENDAR
// =====================================================

function realizarAgendamento(
    periodo,
    hora,
    posicao
) {

    const agendamentos =
        pegarAgendamentos();


    const novo = {

        id:
            Date.now().toString(),

        paciente:
            paciente.nome,

        telefone:
            paciente.telefone,

        sus:
            paciente.sus,

        ubs:
            ubsSelecionada.id,

        nomeUBS:
            ubsSelecionada.nome,

        especialidade:
            especialidadeSelecionada.id,

        nomeEspecialidade:
            especialidadeSelecionada.nome,

        data:
            dataSelecionada,

        hora:
            hora,

        periodo:
            periodo,

        fila:
            posicao,

        status:
            "ativo"

    };


    agendamentos.push(novo);


    salvarAgendamentos(
        agendamentos
    );


    agendamentoAtual =
        novo;


    mostrarConfirmacao();

}


// =====================================================
// CONFIRMAÇÃO
// =====================================================

function mostrarConfirmacao() {

    document
        .getElementById(
            "textoConfirmacao"
        )
        .textContent =
        `${paciente.nome}, sua consulta foi agendada com sucesso.`;


    document
        .getElementById(
            "comprovanteTela"
        )
        .innerHTML = `

            <strong>
                UBS:
            </strong>
            ${ubsSelecionada.nome}

            <br><br>

            <strong>
                Especialidade:
            </strong>
            ${especialidadeSelecionada.nome}

            <br><br>

            <strong>
                Data:
            </strong>
            ${formatarData(dataSelecionada)}

            <br><br>

            <strong>
                Horário:
            </strong>
            ${agendamentoAtual.hora}

            <div class="fila">

                ${agendamentoAtual.fila}º

                <br>

                <small>
                    posição na fila
                </small>

            </div>

        `;


    document
        .getElementById(
            "btnImprimir"
        )
        .onclick =
        imprimirComprovante;


    mostrar("confirmacao");

}


// =====================================================
// IMPRESSÃO DO COMPROVANTE
// =====================================================

function imprimirComprovante() {

    const a =
        agendamentoAtual;


    const janela =
        window.open(
            "",
            "_blank",
            "width=800,height=700"
        );


    janela.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>
                Comprovante - Conecta Saúde
            </title>

            <style>

                body {
                    font-family: Arial;
                    padding: 40px;
                    color: #173b3a;
                }

                .comprovante {
                    max-width: 650px;
                    margin: auto;
                    border: 2px solid #0b9b8d;
                    border-radius: 15px;
                    padding: 30px;
                }

                h1 {
                    color: #0b9b8d;
                }

                .linha {
                    padding: 12px 0;
                    border-bottom: 1px solid #ddd;
                }

                .fila {
                    text-align: center;
                    font-size: 55px;
                    color: #0b9b8d;
                    font-weight: bold;
                    margin: 25px;
                }

            </style>

        </head>

        <body>

            <div class="comprovante">

                <h1>
                    Conecta Saúde
                </h1>

                <h2>
                    Comprovante de Agendamento
                </h2>


                <div class="linha">
                    <b>Paciente:</b>
                    ${a.paciente}
                </div>


                <div class="linha">
                    <b>Cartão SUS:</b>
                    ${a.sus}
                </div>


                <div class="linha">
                    <b>UBS:</b>
                    ${a.nomeUBS}
                </div>


                <div class="linha">
                    <b>Especialidade:</b>
                    ${a.nomeEspecialidade}
                </div>


                <div class="linha">
                    <b>Data:</b>
                    ${formatarData(a.data)}
                </div>


                <div class="linha">
                    <b>Horário:</b>
                    ${a.hora}
                </div>


                <div class="fila">

                    ${a.fila}º

                    <br>

                    <small>
                        posição na fila
                    </small>

                </div>


                <p>
                    Apresente este comprovante no atendimento da UBS.
                </p>

            </div>

        </body>

        </html>

    `);


    janela.document.close();


    janela.focus();


    janela.print();

}


// =====================================================
// MEUS AGENDAMENTOS
// =====================================================

document
    .getElementById(
        "btnMeusAgendamentos"
    )
    .onclick =
    mostrarAgendamentos;


document
    .getElementById(
        "btnVerAgendamentos"
    )
    .onclick =
    mostrarAgendamentos;


function mostrarAgendamentos() {

    if (!paciente) {

        mensagem(
            "Faça seu cadastro primeiro."
        );

        return;

    }


    const lista =
        document.getElementById(
            "listaAgendamentos"
        );


    const agendamentos =
        pegarAgendamentos()
        .filter(
            a =>
            a.sus ===
            paciente.sus
        );


    if (!agendamentos.length) {

        lista.innerHTML =
            "<p>Nenhum agendamento encontrado.</p>";

    }

    else {

        lista.innerHTML =
            "";


        agendamentos
            .reverse()
            .forEach(a => {

                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "consulta";


                div.innerHTML = `

                    <div>

                        <strong>
                            ${a.nomeUBS}
                        </strong>

                        <br>

                        ${a.nomeEspecialidade}

                        <br>

                        📅
                        ${formatarData(a.data)}

                        •
                        🕐
                        ${a.hora}

                        <br>

                        ${
                            a.status === "ativo"
                            ?
                            `👥 ${a.fila}º na fila`
                            :
                            "Consulta cancelada"
                        }

                    </div>


                    <div>

                        ${
                            a.status === "ativo"

                            ?

                            `

                                <button
                                    class="editar"
                                    onclick="imprimirAgendamento('${a.id}')"
                                >
                                    🖨 Imprimir
                                </button>

                                <button
                                    class="editar"
                                    onclick="reagendar('${a.id}')"
                                >
                                    Reagendar
                                </button>

                                <button
                                    class="danger"
                                    onclick="cancelar('${a.id}')"
                                >
                                    Cancelar
                                </button>

                            `

                            :

                            ""

                        }

                    </div>

                `;


                lista.appendChild(
                    div
                );

            });

    }


    mostrar(
        "meusAgendamentos"
    );

}


// =====================================================
// IMPRIMIR AGENDAMENTO EXISTENTE
// =====================================================

function imprimirAgendamento(id) {

    const agendamento =
        pegarAgendamentos()
        .find(
            a =>
            a.id === id
        );


    if (!agendamento)
        return;


    agendamentoAtual =
        agendamento;


    imprimirComprovante();

}


// =====================================================
// CANCELAR
// =====================================================

function cancelar(id) {

    if (
        !confirm(
            "Deseja cancelar esta consulta?"
        )
    )
        return;


    const lista =
        pegarAgendamentos();


    const agendamento =
        lista.find(
            a =>
            a.id === id
        );


    if (agendamento) {

        agendamento.status =
            "cancelado";

    }


    salvarAgendamentos(
        lista
    );


    mostrarAgendamentos();


    mensagem(
        "Consulta cancelada."
    );

}


// =====================================================
// REAGENDAR
// =====================================================

function reagendar(id) {

    const lista =
        pegarAgendamentos();


    const agendamento =
        lista.find(
            a =>
            a.id === id
        );


    if (!agendamento)
        return;


    agendamento.status =
        "cancelado";


    salvarAgendamentos(
        lista
    );


    ubsSelecionada =
        UBS.find(
            u =>
            u.id ===
            agendamento.ubs
        );


    especialidadeSelecionada =
        especialidades.find(
            e =>
            e.id ===
            agendamento.especialidade
        );


    document
        .getElementById(
            "resumoAgendamento"
        )
        .textContent =
        `${ubsSelecionada.nome} • ${especialidadeSelecionada.nome}`;


    configurarCalendario();


    mostrar(
        "agendaSection"
    );


    mensagem(
        "Escolha uma nova data e horário."
    );

}


// =====================================================
// LOGIN FUNCIONÁRIO
// =====================================================

document
    .getElementById(
        "btnFuncionario"
    )
    .onclick =
    function() {

        document
            .getElementById(
                "modalLogin"
            )
            .classList
            .remove("hidden");

    };


document
    .getElementById(
        "formLogin"
    )
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const usuario =
                document
                    .getElementById(
                        "usuario"
                    )
                    .value;


            const senha =
                document
                    .getElementById(
                        "senha"
                    )
                    .value;


            if (
                usuario === "admin" &&
                senha === "1234"
            ) {

                document
                    .getElementById(
                        "modalLogin"
                    )
                    .classList
                    .add("hidden");


                abrirPainel();

            }

            else {

                mensagem(
                    "Usuário ou senha incorretos."
                );

            }

        }
    );


// =====================================================
// PAINEL
// =====================================================

function abrirPainel() {

    preencherUBSsPainel();


    document
        .getElementById(
            "modalPainel"
        )
        .classList
        .remove("hidden");


    carregarConsultas();


    carregarFuncionariosPainel();

}


function preencherUBSsPainel() {

    const select =
        document.getElementById(
            "filtroUBS"
        );


    const selectFuncionarios =
        document.getElementById(
            "funcionarioUBS"
        );


    select.innerHTML = "";

    selectFuncionarios.innerHTML = "";


    UBS.forEach(ubs => {

        select.innerHTML += `
            <option value="${ubs.id}">
                ${ubs.nome}
            </option>
        `;


        selectFuncionarios.innerHTML += `
            <option value="${ubs.id}">
                ${ubs.nome}
            </option>
        `;

    });

}


// =====================================================
// CONSULTAS NO PAINEL
// =====================================================

function carregarConsultas() {

    const idUBS =
        document.getElementById(
            "filtroUBS"
        ).value;


    const data =
        document.getElementById(
            "filtroData"
        ).value;


    let consultas =
        pegarAgendamentos()
        .filter(
            a =>
            a.ubs === idUBS &&
            a.status === "ativo"
        );


    if (data) {

        consultas =
            consultas.filter(
                a =>
                a.data === data
            );

    }


    const lista =
        document.getElementById(
            "listaConsultas"
        );


    lista.innerHTML = "";


    if (!consultas.length) {

        lista.innerHTML =
            "<p>Nenhuma consulta encontrada.</p>";

        return;

    }


    consultas.forEach(
        consulta => {

            lista.innerHTML += `

                <div class="consulta">

                    <div>

                        <strong>
                            ${consulta.hora}
                        </strong>

                        -
                        ${consulta.paciente}

                        <br>

                        ${consulta.nomeEspecialidade}

                        <br>

                        Cartão SUS:
                        ${consulta.sus}

                    </div>


                    <button
                        class="danger"
                        onclick="cancelarPeloPainel('${consulta.id}')"
                    >
                        Cancelar
                    </button>

                </div>

            `;

        }
    );

}


document
    .getElementById(
        "filtroUBS"
    )
    .addEventListener(
        "change",
        carregarConsultas
    );


document
    .getElementById(
        "filtroData"
    )
    .addEventListener(
        "change",
        carregarConsultas
    );


function cancelarPeloPainel(id) {

    if (
        !confirm(
            "Cancelar esta consulta?"
        )
    )
        return;


    const lista =
        pegarAgendamentos();


    const agendamento =
        lista.find(
            a =>
            a.id === id
        );


    if (agendamento) {

        agendamento.status =
            "cancelado";

    }


    salvarAgendamentos(
        lista
    );


    carregarConsultas();


    mensagem(
        "Consulta cancelada."
    );

}


// =====================================================
// FUNCIONÁRIOS
// =====================================================

document
    .getElementById(
        "formFuncionario"
    )
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const ubs =
                document
                    .getElementById(
                        "funcionarioUBS"
                    )
                    .value;


            const nome =
                document
                    .getElementById(
                        "funcionarioNome"
                    )
                    .value
                    .trim();


            const funcao =
                document
                    .getElementById(
                        "funcionarioFuncao"
                    )
                    .value
                    .trim();


            const funcionarios =
                pegarFuncionarios();


            if (!funcionarios[ubs]) {

                funcionarios[ubs] = [];

            }


            funcionarios[ubs].push({

                id:
                    Date.now().toString(),

                nome,

                funcao

            });


            salvarFuncionarios(
                funcionarios
            );


            event.target.reset();


            carregarFuncionariosPainel();


            mensagem(
                "Funcionário adicionado."
            );

        }
    );


// =====================================================
// LISTAR FUNCIONÁRIOS
// =====================================================

function carregarFuncionariosPainel() {

    const ubs =
        document
            .getElementById(
                "funcionarioUBS"
            )
            .value;


    const funcionarios =
        pegarFuncionarios();


    const lista =
        funcionarios[ubs] || [];


    const div =
        document
            .getElementById(
                "listaFuncionariosPainel"
            );


    div.innerHTML = "";


    if (!lista.length) {

        div.innerHTML =
            "<p>Nenhum funcionário cadastrado pelo painel.</p>";

        return;

    }


    lista.forEach(
        funcionario => {

            div.innerHTML += `

                <div class="funcionario-linha">

                    <div>

                        <strong>
                            ${funcionario.nome}
                        </strong>

                        <br>

                        <small>
                            ${funcionario.funcao}
                        </small>

                    </div>


                    <div
                        class="acoes-funcionario"
                    >

                        <button
                            class="editar"
                            onclick="editarFuncionario('${funcionario.id}')"
                        >
                            Editar
                        </button>


                        <button
                            class="danger"
                            onclick="excluirFuncionario('${funcionario.id}')"
                        >
                            Excluir
                        </button>

                    </div>

                </div>

            `;

        }
    );

}


// =====================================================
// EDITAR FUNCIONÁRIO
// =====================================================

function editarFuncionario(id) {

    const dados =
        pegarFuncionarios();


    let funcionarioEncontrado =
        null;


    for (
        const ubs in dados
    ) {

        const funcionario =
            dados[ubs].find(
                f =>
                f.id === id
            );


        if (funcionario) {

            funcionarioEncontrado =
                funcionario;

            break;

        }

    }


    if (!funcionarioEncontrado)
        return;


    document
        .getElementById(
            "editarId"
        )
        .value = id;


    document
        .getElementById(
            "editarNome"
        )
        .value =
        funcionarioEncontrado.nome;


    document
        .getElementById(
            "editarFuncao"
        )
        .value =
        funcionarioEncontrado.funcao;


    document
        .getElementById(
            "modalEditar"
        )
        .classList
        .remove("hidden");

}


// =====================================================
// SALVAR EDIÇÃO
// =====================================================

document
    .getElementById(
        "formEditar"
    )
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const id =
                document
                    .getElementById(
                        "editarId"
                    )
                    .value;


            const nome =
                document
                    .getElementById(
                        "editarNome"
                    )
                    .value
                    .trim();


            const funcao =
                document
                    .getElementById(
                        "editarFuncao"
                    )
                    .value
                    .trim();


            const dados =
                pegarFuncionarios();


            for (
                const ubs in dados
            ) {

                const funcionario =
                    dados[ubs].find(
                        f =>
                        f.id === id
                    );


                if (funcionario) {

                    funcionario.nome =
                        nome;

                    funcionario.funcao =
                        funcao;

                }

            }


            salvarFuncionarios(
                dados
            );


            document
                .getElementById(
                    "modalEditar"
                )
                .classList
                .add("hidden");


            carregarFuncionariosPainel();


            mensagem(
                "Funcionário atualizado."
            );

        }
    );


// =====================================================
// EXCLUIR FUNCIONÁRIO
// =====================================================

function excluirFuncionario(id) {

    if (
        !confirm(
            "Deseja realmente excluir este funcionário?"
        )
    )
        return;


    const dados =
        pegarFuncionarios();


    for (
        const ubs in dados
    ) {

        dados[ubs] =
            dados[ubs].filter(
                funcionario =>
                funcionario.id !== id
            );

    }


    salvarFuncionarios(
        dados
    );


    carregarFuncionariosPainel();


    mensagem(
        "Funcionário excluído."
    );

}


// =====================================================
// TABS DO PAINEL
// =====================================================

document
    .querySelectorAll(
        ".tab-painel"
    )
    .forEach(
        botao => {

            botao.onclick =
            function() {

                document
                    .querySelectorAll(
                        ".tab-painel"
                    )
                    .forEach(
                        b =>
                        b.classList.remove(
                            "active"
                        )
                    );


                this.classList.add(
                    "active"
                );


                const tab =
                    this.dataset.tab;


                document
                    .getElementById(
                        "painelConsultas"
                    )
                    .classList
                    .toggle(
                        "hidden",
                        tab !== "consultas"
                    );


                document
                    .getElementById(
                        "painelFuncionarios"
                    )
                    .classList
                    .toggle(
                        "hidden",
                        tab !== "funcionarios"
                    );


                if (
                    tab === "funcionarios"
                ) {

                    carregarFuncionariosPainel();

                }

            };

        }
    );


// =====================================================
// MUDANÇA DA UBS NO CADASTRO DE FUNCIONÁRIO
// =====================================================

document
    .getElementById(
        "funcionarioUBS"
    )
    .addEventListener(
        "change",
        carregarFuncionariosPainel
    );


// =====================================================
// SAIR
// =====================================================

document
    .getElementById(
        "btnSair"
    )
    .onclick =
    function() {

        document
            .getElementById(
                "modalPainel"
            )
            .classList
            .add("hidden");

    };


// =====================================================
// FECHAR MODAIS
// =====================================================

document
    .querySelectorAll(
        "[data-close]"
    )
    .forEach(
        botao => {

            botao.onclick =
            function() {

                document
                    .getElementById(
                        this.dataset.close
                    )
                    .classList
                    .add("hidden");

            };

        }
    );
