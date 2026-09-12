/* ============================================================
   CONECTA SAÚDE
   SISTEMA COMPLETO DE AGENDAMENTO UBS
   ============================================================ */

"use strict";

/* ============================================================
   CONFIGURAÇÕES
   ============================================================ */

const STORAGE_UBS = "conectaSaude_ubs_v5";
const STORAGE_APPOINTMENTS = "conectaSaude_appointments_v5";
const STORAGE_PATIENT = "conectaSaude_patient_v5";

const HORARIOS_MANHA = [
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
];

const HORARIOS_TARDE = [
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
];

/* ============================================================
   DADOS INICIAIS DAS UBS
   ============================================================ */

const UBS_INICIAL = [
    {
        id: "ubsA",
        nome: "UBS A",
        endereco: "Rua Principal, 100 - Centro",
        telefone: "(87) 0000-0001",
        horario: "07:00 às 18:00",
        usuario: "adminA",
        senha: "1234",

        especialidades: [
            "Clínico Geral",
            "Dentista",
            "Enfermeira"
        ],

        servicos: [
            "Consulta médica",
            "Atendimento de enfermagem",
            "Atendimento odontológico",
            "Vacinação",
            "Acompanhamento de hipertensão e diabetes"
        ],

        campanhas: [
            "Campanha de vacinação",
            "Prevenção do câncer",
            "Saúde da mulher"
        ],

        documentos: [
            "Cartão SUS",
            "Documento com foto",
            "Comprovante de residência"
        ],

        funcionarios: [
            { id: "a1", nome: "Maria Silva", cargo: "Enfermeira" },
            { id: "a2", nome: "João Santos", cargo: "Clínico Geral" },
            { id: "a3", nome: "Ana Oliveira", cargo: "Dentista" }
        ]
    },

    {
        id: "ubsC",
        nome: "UBS C",
        endereco: "Rua da Saúde, 200 - Centro",
        telefone: "(87) 0000-0003",
        horario: "07:00 às 18:00",
        usuario: "adminC",
        senha: "1234",

        especialidades: [
            "Clínico Geral",
            "Dentista",
            "Enfermeira"
        ],

        servicos: [
            "Consulta médica",
            "Enfermagem",
            "Odontologia",
            "Vacinação"
        ],

        campanhas: [
            "Vacinação contra gripe",
            "Saúde da mulher"
        ],

        documentos: [
            "Cartão SUS",
            "Documento com foto"
        ],

        funcionarios: [
            { id: "c1", nome: "Carlos Souza", cargo: "Clínico Geral" },
            { id: "c2", nome: "Fernanda Lima", cargo: "Enfermeira" }
        ]
    },

    {
        id: "ubsD",
        nome: "UBS D",
        endereco: "Avenida Saúde, 300",
        telefone: "(87) 0000-0004",
        horario: "07:00 às 18:00",
        usuario: "adminD",
        senha: "1234",

        especialidades: [
            "Clínico Geral",
            "Dentista",
            "Enfermeira"
        ],

        servicos: [
            "Consultas",
            "Vacinação",
            "Enfermagem",
            "Odontologia"
        ],

        campanhas: [
            "Campanha de vacinação",
            "Saúde do idoso"
        ],

        documentos: [
            "Cartão SUS",
            "Documento com foto",
            "Comprovante de residência"
        ],

        funcionarios: [
            { id: "d1", nome: "Paulo Costa", cargo: "Enfermeiro" },
            { id: "d2", nome: "Juliana Alves", cargo: "Dentista" }
        ]
    },

    {
        id: "ubsE",
        nome: "UBS E",
        endereco: "Rua da Esperança, 400",
        telefone: "(87) 0000-0005",
        horario: "07:00 às 18:00",
        usuario: "adminE",
        senha: "1234",

        especialidades: [
            "Clínico Geral",
            "Dentista",
            "Enfermeira"
        ],

        servicos: [
            "Consulta médica",
            "Enfermagem",
            "Vacinação"
        ],

        campanhas: [
            "Vacinação",
            "Saúde da criança"
        ],

        documentos: [
            "Cartão SUS",
            "Documento com foto"
        ],

        funcionarios: [
            { id: "e1", nome: "Roberta Lima", cargo: "Enfermeira" },
            { id: "e2", nome: "Marcos Souza", cargo: "Clínico Geral" }
        ]
    },

    {
        id: "ubsF",
        nome: "UBS F",
        endereco: "Avenida Central, 500",
        telefone: "(87) 0000-0006",
        horario: "07:00 às 18:00",
        usuario: "adminF",
        senha: "1234",

        especialidades: [
            "Clínico Geral",
            "Dentista",
            "Enfermeira"
        ],

        servicos: [
            "Consulta médica",
            "Enfermagem",
            "Odontologia",
            "Vacinação"
        ],

        campanhas: [
            "Campanha de vacinação",
            "Saúde do homem"
        ],

        documentos: [
            "Cartão SUS",
            "Documento com foto"
        ],

        funcionarios: [
            { id: "f1", nome: "Patrícia Souza", cargo: "Enfermeira" },
            { id: "f2", nome: "Ricardo Lima", cargo: "Dentista" }
        ]
    }
];

/* ============================================================
   ESTADO DO SISTEMA
   ============================================================ */

let ubsList = [];
let appointments = [];

let currentUBS = null;
let currentSpecialty = null;
let currentDate = null;
let currentTime = null;

