// ============================================================
// CONECTA SAÚDE V2
// Sistema de agendamento de consultas em UBS
// ============================================================

const UBS = [
  {
    id: "A",
    name: "UBS A",
    address: "Rua da Saúde, 100",
    phone: "(87) 3333-1001",
    hours: "Segunda a sexta, 07h às 17h",

    campaigns: [
      "Vacinação contra Influenza",
      "Atualização da caderneta de vacinação",
      "Prevenção de hipertensão e diabetes"
    ],

    docs: [
      "Cartão SUS",
      "Documento de identificação com foto",
      "Comprovante de residência, quando solicitado"
    ],

    employees: [
      ["Mariana Alves", "Enfermeira responsável"],
      ["Carlos Lima", "Clínico geral"],
      ["Joana Martins", "Dentista"],
      ["Rafael Souza", "Recepcionista"]
    ]
  },

  {
    id: "C",
    name: "UBS C",
    address: "Av. Esperança, 250",
    phone: "(87) 3333-1003",
    hours: "Segunda a sexta, 07h às 17h",

    campaigns: [
      "Vacinação contra Influenza",
      "Vacinação de rotina para crianças",
      "Campanha de saúde da mulher"
    ],

    docs: [
      "Cartão SUS",
      "Documento de identificação",
      "Comprovante de residência, quando solicitado"
    ],

    employees: [
      ["Patrícia Gomes", "Enfermeira"],
      ["André Costa", "Clínico geral"],
      ["Luciana Melo", "Dentista"],
      ["Bruno Reis", "Agente administrativo"]
    ]
  },

  {
    id: "D",
    name: "UBS D",
    address: "Rua das Flores, 45",
    phone: "(87) 3333-1004",
    hours: "Segunda a sexta, 08h às 18h",

    campaigns: [
      "Vacinação contra Influenza",
      "Prevenção e controle da dengue",
      "Acompanhamento de hipertensão"
    ],

    docs: [
      "Cartão SUS",
      "Documento com foto",
      "Receitas e exames anteriores, se relacionados à consulta"
    ],

    employees: [
      ["Fernanda Rocha", "Médica clínica geral"],
      ["Diego Nunes", "Enfermeiro"],
      ["Camila Freire", "Dentista"],
      ["Paulo Santos", "Recepcionista"]
    ]
  },

  {
    id: "E",
    name: "UBS E",
    address: "Praça do Cuidado, 80",
    phone: "(87) 3333-1005",
    hours: "Segunda a sexta, 07h às 16h",

    campaigns: [
      "Vacinação de rotina",
      "Saúde do idoso",
      "Orientação sobre alimentação saudável"
    ],

    docs: [
      "Cartão SUS",
      "Documento de identificação",
      "Caderneta de vacinação, quando aplicável"
    ],

    employees: [
      ["Renata Moura", "Enfermeira"],
      ["Fábio Castro", "Clínico geral"],
      ["Aline Dias", "Dentista"],
      ["Márcio Lopes", "Agente comunitário"]
    ]
  },

  {
    id: "F",
    name: "UBS F",
    address: "Av. Vida Nova, 310",
    phone: "(87) 3333-1006",
    hours: "Segunda a sexta, 07h às 17h",

    campaigns: [
      "Vacinação contra Influenza",
      "Prevenção do câncer do colo do útero",
      "Combate ao tabagismo"
    ],

    docs: [
      "Cartão SUS",
      "Documento com foto",
      "Exames anteriores, se houver"
    ],

    employees: [
      ["Bianca Ferreira", "Enfermeira responsável"],
      ["Gustavo Oliveira", "Clínico geral"],
      ["Sofia Ramos", "Dentista"],
      ["Leandro Melo", "Recepcionista"]
    ]
  }
];


// ============================================================
// ESPECIALIDADES
// ============================================================

const SPECIALTIES = [
  {
    id: "clinico",
    name: "Clínico geral",
    icon: "🩺",
    desc: "Avaliação, acompanhamento e cuidados gerais."
  },

  {
    id: "dentista",
    name: "Dentista",
    icon: "🦷",
    desc: "Atendimento e orientação em saúde bucal."
  },

  {
    id: "enfermagem",
    name: "Enfermeira",
    icon: "🩹",
    desc: "Consultas de enfermagem e orientações."
  }
];


// ============================================================
// HORÁRIOS
// 10 horários pela manhã
// 10 horários à tarde
// ============================================================