let calendarDate = new Date();

let adminSession = null;
let editingEmployeeId = null;

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    carregarDados();

    aplicarMascaraTelefone();

    document
        .getElementById("susPaciente")
        .addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "").slice(0, 15);
        });

    renderUBS();

    mostrarApenas("cadastro");

});

/* ============================================================
   LOCAL STORAGE
   ============================================================ */

function carregarDados() {

    const dadosUBS = localStorage.getItem(STORAGE_UBS);
    const dadosConsultas = localStorage.getItem(STORAGE_APPOINTMENTS);

    if (dadosUBS) {
        try {
            ubsList = JSON.parse(dadosUBS);
        } catch {
            ubsList = JSON.parse(JSON.stringify(UBS_INICIAL));
        }
    } else {
        ubsList = JSON.parse(JSON.stringify(UBS_INICIAL));
        salvarUBS();
    }

    if (dadosConsultas) {
        try {
            appointments = JSON.parse(dadosConsultas);
        } catch {
            appointments = [];
        }
    }
}

function salvarUBS() {
    localStorage.setItem(STORAGE_UBS, JSON.stringify(ubsList));
}

function salvarConsultas() {
    localStorage.setItem(
        STORAGE_APPOINTMENTS,
        JSON.stringify(appointments)
    );
}

/* ============================================================
   UTILIDADES
   ============================================================ */

function $(id) {
    return document.getElementById(id);
}