const TIMES = {

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


// ============================================================
// ESTADO DO SISTEMA
// ============================================================

const state = {

  patient: null,

  ubs: null,

  specialty: null,

  date: null,

  period: null,

  time: null,

  infoUBS: UBS[0]

};


// ============================================================
// FUNÇÃO PARA PEGAR ELEMENTOS HTML
// ============================================================

const $ = id => document.getElementById(id);


// ============================================================
// LOCAL STORAGE
// ============================================================

function getAppointments() {

  try {

    return JSON.parse(
      localStorage.getItem("conectaSaudeAppointmentsV2") || "[]"
    );

  } catch (error) {

    return [];

  }

}


function saveAppointments(list) {

  localStorage.setItem(
    "conectaSaudeAppointmentsV2",
    JSON.stringify(list)
  );

}


function getEmployees() {

  try {

    return JSON.parse(
      localStorage.getItem("conectaSaudeEmployeesV2") || "{}"
    );

  } catch (error) {

    return {};

  }

}


function saveEmployees(data) {

  localStorage.setItem(
    "conectaSaudeEmployeesV2",
    JSON.stringify(data)
  );

}


// ============================================================
// SEGURANÇA BÁSICA PARA TEXTOS
// ============================================================

function escapeHTML(value) {

  return String(value).replace(
    /[&<>"']/g,

    function (match) {

      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[match];

    }
  );

}


// ============================================================
// NOTIFICAÇÃO
// ============================================================

function toast(message) {

  const element = $("toast");

  if (!element) return;

  element.textContent = message;

  element.classList.add("show");

  clearTimeout(window.__toast);

  window.__toast = setTimeout(
    () => element.classList.remove("show"),
    2600
  );

}


// ============================================================
// NAVEGAÇÃO ENTRE ETAPAS
// ============================================================

function showSection(id) {

  const sections = [
    "patientCard",
    "ubsSection",
    "specialtySection",
    "scheduleSection",
    "confirmationSection"
  ];

  sections.forEach(section => {

    const element = $(section);

    if (element) {

      element.classList.add("hidden");

    }

  });


  const selected = $(id);

  if (selected) {

    selected.classList.remove("hidden");

  }


  updateSteps(id);

  window.scrollTo({
    top: 120,
    behavior: "smooth"
  });

}


// ============================================================
// ATUALIZA ETAPAS
// ============================================================

function updateSteps(id) {

  const order = {

    patientCard: 1,

    ubsSection: 2,

    specialtySection: 3,

    scheduleSection: 4,

    confirmationSection: 5

  };


  document.querySelectorAll(".step").forEach(
    (step, index) => {

      step.classList.toggle(
        "active",
        index < order[id]
      );

    }
  );

}


// ============================================================
// DATAS
// ============================================================

function formatDate(iso) {

  return new Date(
    iso + "T12:00:00"
  ).toLocaleDateString("pt-BR");

}


function formatDateLong(iso) {

  return new Date(
    iso + "T12:00:00"
  ).toLocaleDateString(
    "pt-BR",
    {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    }
  );

}


function todayISO() {

  const date = new Date();

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

}


// ============================================================
// FERIADOS
// ============================================================

function isHoliday(date) {

  const year = date.getFullYear();

  const key =
    `${year}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;


  const fixed = [

    `${year}-01-01`,

    `${year}-04-21`,

    `${year}-05-01`,

    `${year}-09-07`,

    `${year}-10-12`,

    `${year}-11-02`,

    `${year}-11-15`,

    `${year}-11-20`,

    `${year}-12-25`

  ];


  const moving = {

    2026: [
      "2026-02-16",
      "2026-02-17",
      "2026-04-03"
    ],

    2027: [
      "2027-02-08",
      "2027-02-09",
      "2027-03-26"
    ],

    2028: [
      "2028-02-28",
      "2028-02-29",
      "2028-04-14"
    ]

  };


  return (
    fixed.includes(key) ||
    (moving[year] || []).includes(key)
  );

}


// ============================================================
// DIA ÚTIL
// ============================================================

function isWorkingDay(date) {

  const day = date.getDay();

  return (
    day !== 0 &&
    day !== 6 &&
    !isHoliday(date)
  );

}


// ============================================================
// UBS
// ============================================================

function renderUBS() {

  const grid = $("ubsGrid");

  if (!grid) return;


  grid.innerHTML = UBS.map(ubs => `

    <article class="ubs-card">

      <h3>${ubs.name}</h3>

      <p>
        📍 ${ubs.address}<br>
        ☎ ${ubs.phone}<br>
        🕐 ${ubs.hours}
      </p>

      <button
        class="primary-btn"
        data-choose-ubs="${ubs.id}"
      >
        Escolher esta UBS
      </button>

    </article>

  `).join("");


  document
    .querySelectorAll("[data-choose-ubs]")
    .forEach(button => {

      button.onclick = () => {

        selectUBS(
          button.dataset.chooseUbs
        );

      };

    });

}


// ============================================================
// SELECIONAR UBS
// ============================================================

function selectUBS(id) {

  state.ubs = UBS.find(
    ubs => ubs.id === id
  );


  if (!state.ubs) return;


  $("specialtyTitle").textContent =
    `Especialidade — ${state.ubs.name}`;


  $("specialtyGrid").innerHTML =
    SPECIALTIES.map(specialty => `

      <article class="specialty-card">

        <div class="emoji">
          ${specialty.icon}
        </div>

        <h3>
          ${specialty.name}
        </h3>

        <p>
          ${specialty.desc}
        </p>

        <button
          class="primary-btn"
          data-specialty="${specialty.id}"
        >
          Selecionar
        </button>

      </article>

    `).join("");


  document
    .querySelectorAll("[data-specialty]")
    .forEach(button => {

      button.onclick = () => {

        selectSpecialty(
          button.dataset.specialty
        );

      };

    });


  showSection("specialtySection");

}


// ============================================================
// SELECIONAR ESPECIALIDADE
// ============================================================

function selectSpecialty(id) {

  state.specialty =
    SPECIALTIES.find(
      specialty => specialty.id === id
    );


  if (!state.specialty) return;


  state.date = null;
  state.period = null;
  state.time = null;


  $("scheduleSubtitle").textContent =
    `${state.ubs.name} • ${state.specialty.name}`;


  buildCalendar();


  $("selectedDateLabel").textContent =
    "Selecione uma data";


  $("morningSlots").innerHTML = "";

  $("afternoonSlots").innerHTML = "";


  showSection("scheduleSection");

}


// ============================================================
// CALENDÁRIO
// ============================================================

function buildCalendar() {

  const calendar = $("calendar");

  if (!calendar) return;


  const now = new Date();

  now.setHours(0, 0, 0, 0);


  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );


  let html = "";


  // Mostra os próximos 3 meses
  for (let month = 0; month < 3; month++) {

    const firstDay = new Date(
      start.getFullYear(),
      start.getMonth() + month,
      1
    );


    const daysInMonth =
      new Date(
        firstDay.getFullYear(),
        firstDay.getMonth() + 1,
        0
      ).getDate();


    html += `

      <div
        style="
          grid-column:1/-1;
          font-weight:800;
          padding:8px 0;
          text-transform:capitalize;
        "
      >
        ${firstDay.toLocaleDateString(
          "pt-BR",
          {
            month: "long",
            year: "numeric"
          }
        )}
      </div>

    `;


    [
      "Dom",
      "Seg",
      "Ter",
      "Qua",
      "Qui",
      "Sex",
      "Sáb"
    ].forEach(day => {

      html += `
        <div class="weekday">
          ${day}
        </div>
      `;

    });


    // Espaços antes do primeiro dia
    for (
      let i = 0;
      i < firstDay.getDay();
      i++
    ) {

      html += "<div></div>";

    }


    // Dias
    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {

      const date = new Date(
        firstDay.getFullYear(),
        firstDay.getMonth(),
        day
      );


      const iso =
        `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(
          date.getDate()
        ).padStart(2, "0")}`;


      const available =
        isWorkingDay(date) &&
        date >= now;


      const title =
        isHoliday(date)
          ? "Feriado"
          : "";


      html += `

        <button
          class="day ${
            state.date === iso
              ? "selected"
              : ""
          }"
          ${available ? "" : "disabled"}
          data-date="${iso}"
          title="${title}"
        >
          ${day}
        </button>

      `;

    }

  }


  calendar.innerHTML = html;


  document
    .querySelectorAll(".day:not(:disabled)")
    .forEach(button => {

      button.onclick = () => {

        selectDate(
          button.dataset.date
        );

      };

    });

}


// ============================================================
// SELECIONAR DATA
// ============================================================

function selectDate(iso) {

  state.date = iso;

  state.period = null;

  state.time = null;


  buildCalendar();


  $("selectedDateLabel").textContent =
    formatDateLong(iso);


  renderTimeSlots();

}


// ============================================================
// CONTAGEM DE HORÁRIOS
// ============================================================

function slotCount(
  period,
  time
) {

  return getAppointments().filter(
    appointment =>

      appointment.status !== "cancelled" &&

      appointment.ubsId === state.ubs.id &&

      appointment.specialtyId ===
        state.specialty.id &&

      appointment.date === state.date &&

      appointment.period === period &&

      appointment.time === time

  ).length;

}


// ============================================================
// CONTAGEM POR PERÍODO
// ============================================================

function periodCount(period) {

  return getAppointments().filter(
    appointment =>

      appointment.status !== "cancelled" &&

      appointment.ubsId === state.ubs.id &&

      appointment.specialtyId ===
        state.specialty.id &&

      appointment.date === state.date &&

      appointment.period === period

  ).length;

}


// ============================================================
// HORÁRIOS
// ============================================================

function renderTimeSlots() {

  renderPeriod(
    "manha",
    "morningSlots"
  );


  renderPeriod(
    "tarde",
    "afternoonSlots"
  );

}


// ============================================================
// RENDERIZAR PERÍODO
// ============================================================

function renderPeriod(
  period,
  targetId
) {

  const target = $(targetId);

  if (!target) return;


  const appointments =
    getAppointments().filter(
      appointment =>

        appointment.status !==
          "cancelled" &&

        appointment.ubsId ===
          state.ubs.id &&

        appointment.specialtyId ===
          state.specialty.id &&

        appointment.date ===
          state.date &&

        appointment.period ===
          period
    );


  target.innerHTML =
    TIMES[period].map(
      (time, index) => {

        const occupied =
          appointments.some(
            appointment =>
              appointment.time === time
          );


        const position = index + 1;


        return `

          <button
            class="slot ${
              occupied ? "full" : ""
            } ${
              state.time === time &&
              state.period === period
                ? "selected"
                : ""
            }"
            ${occupied ? "disabled" : ""}
            data-period="${period}"
            data-time="${time}"
          >

            <strong>
              ${time}
            </strong>

            <span>
              ${
                occupied
                  ? "Ocupado"
                  : `${position}ª posição`
              }
            </span>

          </button>

        `;

      }
    ).join("");


  target
    .querySelectorAll(
      ".slot:not(:disabled)"
    )
    .forEach(button => {

      button.onclick = () => {

        selectTime(
          button.dataset.period,
          button.dataset.time
        );

      };

    });

}


// ============================================================
// SELECIONAR HORÁRIO
// ============================================================

function selectTime(
  period,
  time
) {

  state.period = period;

  state.time = time;


  const position =
    TIMES[period].indexOf(time) + 1;


  const count =
    periodCount(period);


  if (count >= 10) {

    toast(
      "Este período já atingiu o limite de 10 consultas."
    );

    return;

  }


  confirmAppointment(position);

}


// ============================================================
// CONFIRMAR AGENDAMENTO
// ============================================================

function confirmAppointment(
  position
) {

  const list =
    getAppointments();


  // Impede duplicação
  const duplicate =
    list.find(
      appointment =>

        appointment.status !==
          "cancelled" &&

        appointment.sus ===
          state.patient.sus &&

        appointment.ubsId ===
          state.ubs.id &&

        appointment.specialtyId ===
          state.specialty.id &&

        appointment.date ===
          state.date
    );


  if (duplicate) {

    toast(
      "Você já possui um agendamento para esta especialidade e data."
    );

    return;

  }


  const appointment = {

    id:
      "APT-" +
      Date.now(),

    name:
      state.patient.name,

    phone:
      state.patient.phone,

    sus:
      state.patient.sus,

    ubsId:
      state.ubs.id,

    ubsName:
      state.ubs.name,

    specialtyId:
      state.specialty.id,

    specialtyName:
      state.specialty.name,

    date:
      state.date,

    period:
      state.period,

    time:
      state.time,

    position:
      position,

    status:
      "scheduled",

    reminder:
      false,

    createdAt:
      new Date().toISOString()

  };


  list.push(appointment);

  saveAppointments(list);


  $("confirmationText").textContent =
    `${state.patient.name}, sua consulta foi registrada na ${state.ubs.name}.`;


  $("queueBox").innerHTML = `

    <div>
      Sua posição na fila é
    </div>

    <div class="queue-number">
      ${position}º
    </div>

    <div>

      <strong>
        ${state.specialty.name}
      </strong>

      • ${formatDate(state.date)}

      • ${state.time}

      • ${
        state.period === "manha"
          ? "Manhã"
          : "Tarde"
      }

    </div>

  `;


  $("userGreeting").textContent =
    `Olá, ${state.patient.name.split(" ")[0]}`;


  $("userGreeting")
    .classList
    .remove("hidden");


  renderAppointments();


  showSection(
    "confirmationSection"
  );


  toast(
    "Consulta agendada com sucesso!"
  );

}


// ============================================================
// MEUS AGENDAMENTOS
// ============================================================

function renderAppointments() {

  const section =
    $("appointmentsSection");


  if (!section) return;


  if (!state.patient) {

    section.classList.add("hidden");

    return;

  }


  const mine =
    getAppointments().filter(
      appointment =>
        appointment.sus ===
        state.patient.sus
    );


  section.classList.remove(
    "hidden"
  );


  if (!mine.length) {

    $("appointmentsList").innerHTML = `
      <div class="empty">
        Você ainda não possui agendamentos.
      </div>
    `;

    return;

  }


  $("appointmentsList").innerHTML =
    mine
      .slice()
      .reverse()
      .map(appointment => `

        <article class="appointment">

          <div class="appointment-header">

            <div>

              <strong>
                ${escapeHTML(
                  appointment.ubsName
                )}
              </strong>

              —
              
              ${escapeHTML(
                appointment.specialtyName
              )}

              <br>

              📅 ${formatDate(
                appointment.date
              )}

              •

              🕐 ${appointment.time}

              •

              ${
                appointment.period ===
                "manha"
                  ? "Manhã"
                  : "Tarde"
              }

              <br>

              ${
                appointment.status ===
                "scheduled"

                  ? `
                    👥
                    <strong>
                      ${appointment.position}º
                      na fila
                    </strong>
                  `

                  : ""
              }

            </div>


            <span
              class="status ${
                appointment.status ===
                "cancelled"
                  ? "cancelled"
                  : ""
              }"
            >

              ${
                appointment.status ===
                "scheduled"
                  ? "AGENDADA"
                  : "CANCELADA"
              }

            </span>

          </div>


          ${
            appointment.status ===
            "scheduled"

              ? `

                <div class="appointment-actions">

                  <button
                    class="small-btn primary"
                    data-reminder="${appointment.id}"
                  >
                    🔔
                    ${
                      appointment.reminder
                        ? "Lembrete ativado"
                        : "Ativar lembrete"
                    }
                  </button>


                  <button
                    class="small-btn primary"
                    data-reschedule="${appointment.id}"
                  >
                    ↻ Reagendar
                  </button>


                  <button
                    class="small-btn danger"
                    data-cancel="${appointment.id}"
                  >
                    ✕ Cancelar
                  </button>

                </div>

              `

              : ""

          }

        </article>

      `)
      .join("");


  document
    .querySelectorAll(
      "[data-reminder]"
    )
    .forEach(button => {

      button.onclick = () =>
        toggleReminder(
          button.dataset.reminder
        );

    });


  document
    .querySelectorAll(
      "[data-cancel]"
    )
    .forEach(button => {

      button.onclick = () =>
        cancelAppointment(
          button.dataset.cancel
        );

    });


  document
    .querySelectorAll(
      "[data-reschedule]"
    )
    .forEach(button => {

      button.onclick = () =>
        rescheduleAppointment(
          button.dataset.reschedule
        );

    });

}


// ============================================================
// ATIVAR / DESATIVAR LEMBRETE
// ============================================================

function toggleReminder(id) {

  const list =
    getAppointments();


  const appointment =
    list.find(
      item => item.id === id
    );


  if (!appointment) return;


  appointment.reminder =
    !appointment.reminder;


  saveAppointments(list);


  renderAppointments();


  toast(
    appointment.reminder
      ? "Lembrete ativado."
      : "Lembrete desativado."
  );

}


// ============================================================
// CANCELAR CONSULTA
// ============================================================

function cancelAppointment(id) {

  const list =
    getAppointments();


  const appointment =
    list.find(
      item => item.id === id
    );


  if (!appointment) return;


  const confirmed =
    confirm(
      "Deseja realmente cancelar esta consulta?"
    );


  if (!confirmed) return;


  appointment.status =
    "cancelled";


  saveAppointments(list);


  renderAppointments();


  toast(
    "Consulta cancelada. O horário foi liberado."
  );

}


// ============================================================
// REAGENDAR
// ============================================================

function rescheduleAppointment(id) {

  const list =
    getAppointments();


  const appointment =
    list.find(
      item => item.id === id
    );


  if (!appointment) return;


  state.ubs =
    UBS.find(
      ubs =>
        ubs.id === appointment.ubsId
    );


  state.specialty =
    SPECIALTIES.find(
      specialty =>
        specialty.id ===
        appointment.specialtyId
    );


  // Cancela o antigo
  appointment.status =
    "cancelled";


  saveAppointments(list);


  $("specialtyTitle").textContent =
    `Especialidade — ${state.ubs.name}`;


  $("scheduleSubtitle").textContent =
    `${state.ubs.name} • ${state.specialty.name}`;


  buildCalendar();


  showSection(
    "scheduleSection"
  );


  toast(
    "Escolha uma nova data e horário."
  );

}


// ============================================================
// FUNCIONÁRIOS
// ============================================================

function mergedEmployees(ubs) {

  const employees =
    getEmployees()[ubs.id] || [];


  return [
    ...ubs.employees,
    ...employees
  ];

}


// ============================================================
// INFORMAÇÕES DAS UBS
// ============================================================

function renderInfo() {

  const tabs =
    $("infoTabs");


  if (!tabs) return;


  tabs.innerHTML =
    UBS.map(
      ubs => `

        <button
          class="tab ${
            ubs.id ===
            state.infoUBS.id
              ? "active"
              : ""
          }"
          data-info="${ubs.id}"
        >
          ${ubs.name}
        </button>

      `
    ).join("");


  document
    .querySelectorAll("[data-info]")
    .forEach(button => {

      button.onclick = () => {

        state.infoUBS =
          UBS.find(
            ubs =>
              ubs.id ===
              button.dataset.info
          );


        renderInfo();

      };

    });


  const ubs =
    state.infoUBS;


  $("infoContent").innerHTML = `

    <div class="info-grid">

      <div class="info-box">

        <h3>
          🕐 Horário de funcionamento
        </h3>

        <p>
          ${ubs.hours}
        </p>

      </div>


      <div class="info-box">

        <h3>
          ☎ Contato
        </h3>

        <p>

          ${ubs.phone}

          <br>

          ${ubs.address}

        </p>

      </div>


      <div class="info-box">

        <h3>
          💉 Campanhas vigentes
        </h3>

        <ul>

          ${ubs.campaigns
            .map(
              campaign =>
                `<li>${campaign}</li>`
            )
            .join("")}

        </ul>

      </div>


      <div class="info-box">

        <h3>
          📄 Documentos
        </h3>

        <ul>

          ${ubs.docs
            .map(
              doc =>
                `<li>${doc}</li>`
            )
            .join("")}

        </ul>

      </div>


      <div
        class="info-box"
        style="grid-column:1/-1"
      >

        <h3>
          👩‍⚕️ Funcionários
        </h3>

        <div class="employee-list">

          ${mergedEmployees(ubs)
            .map(
              employee => `

                <div class="employee">

                  <strong>
                    ${escapeHTML(
                      employee[0]
                    )}
                  </strong>

                  <span>
                    ${escapeHTML(
                      employee[1]
                    )}
                  </span>

                </div>

              `
            )
            .join("")}

        </div>

      </div>

    </div>

  `;

}


// ============================================================
// PAINEL DA UBS
// ============================================================

function fillPanelSelects() {

  const options =
    UBS.map(
      ubs => `

        <option value="${ubs.id}">
          ${ubs.name}
        </option>

      `
    ).join("");


  $("panelUBS").innerHTML =
    options;


  $("employeeUBS").innerHTML =
    options;


  $("panelSpecialty").innerHTML =
    `

      <option value="all">
        Todas
      </option>

      ${
        SPECIALTIES
          .map(
            specialty => `

              <option
                value="${specialty.id}"
              >
                ${specialty.name}
              </option>

            `
          )
          .join("")
      }

    `;


  $("panelDate").value =
    todayISO();

}


// ============================================================
// DASHBOARD
// ============================================================

function renderDashboard() {

  const ubsId =
    $("panelUBS").value;


  const date =
    $("panelDate").value;


  const specialty =
    $("panelSpecialty").value;


  const period =
    $("panelPeriod").value;


  let list =
    getAppointments().filter(
      appointment =>

        appointment.status ===
          "scheduled" &&

        appointment.ubsId ===
          ubsId
    );


  if (date) {

    list =
      list.filter(
        appointment =>
          appointment.date === date
      );

  }


  if (specialty !== "all") {

    list =
      list.filter(
        appointment =>
          appointment.specialtyId ===
          specialty
      );

  }


  if (period !== "all") {

    list =
      list.filter(
        appointment =>
          appointment.period ===
          period
      );

  }


  list.sort(
    (a, b) =>
      a.time.localeCompare(b.time)
  );


  const total =
    list.length;


  const morning =
    list.filter(
      appointment =>
        appointment.period ===
        "manha"
    ).length;


  const afternoon =
    list.filter(
      appointment =>
        appointment.period ===
        "tarde"
    ).length;


  const available =
    10 -
    Math.max(
      morning,
      afternoon
    );


  $("dashboardStats").innerHTML = `

    <div class="stat">

      <b>
        ${total}
      </b>

      <span>
        Consultas filtradas
      </span>

    </div>


    <div class="stat">

      <b>
        ${morning}/10
      </b>

      <span>
        Manhã
      </span>

    </div>


    <div class="stat">

      <b>
        ${afternoon}/10
      </b>

      <span>
        Tarde
      </span>

    </div>


    <div class="stat">

      <b>
        ${Math.max(
          0,
          available
        )}
      </b>

      <span>
        Vagas livres
      </span>

    </div>

  `;


  if (!list.length) {

    $("panelAppointments").innerHTML = `

      <div class="empty">

        Nenhuma consulta encontrada
        para os filtros.

      </div>

    `;

    return;

  }


  $("panelAppointments").innerHTML =
    list
      .map(
        appointment => `

          <div class="appointment">

            <div class="appointment-header">

              <div>

                <strong>

                  ${escapeHTML(
                    appointment.time
                  )}

                  —

                  ${escapeHTML(
                    appointment.name
                  )}

                </strong>

                <br>

                ${escapeHTML(
                  appointment.specialtyName
                )}

                •

                ${
                  appointment.period ===
                  "manha"
                    ? "Manhã"
                    : "Tarde"
                }

                <br>

                Cartão SUS:

                ${escapeHTML(
                  appointment.sus
                )}

              </div>


              <span class="status">

                CONFIRMADA

              </span>

            </div>


            <div class="appointment-actions">

              <button
                class="small-btn danger"
                data-panel-cancel="${appointment.id}"
              >

                Cancelar consulta

              </button>

            </div>

          </div>

        `
      )
      .join("");


  document
    .querySelectorAll(
      "[data-panel-cancel]"
    )
    .forEach(button => {

      button.onclick = () =>

        panelCancel(
          button.dataset.panelCancel
        );

    });

}


// ============================================================
// CANCELAR PELO PAINEL
// ============================================================

function panelCancel(id) {

  const list =
    getAppointments();


  const appointment =
    list.find(
      item => item.id === id
    );


  if (!appointment) return;


  const confirmed =
    confirm(
      `Cancelar a consulta de ${appointment.name}?`
    );


  if (!confirmed) return;


  appointment.status =
    "cancelled";


  saveAppointments(list);


  renderDashboard();

  renderAppointments();


  toast(
    "Consulta cancelada pela UBS."
  );

}


// ============================================================
// LISTA DE FUNCIONÁRIOS
// ============================================================

function renderEmployees() {

  const ubs =
    UBS.find(
      item =>
        item.id ===
        $("employeeUBS").value
    );


  if (!ubs) return;


  $("employeeList").innerHTML =
    mergedEmployees(ubs)
      .map(
        employee => `

          <div class="employee">

            <strong>
              ${escapeHTML(
                employee[0]
              )}
            </strong>

            <span>
              ${escapeHTML(
                employee[1]
              )}
            </span>

          </div>

        `
      )
      .join("");

}


// ============================================================
// CADASTRO DO PACIENTE
// ============================================================

$("patientForm").onsubmit = event => {

  event.preventDefault();


  const name =
    $("name").value.trim();


  const phone =
    $("phone").value.trim();


  const sus =
    $("sus").value
      .replace(/\D/g, "");


  if (
    name.split(/\s+/).length < 2
  ) {

    toast(
      "Digite nome e sobrenome."
    );

    return;

  }


  if (sus.length < 8) {

    toast(
      "Digite um Cartão SUS válido."
    );

    return;

  }


  state.patient = {

    name,

    phone,

    sus

  };


  $("userGreeting").textContent =
    `Olá, ${name.split(" ")[0]}`;


  $("userGreeting")
    .classList
    .remove("hidden");


  renderUBS();

  renderAppointments();


  showSection(
    "ubsSection"
  );

};


// ============================================================
// MÁSCARA DO TELEFONE
// ============================================================

$("phone").oninput = event => {

  let value =
    event.target.value
      .replace(/\D/g, "")
      .slice(0, 11);


  if (value.length > 6) {

    event.target.value =
      `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;

  }

  else if (value.length > 2) {

    event.target.value =
      `(${value.slice(0, 2)}) ${value.slice(2)}`;

  }

  else {

    event.target.value =
      value;

  }

};


// ============================================================
// CARTÃO SUS
// ============================================================

$("sus").oninput = event => {

  event.target.value =
    event.target.value
      .replace(/\D/g, "")
      .slice(0, 15);

};


// ============================================================
// BOTÕES VOLTAR
// ============================================================

document
  .querySelectorAll(".back-btn")
  .forEach(button => {

    button.onclick = () => {

      showSection(
        button.dataset.target
      );

    };

  });


// ============================================================
// MEUS AGENDAMENTOS
// ============================================================

$("goAppointments").onclick = () => {

  renderAppointments();


  $("appointmentsSection")
    .scrollIntoView({
      behavior: "smooth"
    });

};


$("myAppointmentsBtn").onclick = () => {

  if (!state.patient) {

    toast(
      "Faça seu cadastro primeiro."
    );


    $("patientCard")
      .scrollIntoView({
        behavior: "smooth"
      });


    return;

  }


  renderAppointments();


  $("appointmentsSection")
    .scrollIntoView({
      behavior: "smooth"
    });

};


// ============================================================
// FECHAR MODAIS
// ============================================================

document
  .querySelectorAll("[data-close]")
  .forEach(button => {

    button.onclick = () => {

      const modal =
        $(button.dataset.close);


      if (modal) {

        modal.classList.add(
          "hidden"
        );

      }

    };

  });