function escapeHTML(text) {

    if (text === null || text === undefined) {
        return "";
    }

    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function toast(mensagem) {

    const elemento = $("toast");

    elemento.textContent = mensagem;
    elemento.classList.add("show");

    setTimeout(function () {
        elemento.classList.remove("show");
    }, 3000);
}

function mostrarApenas(id) {

    const secoes = [
        "cadastro",
        "ubsSection",
        "ubsDetalhes",
        "especialidadeSection",
        "agendaSection",
        "confirmacaoSection",
        "meusAgendamentos"
    ];

    secoes.forEach(function (secao) {

        const elemento = $(secao);

        if (elemento) {
            elemento.classList.add("hidden");
        }

    });

    $(id).classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/* ============================================================
   PACIENTE
   ============================================================ */

function salvarPaciente() {

    const nome = $("nomePaciente").value.trim();
    const telefone = $("telefonePaciente").value.trim();
    const sus = $("susPaciente").value.trim();

    if (!nome) {
        toast("Digite seu nome completo.");
        $("nomePaciente").focus();
        return;
    }

    if (telefone.replace(/\D/g, "").length < 10) {
        toast("Digite um celular válido.");
        $("telefonePaciente").focus();
        return;
    }

    if (sus.length < 8) {
        toast("Digite o número do Cartão SUS.");
        $("susPaciente").focus();
        return;
    }

    const paciente = {
        nome,
        telefone,
        sus
    };

    localStorage.setItem(
        STORAGE_PATIENT,
        JSON.stringify(paciente)
    );

    renderUBS();

    mostrarApenas("ubsSection");

    toast("Cadastro realizado. Escolha sua UBS.");
}

/* ============================================================
   UBS
   ============================================================ */

function renderUBS() {

    const grid = $("ubsGrid");

    grid.innerHTML = "";

    ubsList.forEach(function (ubs) {

        const card = document.createElement("div");

        card.className = "ubs-card";

        card.innerHTML = `
            <div class="ubs-icon">🏥</div>

            <h3>${escapeHTML(ubs.nome)}</h3>

            <p>📍 ${escapeHTML(ubs.endereco)}</p>

            <p>☎ ${escapeHTML(ubs.telefone)}</p>

            <p>🕐 ${escapeHTML(ubs.horario)}</p>

            <br>

            <button class="btn primary">
                Entrar na UBS →
            </button>
        `;

        card.addEventListener("click", function () {
            abrirUBS(ubs.id);
        });

        grid.appendChild(card);

    });
}

function abrirUBS(id) {

    const ubs = ubsList.find(function (item) {
        return item.id === id;
    });

    if (!ubs) {
        toast("UBS não encontrada.");
        return;
    }

    currentUBS = ubs;

    $("detalheNomeUBS").textContent = ubs.nome;
    $("detalheEndereco").textContent = "📍 " + ubs.endereco;
    $("detalheTelefone").textContent = "☎ " + ubs.telefone;
    $("detalheHorario").textContent = "🕐 " + ubs.horario;

    preencherLista("detalheServicos", ubs.servicos);
    preencherLista("detalheCampanhas", ubs.campanhas);
    preencherLista("detalheDocumentos", ubs.documentos);

    const funcionarios = ubs.funcionarios
        .map(function (funcionario) {
            return `${funcionario.nome} — ${funcionario.cargo}`;
        });

    preencherLista("detalheFuncionarios", funcionarios);

    mostrarApenas("ubsDetalhes");

    atualizarPasso(2);
}

function preencherLista(id, itens) {

    const elemento = $(id);

    elemento.innerHTML = "";

    if (!itens || itens.length === 0) {

        elemento.innerHTML = "<li>Nenhuma informação cadastrada.</li>";

        return;
    }

    itens.forEach(function (item) {

        const li = document.createElement("li");

        li.textContent = item;

        elemento.appendChild(li);

    });
}

function voltarUBS() {

    currentUBS = null;

    mostrarApenas("ubsSection");

    atualizarPasso(2);
}

/* ============================================================
   ESPECIALIDADES
   ============================================================ */

function irEspecialidades() {

    if (!currentUBS) {
        toast("Escolha uma UBS primeiro.");
        return;
    }

    renderEspecialidades();

    mostrarApenas("especialidadeSection");

    atualizarPasso(3);
}

function renderEspecialidades() {

    const grid = $("especialidadesGrid");

    grid.innerHTML = "";

    $("especialidadeUBSText").textContent =
        currentUBS.nome + " • Escolha uma especialidade";

    const icones = {
        "Clínico Geral": "🩺",
        "Dentista": "🦷",
        "Enfermeira": "👩‍⚕️"
    };

    currentUBS.especialidades.forEach(function (especialidade) {

        const div = document.createElement("div");

        div.className = "option";

        div.innerHTML = `
            <div class="option-icon">
                ${icones[especialidade] || "🏥"}
            </div>

            <h3>${escapeHTML(especialidade)}</h3>

            <p>Ver horários disponíveis</p>
        `;

        div.addEventListener("click", function () {

            selecionarEspecialidade(especialidade);

        });

        grid.appendChild(div);

    });
}

function selecionarEspecialidade(especialidade) {

    currentSpecialty = especialidade;
    currentDate = null;
    currentTime = null;

    $("agendaInfo").textContent =
        currentUBS.nome +
        " • " +
        currentSpecialty;

    calendarDate = new Date();

    renderCalendario();

    $("horariosManha").innerHTML =
        "<p>Escolha uma data primeiro.</p>";

    $("horariosTarde").innerHTML =
        "<p>Escolha uma data primeiro.</p>";

    mostrarApenas("agendaSection");

    atualizarPasso(4);
}

function voltarDetalhes() {

    if (currentUBS) {
        mostrarApenas("ubsDetalhes");
    }
}

function voltarEspecialidades() {

    mostrarApenas("especialidadeSection");

    atualizarPasso(3);
}

/* ============================================================
   CALENDÁRIO
   ============================================================ */

function renderCalendario() {

    const calendar = $("calendar");

    calendar.innerHTML = "";

    const ano = calendarDate.getFullYear();
    const mes = calendarDate.getMonth();

    $("mesAtual").textContent =
        new Intl.DateTimeFormat("pt-BR", {
            month: "long",
            year: "numeric"
        }).format(calendarDate);

    const diasSemana = [
        "Dom",
        "Seg",
        "Ter",
        "Qua",
        "Qui",
        "Sex",
        "Sáb"
    ];

    diasSemana.forEach(function (dia) {

        const elemento = document.createElement("div");

        elemento.className = "day-name";

        elemento.textContent = dia;

        calendar.appendChild(elemento);

    });

    const primeiroDia = new Date(
        ano,
        mes,
        1
    ).getDay();

    const quantidadeDias =
        new Date(
            ano,
            mes + 1,
            0
        ).getDate();

    for (let i = 0; i < primeiroDia; i++) {

        const vazio = document.createElement("div");

        calendar.appendChild(vazio);
    }

    for (let dia = 1; dia <= quantidadeDias; dia++) {

        const data = new Date(
            ano,
            mes,
            dia
        );

        const elemento = document.createElement("button");

        elemento.className = "day";

        elemento.textContent = dia;

        const dataISO = formatarData(data);

        if (
            data.getDay() === 0 ||
            data.getDay() === 6 ||
            ehFeriado(data)
        ) {

            elemento.classList.add("disabled");

            elemento.disabled = true;

        } else {

            elemento.addEventListener(
                "click",
                function () {
                    selecionarData(dataISO);
                }
            );

        }

        if (dataISO === currentDate) {
            elemento.classList.add("selected");
        }

        calendar.appendChild(elemento);
    }
}

function selecionarData(data) {

    currentDate = data;

    renderCalendario();

    renderHorarios();

    atualizarPasso(4);
}

function mesAnterior() {

    const hoje = new Date();

    const mesAtualReal =
        hoje.getFullYear() * 12 +
        hoje.getMonth();

    const mesSelecionado =
        calendarDate.getFullYear() * 12 +
        calendarDate.getMonth();

    if (mesSelecionado <= mesAtualReal) {
        return;
    }

    calendarDate.setMonth(
        calendarDate.getMonth() - 1
    );

    renderCalendario();
}

function mesProximo() {

    calendarDate.setMonth(
        calendarDate.getMonth() + 1
    );

    renderCalendario();
}

function formatarData(data) {

    const ano = data.getFullYear();

    const mes = String(
        data.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
        data.getDate()
    ).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}

/* ============================================================
   FERIADOS
   ============================================================ */

function ehFeriado(data) {

    const dia = data.getDate();
    const mes = data.getMonth() + 1;

    const fixos = [
        "01-01",
        "04-21",
        "05-01",
        "09-07",
        "10-12",
        "11-02",
        "11-15",
        "12-25"
    ];

    const chave =
        String(mes).padStart(2, "0") +
        "-" +
        String(dia).padStart(2, "0");

    return fixos.includes(chave);
}

/* ============================================================
   HORÁRIOS
   ============================================================ */

function renderHorarios() {

    if (!currentDate) {
        return;
    }

    const manha = $("horariosManha");
    const tarde = $("horariosTarde");

    manha.innerHTML = "";
    tarde.innerHTML = "";

    HORARIOS_MANHA.forEach(function (horario, index) {

        criarHorario(
            manha,
            horario,
            index + 1
        );

    });

    HORARIOS_TARDE.forEach(function (horario, index) {

        criarHorario(
            tarde,
            horario,
            HORARIOS_MANHA.length + index + 1
        );

    });
}

function criarHorario(container, horario, fila) {

    const ocupado = appointments.some(function (consulta) {

        return (
            consulta.status !== "cancelado" &&
            consulta.ubsId === currentUBS.id &&
            consulta.especialidade === currentSpecialty &&
            consulta.data === currentDate &&
            consulta.horario === horario
        );

    });

    const botao = document.createElement("button");

    botao.className = "time";

    if (ocupado) {
        botao.classList.add("busy");
        botao.disabled = true;
        botao.textContent = horario + " • Ocupado";
    } else {

        botao.textContent =
            horario +
            " • Fila " +
            fila;

        botao.addEventListener(
            "click",
            function () {

                agendarConsulta(
                    horario,
                    fila
                );

            }
        );
    }

    container.appendChild(botao);
}

/* ============================================================
   AGENDAMENTO
   ============================================================ */

function agendarConsulta(horario, fila) {

    const paciente =
        JSON.parse(
            localStorage.getItem(STORAGE_PATIENT)
        );

    if (!paciente) {
        toast("Preencha seus dados primeiro.");
        mostrarApenas("cadastro");
        return;
    }

    if (!currentUBS || !currentSpecialty || !currentDate) {

        toast("Selecione UBS, especialidade e data.");

        return;
    }

    const duplicado = appointments.some(function (consulta) {

        return (
            consulta.status !== "cancelado" &&
            consulta.sus === paciente.sus &&
            consulta.ubsId === currentUBS.id &&
            consulta.especialidade === currentSpecialty &&
            consulta.data === currentDate
        );

    });

    if (duplicado) {

        toast(
            "Você já possui uma consulta para esta especialidade nesta data."
        );

        return;
    }

    const horarioOcupado = appointments.some(function (consulta) {

        return (
            consulta.status !== "cancelado" &&
            consulta.ubsId === currentUBS.id &&
            consulta.especialidade === currentSpecialty &&
            consulta.data === currentDate &&
            consulta.horario === horario
        );

    });

    if (horarioOcupado) {

        toast("Este horário acabou de ser ocupado.");

        renderHorarios();

        return;
    }

    const consulta = {

        id:
            "CONS-" +
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .substring(2, 7),

        ubsId: currentUBS.id,

        ubsNome: currentUBS.nome,

        nome: paciente.nome,

        telefone: paciente.telefone,

        sus: paciente.sus,

        especialidade: currentSpecialty,

        data: currentDate,

        horario: horario,

        fila: fila,

        status: "agendado",

        lembrete: false,

        criadaEm: new Date().toISOString()

    };

    appointments.push(consulta);

    salvarConsultas();

    currentTime = horario;

    mostrarComprovante(consulta);

    mostrarApenas("confirmacaoSection");

    atualizarPasso(5);

    toast("Consulta agendada com sucesso!");

}

/* ============================================================
   COMPROVANTE
   ============================================================ */

function mostrarComprovante(consulta) {

    const dataFormatada =
        formatarDataBR(consulta.data);

    $("comprovante").innerHTML = `

        <div class="receipt-row">
            <strong>Paciente</strong>
            <span>${escapeHTML(consulta.nome)}</span>
        </div>

        <div class="receipt-row">
            <strong>UBS</strong>
            <span>${escapeHTML(consulta.ubsNome)}</span>
        </div>

        <div class="receipt-row">
            <strong>Especialidade</strong>
            <span>${escapeHTML(consulta.especialidade)}</span>
        </div>

        <div class="receipt-row">
            <strong>Data</strong>
            <span>${dataFormatada}</span>
        </div>

        <div class="receipt-row">
            <strong>Horário</strong>
            <span>${escapeHTML(consulta.horario)}</span>
        </div>

        <div class="receipt-row">
            <strong>Posição na fila</strong>
            <span>${consulta.fila}º</span>
        </div>

        <div class="receipt-row">
            <strong>Protocolo</strong>
            <span>${consulta.id}</span>
        </div>

    `;
}

function imprimirComprovante() {

    window.print();

}

/* ============================================================
   MEUS AGENDAMENTOS
   ============================================================ */

function mostrarAgendamentos() {

    const paciente =
        JSON.parse(
            localStorage.getItem(STORAGE_PATIENT)
        );

    if (!paciente) {

        toast("Faça seu cadastro primeiro.");

        mostrarApenas("cadastro");

        return;
    }

    renderMeusAgendamentos();

    mostrarApenas("meusAgendamentos");

}

function renderMeusAgendamentos() {

    const container =
        $("listaAgendamentos");

    container.innerHTML = "";

    const paciente =
        JSON.parse(
            localStorage.getItem(STORAGE_PATIENT)
        );

    const lista =
        appointments.filter(function (consulta) {

            return consulta.sus === paciente.sus;

        }).sort(function (a, b) {

            return (
                (a.data + a.horario)
                .localeCompare(
                    b.data + b.horario
                )
            );

        });

    if (lista.length === 0) {

        container.innerHTML = `
            <div class="info-box">
                Você ainda não possui agendamentos.
            </div>
        `;

        return;
    }

    lista.forEach(function (consulta) {

        const div =
            document.createElement("div");

        div.className = "appointment";

        const cancelado =
            consulta.status === "cancelado";

        div.innerHTML = `

            <span class="status ${cancelado ? "cancelado" : ""}">
                ${cancelado ? "CANCELADO" : "AGENDADO"}
            </span>

            <h3>
                ${escapeHTML(consulta.especialidade)}
            </h3>

            <p>
                🏥 ${escapeHTML(consulta.ubsNome)}
            </p>

            <p>
                📅 ${formatarDataBR(consulta.data)}
            </p>

            <p>
                🕐 ${escapeHTML(consulta.horario)}
            </p>

            <p>
                🎫 ${consulta.fila}º da fila
            </p>

            <p>
                Protocolo: ${consulta.id}
            </p>

            ${
                !cancelado
                ?
                `
                <div class="appointment-actions">

                    <button
                        class="btn danger"
                        onclick="cancelarConsultaPaciente('${consulta.id}')">
                        Cancelar
                    </button>

                    <button
                        class="btn secondary"
                        onclick="reagendarConsulta('${consulta.id}')">
                        Reagendar
                    </button>

                    <button
                        class="btn primary"
                        onclick="ativarLembrete('${consulta.id}')">
                        🔔 Ativar lembrete
                    </button>

                    <button
                        class="btn secondary"
                        onclick="imprimirConsulta('${consulta.id}')">
                        🖨 Imprimir
                    </button>

                </div>
                `
                :
                ""
            }

        `;

        container.appendChild(div);

    });
}

function cancelarConsultaPaciente(id) {

    const consulta =
        appointments.find(
            item => item.id === id
        );

    if (!consulta) {
        toast("Consulta não encontrada.");
        return;
    }

    if (
        !confirm(
            "Deseja realmente cancelar esta consulta?"
        )
    ) {
        return;
    }

    consulta.status = "cancelado";

    salvarConsultas();

    renderMeusAgendamentos();

    toast("Consulta cancelada.");

}

function reagendarConsulta(id) {

    const consulta =
        appointments.find(
            item => item.id === id
        );

    if (!consulta) {
        toast("Consulta não encontrada.");
        return;
    }

    const ubs =
        ubsList.find(
            item => item.id === consulta.ubsId
        );

    if (!ubs) {
        toast("UBS não encontrada.");
        return;
    }

    currentUBS = ubs;
    currentSpecialty = consulta.especialidade;

    consulta.status = "cancelado";

    salvarConsultas();

    calendarDate = new Date();

    renderCalendario();

    $("agendaInfo").textContent =
        currentUBS.nome +
        " • " +
        currentSpecialty +
        " • Reagendamento";

    mostrarApenas("agendaSection");

    atualizarPasso(4);

    toast(
        "Escolha uma nova data e horário."
    );
}

function imprimirConsulta(id) {

    const consulta =
        appointments.find(
            item => item.id === id
        );

    if (!consulta) return;

    mostrarComprovante(consulta);

    window.print();

}

function ativarLembrete(id) {

    const consulta =
        appointments.find(
            item => item.id === id
        );

    if (!consulta) return;

    consulta.lembrete = true;

    salvarConsultas();

    if (
        "Notification" in window
    ) {

        Notification.requestPermission()
            .then(function (permissao) {

                if (permissao === "granted") {

                    new Notification(
                        "Conecta Saúde",
                        {
                            body:
                                "Lembrete ativado para sua consulta em " +
                                formatarDataBR(consulta.data) +
                                " às " +
                                consulta.horario
                        }
                    );

                }

            });

    }

    toast(
        "Lembrete ativado neste navegador."
    );

}

/* ============================================================
   LOGIN
   ============================================================ */

function abrirLogin() {

    $("loginUsuario").value = "";
    $("loginSenha").value = "";

    $("loginModal").classList.remove("hidden");

    setTimeout(function () {
        $("loginUsuario").focus();
    }, 100);

}

function fecharLogin() {

    $("loginModal").classList.add("hidden");

}

function realizarLogin() {

    const usuario =
        $("loginUsuario").value.trim();

    const senha =
        $("loginSenha").value;

    if (!usuario || !senha) {

        toast("Informe usuário e senha.");

        return;
    }

    /* LOGIN DO DESENVOLVEDOR */

    if (
        usuario === "desenvolvedor" &&
        senha === "2026"
    ) {

        adminSession = {
            tipo: "desenvolvedor",
            ubsId: null
        };

        fecharLogin();

        abrirPainelAdmin();

        return;
    }

    /* LOGIN DAS UBS */

    const ubs =
        ubsList.find(function (item) {

            return (
                item.usuario === usuario &&
                item.senha === senha
            );

        });

    if (!ubs) {

        toast("Usuário ou senha inválidos.");

        return;
    }

    adminSession = {

        tipo: "ubs",

        ubsId: ubs.id

    };

    fecharLogin();

    abrirPainelAdmin();

}

/* ============================================================
   PAINEL ADMIN
   ============================================================ */

function abrirPainelAdmin() {

    if (!adminSession) {
        return;
    }

    $("adminModal").classList.remove("hidden");

    if (
        adminSession.tipo === "desenvolvedor"
    ) {

        $("adminTitulo").textContent =
            "Painel do Desenvolvedor";

        $("seletorDesenvolvedor")
            .classList.remove("hidden");

        preencherSelectAdmin();

        const primeiro =
            ubsList[0];

        if (primeiro) {

            $("adminUBSSelect").value =
                primeiro.id;

            carregarDadosAdmin(
                primeiro.id
            );
        }

    } else {

        $("adminTitulo").textContent =
            "Painel " +
            getUBS(adminSession.ubsId).nome;

        $("seletorDesenvolvedor")
            .classList.add("hidden");

        carregarDadosAdmin(
            adminSession.ubsId
        );
    }

    abrirAbaAdmin("dados");

}

function fecharAdmin() {

    $("adminModal").classList.add("hidden");

}

function logoutAdmin() {

    adminSession = null;

    fecharAdmin();

    toast("Sessão encerrada.");

}

function getUBS(id) {

    return ubsList.find(
        item => item.id === id
    );
}

function UBSAdminAtual() {

    if (
        !adminSession
    ) {
        return null;
    }

    if (
        adminSession.tipo === "desenvolvedor"
    ) {

        return getUBS(
            $("adminUBSSelect").value
        );

    }

    return getUBS(
        adminSession.ubsId
    );
}

function preencherSelectAdmin() {

    const select =
        $("adminUBSSelect");

    select.innerHTML = "";

    ubsList.forEach(function (ubs) {

        const option =
            document.createElement("option");

        option.value = ubs.id;

        option.textContent = ubs.nome;

        select.appendChild(option);

    });

}

function trocarUBSAdmin() {

    carregarDadosAdmin(
        $("adminUBSSelect").value
    );

    abrirAbaAdmin("dados");

}

function carregarDadosAdmin(id) {

    const ubs = getUBS(id);

    if (!ubs) return;

    $("editNomeUBS").value =
        ubs.nome;

    $("editEndereco").value =
        ubs.endereco;

    $("editTelefone").value =
        ubs.telefone;

    $("editHorario").value =
        ubs.horario;

    $("editEspecialidades").value =
        ubs.especialidades.join("\n");

    $("editServicos").value =
        ubs.servicos.join("\n");

    $("editCampanhas").value =
        ubs.campanhas.join("\n");

    $("editDocumentos").value =
        ubs.documentos.join("\n");

    $("editUsuario").value =
        ubs.usuario;

    $("editSenha").value =
        ubs.senha;

    renderFuncionariosAdmin();

    preencherFiltroEspecialidades();

    renderConsultasAdmin();

}

function abrirAbaAdmin(aba) {

    $("adminDados")
        .classList.add("hidden");

    $("adminFuncionarios")
        .classList.add("hidden");

    $("adminConsultas")
        .classList.add("hidden");

    if (aba === "dados") {

        $("adminDados")
            .classList.remove("hidden");

    }

    if (aba === "funcionarios") {

        $("adminFuncionarios")
            .classList.remove("hidden");

        renderFuncionariosAdmin();

    }

    if (aba === "consultas") {

        $("adminConsultas")
            .classList.remove("hidden");

        preencherFiltroEspecialidades();

        renderConsultasAdmin();

    }

}

/* ============================================================
   SALVAR INFORMAÇÕES UBS
   ============================================================ */

function salvarInformacoesUBS() {

    const ubs = UBSAdminAtual();

    if (!ubs) {

        toast("Nenhuma UBS selecionada.");

        return;
    }

    ubs.nome =
        $("editNomeUBS").value.trim();

    ubs.endereco =
        $("editEndereco").value.trim();

    ubs.telefone =
        $("editTelefone").value.trim();

    ubs.horario =
        $("editHorario").value.trim();

    ubs.especialidades =
        converterTextoLista(
            $("editEspecialidades").value
        );

    ubs.servicos =
        converterTextoLista(
            $("editServicos").value
        );

    ubs.campanhas =
        converterTextoLista(
            $("editCampanhas").value
        );

    ubs.documentos =
        converterTextoLista(
            $("editDocumentos").value
        );

    const novoUsuario =
        $("editUsuario").value.trim();

    const novaSenha =
        $("editSenha").value.trim();

    if (!novoUsuario || !novaSenha) {

        toast(
            "Usuário e senha não podem ficar vazios."
        );

        return;
    }

    /*
       Impede duas UBS de usarem
       o mesmo usuário.
    */

    const usuarioExiste =
        ubsList.some(function (item) {

            return (
                item.id !== ubs.id &&
                item.usuario === novoUsuario
            );

        });

    if (usuarioExiste) {

        toast(
            "Esse usuário já pertence a outra UBS."
        );

        return;
    }

    ubs.usuario = novoUsuario;
    ubs.senha = novaSenha;

    salvarUBS();

    renderUBS();

    if (currentUBS &&
        currentUBS.id === ubs.id) {

        currentUBS = ubs;
    }

    toast(
        "Informações da UBS atualizadas!"
    );

}

function converterTextoLista(texto) {

    return texto
        .split("\n")
        .map(item => item.trim())
        .filter(item => item.length > 0);

}

/* ============================================================
   FUNCIONÁRIOS
   ============================================================ */

function renderFuncionariosAdmin() {

    const container =
        $("listaFuncionariosAdmin");

    container.innerHTML = "";

    const ubs =
        UBSAdminAtual();

    if (!ubs) return;

    if (
        !ubs.funcionarios ||
        ubs.funcionarios.length === 0
    ) {

        container.innerHTML = `
            <div class="info-box">
                Nenhum funcionário cadastrado.
            </div>
        `;

        return;
    }

    ubs.funcionarios.forEach(function (funcionario) {

        const div =
            document.createElement("div");

        div.className = "employee";

        div.innerHTML = `

            <div class="employee-info">

                <strong>
                    ${escapeHTML(funcionario.nome)}
                </strong>

                <span>
                    ${escapeHTML(funcionario.cargo)}
                </span>

            </div>

            <div class="employee-actions">

                <button
                    class="btn secondary"
                    onclick="editarFuncionario('${funcionario.id}')">
                    Editar
                </button>

                <button
                    class="btn danger"
                    onclick="excluirFuncionario('${funcionario.id}')">
                    Excluir
                </button>

            </div>

        `;

        container.appendChild(div);

    });

}

function abrirFuncionarioForm() {

    editingEmployeeId = null;

    $("funcionarioId").value = "";

    $("funcionarioNome").value = "";

    $("funcionarioCargo").value = "";

    $("tituloFuncionarioForm")
        .textContent = "Novo funcionário";

    $("formFuncionario")
        .classList.remove("hidden");

}

function fecharFuncionarioForm() {

    editingEmployeeId = null;

    $("formFuncionario")
        .classList.add("hidden");

}

function salvarFuncionario() {

    const ubs =
        UBSAdminAtual();

    if (!ubs) return;

    const nome =
        $("funcionarioNome")
            .value
            .trim();

    const cargo =
        $("funcionarioCargo")
            .value
            .trim();

    if (!nome || !cargo) {

        toast(
            "Preencha nome e cargo."
        );

        return;
    }

    if (!ubs.funcionarios) {
        ubs.funcionarios = [];
    }

    if (editingEmployeeId) {

        const funcionario =
            ubs.funcionarios.find(
                item =>
                    item.id ===
                    editingEmployeeId
            );

        if (funcionario) {

            funcionario.nome = nome;
            funcionario.cargo = cargo;

        }

    } else {

        ubs.funcionarios.push({

            id:
                "func-" +
                Date.now(),

            nome,

            cargo

        });

    }

    salvarUBS();

    renderFuncionariosAdmin();

    fecharFuncionarioForm();

    atualizarDetalhesUBS();

    toast(
        "Funcionário salvo com sucesso."
    );

}

function editarFuncionario(id) {

    const ubs =
        UBSAdminAtual();

    if (!ubs) return;

    const funcionario =
        ubs.funcionarios.find(
            item => item.id === id
        );

    if (!funcionario) return;

    editingEmployeeId = id;

    $("funcionarioId").value = id;

    $("funcionarioNome").value =
        funcionario.nome;

    $("funcionarioCargo").value =
        funcionario.cargo;

    $("tituloFuncionarioForm")
        .textContent =
        "Editar funcionário";

    $("formFuncionario")
        .classList.remove("hidden");

}

function excluirFuncionario(id) {

    const ubs =
        UBSAdminAtual();

    if (!ubs) return;

    const funcionario =
        ubs.funcionarios.find(
            item => item.id === id
        );

    if (!funcionario) return;

    if (
        !confirm(
            "Deseja excluir " +
            funcionario.nome +
            "?"
        )
    ) {
        return;
    }

    ubs.funcionarios =
        ubs.funcionarios.filter(
            item => item.id !== id
        );

    salvarUBS();

    renderFuncionariosAdmin();

    atualizarDetalhesUBS();

    toast(
        "Funcionário excluído."
    );

}

/* ============================================================
   ATUALIZAÇÃO DA PÁGINA DA UBS
   ============================================================ */

function atualizarDetalhesUBS() {

    if (!currentUBS) return;

    const ubs =
        getUBS(currentUBS.id);

    if (!ubs) return;

    currentUBS = ubs;

    $("detalheNomeUBS").textContent =
        ubs.nome;

    $("detalheEndereco").textContent =
        "📍 " + ubs.endereco;

    $("detalheTelefone").textContent =
        "☎ " + ubs.telefone;

    $("detalheHorario").textContent =
        "🕐 " + ubs.horario;

    preencherLista(
        "detalheServicos",
        ubs.servicos
    );

    preencherLista(
        "detalheCampanhas",
        ubs.campanhas
    );

    preencherLista(
        "detalheDocumentos",
        ubs.documentos
    );

    preencherLista(
        "detalheFuncionarios",
        ubs.funcionarios.map(
            f =>
                `${f.nome} — ${f.cargo}`
        )
    );

}

/* ============================================================
   CONSULTAS ADMIN
   ============================================================ */

function preencherFiltroEspecialidades() {

    const select =
        $("filtroEspecialidade");

    const ubs =
        UBSAdminAtual();

    if (!ubs) return;

    select.innerHTML =
        `<option value="">Todas as especialidades</option>`;

    ubs.especialidades.forEach(
        function (especialidade) {

            const option =
                document.createElement("option");

            option.value =
                especialidade;

            option.textContent =
                especialidade;

            select.appendChild(option);

        }
    );

}

function renderConsultasAdmin() {

    const container =
        $("listaConsultasAdmin");

    if (!container) return;

    container.innerHTML = "";

    const ubs =
        UBSAdminAtual();

    if (!ubs) return;

    const filtroData =
        $("filtroData").value;

    const filtroEspecialidade =
        $("filtroEspecialidade").value;

    let lista =
        appointments.filter(
            function (consulta) {

                return (
                    consulta.ubsId === ubs.id
                );

            }
        );

    if (filtroData) {

        lista =
            lista.filter(
                consulta =>
                    consulta.data === filtroData
            );

    }

    if (filtroEspecialidade) {

        lista =
            lista.filter(
                consulta =>
                    consulta.especialidade ===
                    filtroEspecialidade
            );

    }

    lista.sort(function (a, b) {

        return (
            (a.data + a.horario)
                .localeCompare(
                    b.data + b.horario
                )
        );

    });

    if (lista.length === 0) {

        container.innerHTML = `
            <div class="info-box">
                Nenhuma consulta encontrada.
            </div>
        `;

        return;
    }

    lista.forEach(function (consulta) {

        const div =
            document.createElement("div");

        div.className =
            "admin-appointment";

        const cancelado =
            consulta.status === "cancelado";

        div.innerHTML = `

            <strong>
                ${escapeHTML(consulta.nome)}
            </strong>

            <p>
                SUS: ${escapeHTML(consulta.sus)}
            </p>

            <p>
                ${escapeHTML(consulta.especialidade)}
            </p>

            <p>
                📅 ${formatarDataBR(consulta.data)}
                às
                ${escapeHTML(consulta.horario)}
            </p>

            <p>
                Fila: ${consulta.fila}º
            </p>

            <p>
                Status:
                <strong>
                    ${cancelado ? "Cancelado" : "Agendado"}
                </strong>
            </p>

            ${
                !cancelado
                ?
                `
                <button
                    class="btn danger"
                    onclick="cancelarConsultaAdmin('${consulta.id}')">
                    Cancelar consulta
                </button>
                `
                :
                ""
            }

        `;

        container.appendChild(div);

    });

}

function cancelarConsultaAdmin(id) {

    const consulta =
        appointments.find(
            item => item.id === id
        );

    if (!consulta) return;

    if (
        !confirm(
            "Deseja cancelar esta consulta?"
        )
    ) {
        return;
    }

    consulta.status = "cancelado";

    salvarConsultas();

    renderConsultasAdmin();

    toast(
        "Consulta cancelada pelo administrador."
    );

}

/* ============================================================
   FORMATAÇÃO
   ============================================================ */

function formatarDataBR(data) {

    if (!data) return "";

    const partes =
        data.split("-");

    if (partes.length !== 3) {
        return data;
    }

    return (
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );
}

/* ============================================================
   TELEFONE
   ============================================================ */

function aplicarMascaraTelefone() {

    const campo =
        $("telefonePaciente");

    campo.addEventListener(
        "input",
        function () {

            let valor =
                this.value.replace(/\D/g, "");

            valor =
                valor.substring(0, 11);

            if (valor.length <= 10) {

                valor =
                    valor.replace(
                        /^(\d{2})(\d)/,
                        "($1) $2"
                    );

                valor =
                    valor.replace(
                        /(\d{4})(\d)/,
                        "$1-$2"
                    );

            } else {

                valor =
                    valor.replace(
                        /^(\d{2})(\d)/,
                        "($1) $2"
                    );

                valor =
                    valor.replace(
                        /(\d{5})(\d)/,
                        "$1-$2"
                    );
            }

            this.value = valor;

        }
    );

}

/* ============================================================
   NAVEGAÇÃO
   ============================================================ */

function voltarInicio() {

    mostrarApenas("cadastro");

    atualizarPasso(1);

}

function atualizarPasso(numero) {

    const passos =
        document.querySelectorAll(".step");

    passos.forEach(function (step, index) {

        if (index < numero) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }

    });

}

/* ============================================================
   LEMBRETES
   ============================================================ */

function verificarLembretes() {

    const agora =
        new Date();

    const paciente =
        JSON.parse(
            localStorage.getItem(STORAGE_PATIENT)
        );

    if (!paciente) return;

    appointments.forEach(function (consulta) {

        if (
            consulta.status === "cancelado" ||
            !consulta.lembrete ||
            consulta.sus !== paciente.sus
        ) {
            return;
        }

        const dataConsulta =
            new Date(
                consulta.data +
                "T" +
                consulta.horario +
                ":00"
            );

        const diferenca =
            dataConsulta.getTime() -
            agora.getTime();

        /*
          Aproximadamente 24 horas antes.
        */

        const vinteQuatroHoras =
            24 * 60 * 60 * 1000;

        if (
            diferenca > 0 &&
            diferenca <= vinteQuatroHoras &&
            !consulta.notificado
        ) {

            if (
                "Notification" in window &&
                Notification.permission === "granted"
            ) {

                new Notification(
                    "Conecta Saúde - Lembrete",
                    {
                        body:
                            "Você tem consulta amanhã às " +
                            consulta.horario +
                            " na " +
                            consulta.ubsNome +
                            "."
                    }
                );

            }

            consulta.notificado = true;

            salvarConsultas();

        }

    });

}

/*
   Verifica os lembretes enquanto
   a página estiver aberta.
*/

setInterval(
    verificarLembretes,
    60000
);

/* ============================================================
   TECLA ENTER NO LOGIN
   ============================================================ */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" &&
            !$("loginModal").classList.contains("hidden")
        ) {

            realizarLogin();

        }

    }
);

/* ============================================================
   FIM
   ============================================================ */