// ============================================================
// LOGIN DO FUNCIONÁRIO
// ============================================================

$("staffLoginBtn").onclick = () => {

  $("loginModal")
    .classList
    .remove("hidden");


  $("loginUser").focus();

};


// ============================================================
// FORMULÁRIO DE LOGIN
// ============================================================

$("loginForm").onsubmit = event => {

  event.preventDefault();


  const username =
    $("loginUser")
      .value
      .trim();


  const password =
    $("loginPass")
      .value;


  if (
    username === "admin" &&
    password === "1234"
  ) {

    $("loginModal")
      .classList
      .add("hidden");


    $("panelModal")
      .classList
      .remove("hidden");


    fillPanelSelects();

    renderDashboard();

    renderEmployees();


  }

  else {

    toast(
      "Usuário ou senha incorretos. Use admin / 1234."
    );

  }

};


// ============================================================
// LOGOUT
// ============================================================

$("logoutBtn").onclick = () => {

  $("panelModal")
    .classList
    .add("hidden");


  toast(
    "Sessão encerrada."
  );

};


// ============================================================
// ABAS DO PAINEL
// ============================================================

document
  .querySelectorAll(".panel-tab")
  .forEach(tab => {

    tab.onclick = () => {

      document
        .querySelectorAll(".panel-tab")
        .forEach(item =>
          item.classList.remove(
            "active"
          )
        );


      tab.classList.add(
        "active"
      );


      const panel =
        tab.dataset.panel;


      $("dashboardPanel")
        .classList
        .toggle(
          "hidden",
          panel !== "dashboard"
        );


      $("employeesPanel")
        .classList
        .toggle(
          "hidden",
          panel !== "employees"
        );


      if (
        panel === "dashboard"
      ) {

        renderDashboard();

      }

      else {

        renderEmployees();

      }

    };

  });


// ============================================================
// FILTROS DO PAINEL
// ============================================================

[
  "panelUBS",
  "panelDate",
  "panelSpecialty",
  "panelPeriod"

].forEach(id => {

  const element = $(id);

  if (!element) return;


  element.addEventListener(
    "change",
    renderDashboard
  );

});


$("employeeUBS").onchange =
  renderEmployees;


// ============================================================
// CADASTRAR FUNCIONÁRIO
// ============================================================

$("employeeForm").onsubmit =
  event => {

    event.preventDefault();


    const name =
      $("employeeName")
        .value
        .trim();


    const role =
      $("employeeRole")
        .value
        .trim();


    const ubsId =
      $("employeeUBS")
        .value;


    if (!name || !role) {

      toast(
        "Preencha nome e função."
      );

      return;

    }


    const data =
      getEmployees();


    if (!data[ubsId]) {

      data[ubsId] = [];

    }


    data[ubsId].push([
      name,
      role
    ]);


    saveEmployees(data);


    $("employeeForm").reset();


    $("employeeUBS").value =
      ubsId;


    renderEmployees();

    renderInfo();


    toast(
      "Funcionário cadastrado com sucesso."
    );

  };


// ============================================================
// INICIALIZAÇÃO
// ============================================================

fillPanelSelects();

renderUBS();

renderInfo();
