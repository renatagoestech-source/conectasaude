/* ============================================================
   CONECTA SAÚDE
   JAVASCRIPT - VERSÃO ATUALIZADA
============================================================ */


/* ============================================================
   CONFIGURAÇÕES INICIAIS
============================================================ */

const STORAGE = {
    UBS: "conectaSaudeUBSV3",
    APPOINTMENTS: "conectaSaudeAppointmentsV3",
    SESSION: "conectaSaudeSessionV3"
};


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


/* ============================================================
   DADOS INICIAIS
============================================================ */

const DEFAULT_UBS = [

    {
        id: "A",
        name: "UBS A",

        address: "Rua da Saúde, 100",

        phone: "(87) 3333-1001",

        hours: "Segunda a sexta, 07h às 17h",

        docs: [
            "Cartão SUS",
            "Documento de identificação com foto",
            "Comprovante de residência, quando solicitado"
        ],

        campaigns: [
            "Vacinação contra Influenza",
            "Atualização da caderneta de vacinação",
            "Prevenção de hipertensão e diabetes"
        ],

        specialties: [
            {
                id: "clinico",
                name: "Clínico geral",
                icon: "🩺",
                description: "Avaliação e acompanhamento de saúde."
            },
            {
                id: "dentista",
                name: "Dentista",
                icon: "🦷",
                description: "Atendimento e orientação em saúde bucal."
            },
            {
                id: "enfermagem",
                name: "Enfermeira",
                icon: "🩹",
                description: "Consultas e orientações de enfermagem."
            }
        ],

        employees: [
            {
                id: "A1",
                name: "Mariana Alves",
                role: "Enfermeira responsável"
            },
            {
                id: "A2",
                name: "Carlos Lima",
                role: "Clínico geral"
            },
            {
                id: "A3",
                name: "Joana Martins",
                role: "Dentista"
            },
            {
                id: "A4",
                name: "Rafael Souza",
                role: "Recepcionista"
            }
        ],

        admin: {
            user: "adminA",
            password: "1234"
        }

    },


    {
        id: "C",
        name: "UBS C",

        address: "Av. Esperança, 250",

        phone: "(87) 3333-1003",

        hours: "Segunda a sexta, 07h às 17h",

        docs: [
            "Cartão SUS",
            "Documento de identificação",
            "Comprovante de residência, quando solicitado"
        ],

        campaigns: [
            "Vacinação contra Influenza",
            "Vacinação de rotina para crianças",
            "Campanha de saúde da mulher"
        ],

        specialties: [
            {
                id: "clinico",
                name: "Clínico geral",
                icon: "🩺",
                description: "Avaliação e acompanhamento de saúde."
            },
            {
                id: "dentista",
                name: "Dentista",
                icon: "🦷",
                description: "Atendimento e orientação em saúde bucal."
            },
            {
                id: "enfermagem",
                name: "Enfermeira",
                icon: "🩹",
                description: "Consultas e orientações de enfermagem."
            }
        ],

        employees: [
            {
                id: "C1",
                name: "Patrícia Gomes",
                role: "Enfermeira"
            },
            {
                id: "C2",
                name: "André Costa",
                role: "Clínico geral"
            },
            {
                id: "C3",
                name: "Luciana Melo",
                role: "Dentista"
            },
            {
                id: "C4",
                name: "Bruno Reis",
                role: "Agente administrativo"
            }
        ],

        admin: {
            user: "adminC",
            password: "1234"
        }

    },


    {
        id: "D",
        name: "UBS D",

        address: "Rua das Flores, 45",

        phone: "(87) 3333-1004",

        hours: "Segunda a sexta, 08h às 18h",

        docs: [
            "Cartão SUS",
            "Documento com foto",
            "Receitas e exames anteriores, se relacionados à consulta"
        ],

        campaigns: [
            "Vacinação contra Influenza",
            "Prevenção e controle da dengue",
            "Acompanhamento de hipertensão"
        ],

        specialties: [
            {
                id: "clinico",
                name: "Clínico geral",
                icon: "🩺",
                description: "Avaliação e acompanhamento de saúde."
            },
            {
                id: "dentista",
                name: "Dentista",
                icon: "🦷",
                description: "Atendimento e orientação em saúde bucal."
            },
            {
                id: "enfermagem",
                name: "Enfermeira",
                icon: "🩹",
                description: "Consultas e orientações de enfermagem."
            }
        ],

        employees: [
            {
                id: "D1",
                name: "Fernanda Rocha",
                role: "Médica clínica geral"
            },
            {
                id: "D2",
                name: "Diego Nunes",
                role: "Enfermeiro"
            },
            {
                id: "D3",
                name: "Camila Freire",
                role: "Dentista"
            },
            {
                id: "D4",
                name: "Paulo Santos",
                role: "Recepcionista"
            }
        ],

        admin: {
            user: "adminD",
            password: "1234"
        }

    },


    {
        id: "E",
        name: "UBS E",

        address: "Praça do Cuidado, 80",

        phone: "(87) 3333-1005",

        hours: "Segunda a sexta, 07h às 16h",

        docs: [
            "Cartão SUS",
            "Documento de identificação",
            "Caderneta de vacinação, quando aplicável"
        ],

        campaigns: [
            "Vacinação de rotina",
            "Saúde do idoso",
            "Orientação sobre alimentação saudável"
        ],

        specialties: [
            {
                id: "clinico",
                name: "Clínico geral",
                icon: "🩺",
                description: "Avaliação e acompanhamento de saúde."
            },
            {
                id: "dentista",
                name: "Dentista",
                icon: "🦷",
                description: "Atendimento e orientação em saúde bucal."
            },
            {
                id: "enfermagem",
                name: "Enfermeira",
                icon: "🩹",
                description: "Consultas e orientações de enfermagem."
            }
        ],

        employees: [
            {
                id: "E1",
                name: "Renata Moura",
                role: "Enfermeira"
            },
            {
                id: "E2",
                name: "Fábio Castro",
                role: "Clínico geral"
            },
            {
                id: "E3",
                name: "Aline Dias",
                role: "Dentista"
            },
            {
                id: "E4",
                name: "Márcio Lopes",
                role: "Agente comunitário"
            }
        ],

        admin: {
            user: "adminE",
            password: "1234"
        }

    },


    {
        id: "F",
        name: "UBS F",

        address: "Av. Vida Nova, 310",

        phone: "(87) 3333-1006",

        hours: "Segunda a sexta, 07h às 17h",

        docs: [
            "Cartão SUS",
            "Documento com foto",
            "Exames anteriores, se houver"
        ],

        campaigns: [
            "Vacinação contra Influenza",
            "Prevenção do câncer do colo do útero",
            "Combate ao tabagismo"
        ],

        specialties: [
            {
                id: "clinico",
                name: "Clínico geral",
                icon: "🩺",
                description: "Avaliação e acompanhamento de saúde."
            },
            {
                id: "dentista",
                name: "Dentista",
                icon: "🦷",
                description: "Atendimento e orientação em saúde bucal."
            },
            {
                id: "enfermagem",
                name: "Enfermeira",
                icon: "🩹",
                description: "Consultas e orientações de enfermagem."
            }
        ],

        employees: [
            {
                id: "F1",
                name: "Bianca Ferreira",
                role: "Enfermeira responsável"
            },
            {
                id: "F2",
                name: "Gustavo Oliveira",
                role: "Clínico geral"
            },
            {
                id: "F3",
                name: "Sofia Ramos",
                role: "Dentista"
            },
            {
                id: "F4",
                name: "Leandro Melo",
                role: "Recepcionista"
            }
        ],

        admin: {
            user: "adminF",
            password: "1234"
        }

    }

];


/* ============================================================
   ESTADO
============================================================ */

let ubsList = loadUBS();

let appointments = loadAppointments();

let patient = null;

let selectedUBS = null;

let selectedSpecialty = null;

let selectedDate = null;

let selectedTime = null;

let calendarDate = new Date();

let loggedUser = null;

let adminUBS = null;


/* ============================================================
   ELEMENTOS
============================================================ */

const $ = (id) => document.getElementById(id);


/* ============================================================
   LOCAL STORAGE
============================================================ */

function loadUBS() {

    const saved = localStorage.getItem(STORAGE.UBS);

    if (!saved) {

        localStorage.setItem(
            STORAGE.UBS,
            JSON.stringify(DEFAULT_UBS)
        );

        return structuredClone(DEFAULT_UBS);
    }

    try {

        return JSON.parse(saved);

    } catch {

        localStorage.setItem(
            STORAGE.UBS,
            JSON.stringify(DEFAULT_UBS)
        );

        return structuredClone(DEFAULT_UBS);
    }
}


function saveUBS() {

    localStorage.setItem(
        STORAGE.UBS,
        JSON.stringify(ubsList)
    );
}


function loadAppointments() {

    const saved =
        localStorage.getItem(
            STORAGE.APPOINTMENTS
        );

    if (!saved) {
        return [];
    }

    try {

        return JSON.parse(saved);

    } catch {

        return [];
    }
}


function saveAppointments() {

    localStorage.setItem(
        STORAGE.APPOINTMENTS,
        JSON.stringify(appointments)
    );
}


/* ============================================================
   UTILIDADES
============================================================ */

function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function generateId(prefix = "ID") {

    return (
        prefix +
        "_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );
}


function showToast(message) {

    const toast = $("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);
}


function openModal(id) {

    $(id).classList.remove("hidden");
}


function closeModal(id) {

    $(id).classList.add("hidden");
}


function formatDate(date) {

    const [year, month, day] =
        date.split("-");

    return `${day}/${month}/${year}`;
}


function todayString() {

    const date = new Date();

    const y =
        date.getFullYear();

    const m =
        String(date.getMonth() + 1)
            .padStart(2, "0");

    const d =
        String(date.getDate())
            .padStart(2, "0");

    return `${y}-${m}-${d}`;
}


function addDays(date, amount) {

    const result = new Date(date);

    result.setDate(
        result.getDate() + amount
    );

    return result;
}


function dateToString(date) {

    const y =
        date.getFullYear();

    const m =
        String(date.getMonth() + 1)
            .padStart(2, "0");

    const d =
        String(date.getDate())
            .padStart(2, "0");

    return `${y}-${m}-${d}`;
}


function capitalize(text) {

    if (!text) return "";

    return text.charAt(0).toUpperCase() +
        text.slice(1);
}


/* ============================================================
   MÁSCARAS
============================================================ */

$("phone").addEventListener(
    "input",
    function () {

        let value =
            this.value.replace(/\D/g, "");

        value =
            value.substring(0, 11);

        if (value.length <= 10) {

            value = value.replace(
                /^(\d{2})(\d)/,
                "($1) $2"
            );

            value = value.replace(
                /(\d{4})(\d)/,
                "$1-$2"
            );

        } else {

            value = value.replace(
                /^(\d{2})(\d)/,
                "($1) $2"
            );

            value = value.replace(
                /(\d{5})(\d)/,
                "$1-$2"
            );
        }

        this.value = value;
    }
);


$("sus").addEventListener(
    "input",
    function () {

        this.value =
            this.value
                .replace(/\D/g, "")
                .substring(0, 15);
    }
);


/* ============================================================
   UBS
============================================================ */

function renderUBS() {

    const grid = $("ubsGrid");

    grid.innerHTML = "";

    ubsList.forEach(ubs => {

        const card =
            document.createElement("div");

        card.className =
            "ubs-card" +
            (
                selectedUBS?.id === ubs.id
                    ? " selected"
                    : ""
            );

        card.innerHTML = `

            <div class="ubs-card-header">

                <h3>
                    ${escapeHTML(ubs.name)}
                </h3>

                <span class="ubs-badge">
                    UBS
                </span>

            </div>

            <p>
                📍 ${escapeHTML(ubs.address)}
            </p>

            <p>
                ☎️ ${escapeHTML(ubs.phone)}
            </p>

            <p>
                🕐 ${escapeHTML(ubs.hours)}
            </p>

        `;

        card.addEventListener(
            "click",
            () => selectUBS(ubs.id)
        );

        grid.appendChild(card);

    });
}


function selectUBS(id) {

    selectedUBS =
        ubsList.find(
            item => item.id === id
        );

    if (!selectedUBS) return;

    selectedSpecialty = null;

    selectedDate = null;

    selectedTime = null;

    renderUBS();

    renderSpecialties();

    showSection("specialtySection");

    renderInfo();

    $("infoSection")
        .classList.remove("hidden");

    updateSteps(2);

    $("specialtySection")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ============================================================
   ESPECIALIDADES
============================================================ */

function renderSpecialties() {

    if (!selectedUBS) return;

    $("specialtyTitle").textContent =
        `Especialidade - ${selectedUBS.name}`;

    const grid =
        $("specialtyGrid");

    grid.innerHTML = "";

    selectedUBS.specialties
        .forEach(specialty => {

            const card =
                document.createElement("div");

            card.className =
                "specialty-card" +
                (
                    selectedSpecialty?.id ===
                    specialty.id
                        ? " selected"
                        : ""
                );

            card.innerHTML = `

                <div class="specialty-icon">
                    ${escapeHTML(
                        specialty.icon || "🩺"
                    )}
                </div>

                <h3>
                    ${escapeHTML(
                        specialty.name
                    )}
                </h3>

                <p>
                    ${escapeHTML(
                        specialty.description || ""
                    )}
                </p>

            `;

            card.addEventListener(
                "click",
                () => selectSpecialty(
                    specialty.id
                )
            );

            grid.appendChild(card);

        });
}


function selectSpecialty(id) {

    selectedSpecialty =
        selectedUBS.specialties.find(
            item => item.id === id
        );

    if (!selectedSpecialty) return;

    renderSpecialties();

    $("scheduleSection")
        .classList.remove("hidden");

    renderCalendar();

    updateSteps(3);

    $("scheduleSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ============================================================
   CALENDÁRIO
============================================================ */

const WEEK_DAYS = [
    "Dom",
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sáb"
];


const MONTHS = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];


function isHoliday(date) {

    const year =
        date.getFullYear();

    const month =
        date.getMonth() + 1;

    const day =
        date.getDate();


    const fixed = [
        `${year}-01-01`,
        `${year}-04-21`,
        `${year}-05-01`,
        `${year}-09-07`,
        `${year}-10-12`,
        `${year}-11-02`,
        `${year}-11-15`,
        `${year}-12-25`
    ];

    return fixed.includes(
        dateToString(date)
    );
}


function isUnavailableDate(date) {

    const day =
        date.getDay();

    if (day === 0 || day === 6) {
        return true;
    }

    if (isHoliday(date)) {
        return true;
    }

    const min =
        new Date();

    min.setHours(0, 0, 0, 0);

    if (date < min) {
        return true;
    }

    const max =
        addDays(new Date(), 90);

    if (date > max) {
        return true;
    }

    return false;
}


function renderCalendar() {

    if (!selectedUBS ||
        !selectedSpecialty) {
        return;
    }

    const calendar =
        $("calendar");

    calendar.innerHTML = "";

    const year =
        calendarDate.getFullYear();

    const month =
        calendarDate.getMonth();

    $("calendarTitle").textContent =
        `${MONTHS[month]} ${year}`;


    WEEK_DAYS.forEach(day => {

        const el =
            document.createElement("div");

        el.className =
            "calendar-day-name";

        el.textContent = day;

        calendar.appendChild(el);

    });


    const firstDay =
        new Date(year, month, 1)
            .getDay();

    const totalDays =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const empty =
            document.createElement("div");

        calendar.appendChild(empty);
    }


    for (
        let day = 1;
        day <= totalDays;
        day++
    ) {

        const date =
            new Date(
                year,
                month,
                day
            );

        const dateString =
            dateToString(date);

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "calendar-day";

        button.textContent = day;


        if (
            dateString ===
            todayString()
        ) {

            button.classList.add(
                "today"
            );
        }


        if (
            selectedDate ===
            dateString
        ) {

            button.classList.add(
                "selected"
            );
        }


        if (
            isUnavailableDate(date)
        ) {

            button.disabled = true;

        } else {

            button.addEventListener(
                "click",
                () => selectDate(
                    dateString
                )
            );

        }

        calendar.appendChild(button);
    }
}


function selectDate(date) {

    selectedDate = date;

    selectedTime = null;

    renderCalendar();

    $("selectedDateLabel")
        .textContent =
        formatDate(date);

    renderTimes();

    updateSteps(4);
}


$("prevMonth").addEventListener(
    "click",
    () => {

        calendarDate.setMonth(
            calendarDate.getMonth() - 1
        );

        renderCalendar();
    }
);


$("nextMonth").addEventListener(
    "click",
    () => {

        calendarDate.setMonth(
            calendarDate.getMonth() + 1
        );

        renderCalendar();
    }
);


/* ============================================================
   HORÁRIOS
============================================================ */

function appointmentExists(
    date,
    time
) {

    return appointments.some(
        appointment =>
            appointment.status ===
            "confirmed" &&

            appointment.ubsId ===
            selectedUBS.id &&

            appointment.specialtyId ===
            selectedSpecialty.id &&

            appointment.date === date &&

            appointment.time === time
    );
}


function renderTimes() {

    if (!selectedDate) return;

    renderTimeGroup(
        "morningSlots",
        TIMES.manha,
        "manha"
    );

    renderTimeGroup(
        "afternoonSlots",
        TIMES.tarde,
        "tarde"
    );
}


function renderTimeGroup(
    elementId,
    times,
    period
) {

    const container =
        $(elementId);

    container.innerHTML = "";

    times.forEach(time => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "time-btn";

        button.textContent = time;


        const occupied =
            appointmentExists(
                selectedDate,
                time
            );


        if (
            occupied ||
            selectedTime === time
        ) {

            if (occupied) {
                button.disabled = true;
            }

            if (
                selectedTime === time
            ) {

                button.classList.add(
                    "selected"
                );
            }
        }


        button.addEventListener(
            "click",
            () => {

                selectedTime = time;

                renderTimes();

                bookAppointment();
            }
        );


        container.appendChild(button);

    });
}


/* ============================================================
   AGENDAMENTO
============================================================ */

function bookAppointment() {

    if (
        !patient ||
        !selectedUBS ||
        !selectedSpecialty ||
        !selectedDate ||
        !selectedTime
    ) {

        return;
    }


    const duplicate =
        appointments.find(
            appointment =>

                appointment.sus ===
                patient.sus &&

                appointment.status ===
                "confirmed" &&

                appointment.ubsId ===
                selectedUBS.id &&

                appointment.specialtyId ===
                selectedSpecialty.id &&

                appointment.date ===
                selectedDate
        );


    if (duplicate) {

        showToast(
            "Você já possui uma consulta para esta especialidade nessa data."
        );

        return;
    }


    if (
        appointmentExists(
            selectedDate,
            selectedTime
        )
    ) {

        showToast(
            "Este horário acabou de ser ocupado."
        );

        renderTimes();

        return;
    }


    const queue =
        calculateQueuePosition(
            selectedDate,
            selectedTime
        );


    const appointment = {

        id: generateId("CONS"),

        patientName:
            patient.name,

        phone:
            patient.phone,

        sus:
            patient.sus,

        ubsId:
            selectedUBS.id,

        specialtyId:
            selectedSpecialty.id,

        specialtyName:
            selectedSpecialty.name,

        date:
            selectedDate,

        time:
            selectedTime,

        period:
            getPeriod(selectedTime),

        queue,

        status:
            "confirmed",

        reminder:
            false,

        createdAt:
            new Date().toISOString()

    };


    appointments.push(
        appointment
    );

    saveAppointments();


    showConfirmation(
        appointment
    );
}


function calculateQueuePosition(
    date,
    time
) {

    const sameDay =
        appointments.filter(
            appointment =>

                appointment.status ===
                "confirmed" &&

                appointment.ubsId ===
                selectedUBS.id &&

                appointment.specialtyId ===
                selectedSpecialty.id &&

                appointment.date ===
                date
        );


    const earlier =
        sameDay.filter(
            appointment =>
                appointment.time < time
        );


    return earlier.length + 1;
}


function getPeriod(time) {

    return (
        TIMES.manha.includes(time)
            ? "manha"
            : "tarde"
    );
}


function showConfirmation(
    appointment
) {

    $("confirmationSection")
        .classList.remove("hidden");

    $("confirmationText").innerHTML = `

        Sua consulta foi agendada para
        <strong>
            ${formatDate(
                appointment.date
            )}
        </strong>
        às
        <strong>
            ${appointment.time}
        </strong>.

        <br>

        ${escapeHTML(
            appointment.specialtyName
        )}
        na
        ${escapeHTML(
            selectedUBS.name
        )}.

    `;


    $("queueBox").innerHTML = `

        Sua posição na fila é:

        <span class="queue-number">
            ${appointment.queue}º
        </span>

        <small>
            Horário reservado:
            ${appointment.time}
        </small>

    `;


    updateSteps(5);


    $("confirmationSection")
        .scrollIntoView({
            behavior: "smooth"
        });


    requestNotificationPermission();
}


/* ============================================================
   PACIENTE
============================================================ */

$("patientForm").addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const name =
            $("name")
                .value
                .trim();

        const phone =
            $("phone")
                .value
                .trim();

        const sus =
            $("sus")
                .value
                .trim();


        if (name.length < 5) {

            showToast(
                "Informe o nome completo."
            );

            return;
        }


        if (
            phone.replace(/\D/g, "")
                .length < 10
        ) {

            showToast(
                "Informe um celular válido."
            );

            return;
        }


        if (sus.length < 8) {

            showToast(
                "Informe um Cartão SUS válido."
            );

            return;
        }


        patient = {
            name,
            phone,
            sus
        };


        $("ubsSection")
            .classList.remove("hidden");

        renderUBS();

        updateSteps(1);

        $("ubsSection")
            .scrollIntoView({
                behavior: "smooth"
            });

        showToast(
            `Cadastro realizado, ${name.split(" ")[0]}!`
        );
    }
);


/* ============================================================
   SEÇÕES
============================================================ */

function showSection(id) {

    $(id)
        .classList.remove("hidden");
}


function updateSteps(number) {

    const steps =
        document.querySelectorAll(
            ".step"
        );

    steps.forEach(
        (step, index) => {

            const stepNumber =
                index + 1;

            step.classList.remove(
                "active",
                "completed"
            );

            if (
                stepNumber < number
            ) {

                step.classList.add(
                    "completed"
                );

            } else if (
                stepNumber === number
            ) {

                step.classList.add(
                    "active"
                );
            }
        }
    );
}


/* ============================================================
   INFORMAÇÕES UBS
============================================================ */

function renderInfo(
    type = "dados"
) {

    if (!selectedUBS) return;

    const content =
        $("infoContent");

    if (type === "dados") {

        content.innerHTML = `

            <div class="info-content">

                <div class="info-item">
                    <strong>
                        🏥 Unidade
                    </strong>

                    <span>
                        ${escapeHTML(
                            selectedUBS.name
                        )}
                    </span>
                </div>

                <div class="info-item">
                    <strong>
                        📍 Endereço
                    </strong>

                    <span>
                        ${escapeHTML(
                            selectedUBS.address
                        )}
                    </span>
                </div>

                <div class="info-item">
                    <strong>
                        ☎️ Telefone
                    </strong>

                    <span>
                        ${escapeHTML(
                            selectedUBS.phone
                        )}
                    </span>
                </div>

                <div class="info-item">
                    <strong>
                        🕐 Funcionamento
                    </strong>

                    <span>
                        ${escapeHTML(
                            selectedUBS.hours
                        )}
                    </span>
                </div>

            </div>

        `;

    }


    if (type === "funcionarios") {

        content.innerHTML = `

            <div class="info-content">

                ${selectedUBS.employees
                    .map(employee => `

                        <div class="info-item">

                            <strong>
                                👤 ${escapeHTML(
                                    employee.name
                                )}
                            </strong>

                            <span>
                                ${escapeHTML(
                                    employee.role
                                )}
                            </span>

                        </div>

                    `)
                    .join("")}

            </div>

        `;

    }


    if (type === "especialidades") {

        content.innerHTML = `

            <div class="info-content">

                ${selectedUBS.specialties
                    .map(specialty => `

                        <div class="info-item">

                            <strong>
                                ${escapeHTML(
                                    specialty.icon || "🩺"
                                )}
                                ${escapeHTML(
                                    specialty.name
                                )}
                            </strong>

                            <span>
                                ${escapeHTML(
                                    specialty.description || ""
                                )}
                            </span>

                        </div>

                    `)
                    .join("")}

            </div>

        `;

    }


    if (type === "campanhas") {

        content.innerHTML = `

            <div class="info-content">

                ${selectedUBS.campaigns
                    .map(campaign => `

                        <div class="info-item">

                            <strong>
                                📢 Campanha
                            </strong>

                            <span>
                                ${escapeHTML(
                                    campaign
                                )}
                            </span>

                        </div>

                    `)
                    .join("")}

            </div>

        `;

    }


    if (type === "documentos") {

        content.innerHTML = `

            <div class="info-content">

                <div class="info-item">

                    <strong>
                        📋 Documentos necessários
                    </strong>

                    <ul>

                        ${selectedUBS.docs
                            .map(doc => `
                                <li>
                                    ${escapeHTML(doc)}
                                </li>
                            `)
                            .join("")}

                    </ul>

                </div>

            </div>

        `;

    }
}


document
    .querySelectorAll(".info-tab")
    .forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".info-tab"
                    )
                    .forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );

                tab.classList.add(
                    "active"
                );

                renderInfo(
                    tab.dataset.info
                );
            }
        );

    });


/* ============================================================
   MEUS AGENDAMENTOS
============================================================ */

$("myAppointmentsBtn")
    .addEventListener(
        "click",
        () => {

            if (!patient) {

                showToast(
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
                .classList.remove("hidden");

            $("appointmentsSection")
                .scrollIntoView({
                    behavior: "smooth"
                });
        }
    );


$("viewAppointmentsBtn")
    .addEventListener(
        "click",
        () => {

            renderAppointments();

            $("appointmentsSection")
                .classList.remove("hidden");

            $("appointmentsSection")
                .scrollIntoView({
                    behavior: "smooth"
                });
        }
    );


function renderAppointments() {

    const list =
        $("appointmentsList");

    if (!patient) {

        list.innerHTML = `
            <p>
                Informe seus dados para visualizar
                os agendamentos.
            </p>
        `;

        return;
    }


    const mine =
        appointments.filter(
            appointment =>
                appointment.sus ===
                patient.sus
        );


    if (!mine.length) {

        list.innerHTML = `

            <div class="empty-state">

                <p>
                    Você ainda não possui
                    agendamentos.
                </p>

            </div>

        `;

        return;
    }


    list.innerHTML = "";


    mine
        .sort(
            (a, b) =>
                `${a.date} ${a.time}`
                    .localeCompare(
                        `${b.date} ${b.time}`
                    )
        )
        .forEach(
            appointment => {

                const ubs =
                    ubsList.find(
                        item =>
                            item.id ===
                            appointment.ubsId
                    );


                const card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "appointment-card";


                const cancelled =
                    appointment.status ===
                    "cancelled";


                card.innerHTML = `

                    <div class="appointment-top">

                        <div>

                            <div class="appointment-title">
                                ${escapeHTML(
                                    ubs?.name || "UBS"
                                )}
                            </div>

                            <small>
                                ${escapeHTML(
                                    appointment.specialtyName
                                )}
                            </small>

                        </div>

                        <span class="
                            appointment-status
                            ${
                                cancelled
                                    ? "status-cancelled"
                                    : "status-confirmed"
                            }
                        ">

                            ${
                                cancelled
                                    ? "Cancelada"
                                    : "Confirmada"
                            }

                        </span>

                    </div>


                    <div class="appointment-details">

                        <div class="detail">

                            <span>
                                Data
                            </span>

                            <strong>
                                ${formatDate(
                                    appointment.date
                                )}
                            </strong>

                        </div>


                        <div class="detail">

                            <span>
                                Horário
                            </span>

                            <strong>
                                ${appointment.time}
                            </strong>

                        </div>


                        <div class="detail">

                            <span>
                                Fila
                            </span>

                            <strong>
                                ${appointment.queue}º
                            </strong>

                        </div>

                    </div>


                    ${
                        !cancelled
                            ? `
                                <div class="appointment-actions">

                                    <button
                                        class="btn secondary"
                                        data-action="reminder"
                                        data-id="${appointment.id}"
                                    >
                                        ${
                                            appointment.reminder
                                                ? "🔔 Lembrete ativado"
                                                : "🔔 Ativar lembrete"
                                        }
                                    </button>

                                    <button
                                        class="btn secondary"
                                        data-action="reschedule"
                                        data-id="${appointment.id}"
                                    >
                                        🔄 Reagendar
                                    </button>

                                    <button
                                        class="btn danger"
                                        data-action="cancel"
                                        data-id="${appointment.id}"
                                    >
                                        ❌ Cancelar
                                    </button>

                                </div>
                            `
                            : ""
                    }

                `;


                list.appendChild(card);

            }
        );


    list
        .querySelectorAll(
            "[data-action]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const action =
                        button.dataset.action;

                    const id =
                        button.dataset.id;


                    if (
                        action ===
                        "reminder"
                    ) {

                        activateReminder(id);

                    }

                    if (
                        action ===
                        "cancel"
                    ) {

                        cancelAppointment(id);

                    }

                    if (
                        action ===
                        "reschedule"
                    ) {

                        rescheduleAppointment(id);

                    }

                }
            );

        });
}


/* ============================================================
   CANCELAR
============================================================ */

function cancelAppointment(id) {

    const appointment =
        appointments.find(
            item =>
                item.id === id
        );

    if (!appointment) return;


    const confirmed =
        confirm(
            "Deseja realmente cancelar esta consulta?"
        );


    if (!confirmed) return;


    appointment.status =
        "cancelled";


    saveAppointments();

    renderAppointments();

    showToast(
        "Consulta cancelada."
    );
}


/* ============================================================
   REAGENDAR
============================================================ */

function rescheduleAppointment(id) {

    const appointment =
        appointments.find(
            item =>
                item.id === id
        );

    if (!appointment) return;


    const ubs =
        ubsList.find(
            item =>
                item.id ===
                appointment.ubsId
        );


    const specialty =
        ubs.specialties.find(
            item =>
                item.id ===
                appointment.specialtyId
        );


    if (!ubs || !specialty) {

        showToast(
            "Não foi possível localizar a consulta."
        );

        return;
    }


    appointment.status =
        "cancelled";


    saveAppointments();


    selectedUBS = ubs;

    selectedSpecialty = specialty;

    selectedDate = null;

    selectedTime = null;


    renderUBS();

    renderSpecialties();

    renderCalendar();


    $("specialtySection")
        .classList.remove("hidden");

    $("scheduleSection")
        .classList.remove("hidden");

    $("confirmationSection")
        .classList.add("hidden");


    $("scheduleSection")
        .scrollIntoView({
            behavior: "smooth"
        });


    showToast(
        "Escolha a nova data e horário."
    );
}


/* ============================================================
   NOTIFICAÇÕES
============================================================ */

async function requestNotificationPermission() {

    if (
        !("Notification" in window)
    ) {

        showToast(
            "Seu navegador não oferece notificações."
        );

        return false;
    }


    if (
        Notification.permission ===
        "granted"
    ) {

        return true;
    }


    if (
        Notification.permission ===
        "denied"
    ) {

        showToast(
            "As notificações estão bloqueadas no navegador."
        );

        return false;
    }


    try {

        const permission =
            await Notification.requestPermission();

        if (
            permission ===
            "granted"
        ) {

            showToast(
                "Lembretes ativados!"
            );

            return true;
        }

    } catch (error) {

        console.error(error);
    }


    return false;
}


$("notificationBtn")
    .addEventListener(
        "click",
        async () => {

            const granted =
                await requestNotificationPermission();

            if (granted) {

                try {

                    new Notification(
                        "Conecta Saúde",
                        {
                            body:
                                "As notificações de suas consultas foram ativadas.",
                            tag:
                                "conecta-saude-test"
                        }
                    );

                } catch (error) {

                    console.error(error);

                    showToast(
                        "Permissão ativada. No celular, a versão com Service Worker será necessária para notificações persistentes."
                    );
                }
            }

        }
    );


async function activateReminder(id) {

    const appointment =
        appointments.find(
            item =>
                item.id === id
        );

    if (!appointment) return;


    const granted =
        await requestNotificationPermission();


    if (!granted) return;


    appointment.reminder = true;

    saveAppointments();

    renderAppointments();


    showToast(
        "Lembrete ativado para esta consulta."
    );


    try {

        if (
            Notification.permission ===
            "granted"
        ) {

            new Notification(
                "Lembrete ativado",
                {
                    body:
                        `Consulta em ${formatDate(
                            appointment.date
                        )} às ${appointment.time}.`,
                    tag:
                        `appointment-${appointment.id}`
                }
            );
        }

    } catch (error) {

        console.log(
            "Notificação imediata indisponível:",
            error
        );
    }
}


/*
    Verificação local dos lembretes.

    Se o site estiver aberto, o navegador
    poderá exibir o lembrete próximo
    do horário.

    Para notificações com o site fechado,
    é necessário Service Worker + Push.
*/

function checkReminders() {

    if (
        !patient ||
        !("Notification" in window) ||
        Notification.permission !== "granted"
    ) {

        return;
    }


    const now =
        new Date();


    appointments
        .filter(
            appointment =>
                appointment.sus ===
                patient.sus &&

                appointment.status ===
                "confirmed" &&

                appointment.reminder ===
                true
        )
        .forEach(
            appointment => {

                const appointmentDate =
                    new Date(
                        `${appointment.date}T${appointment.time}:00`
                    );


                const difference =
                    appointmentDate.getTime() -
                    now.getTime();


                /*
                    Lembrete entre 30 e 31 minutos
                    antes da consulta.
                */

                const thirtyMinutes =
                    30 * 60 * 1000;


                if (
                    difference <=
                    thirtyMinutes &&

                    difference >
                    thirtyMinutes - 60000
                ) {

                    try {

                        new Notification(
                            "Conecta Saúde - Lembrete",
                            {
                                body:
                                    `Você tem consulta hoje às ${appointment.time}.`,
                                tag:
                                    `reminder-${appointment.id}`
                            }
                        );

                    } catch (error) {

                        console.error(error);
                    }

                }

            }
        );
}


setInterval(
    checkReminders,
    60000
);


/* ============================================================
   NOVO AGENDAMENTO
============================================================ */

$("newAppointmentBtn")
    .addEventListener(
        "click",
        () => {

            selectedUBS = null;

            selectedSpecialty = null;

            selectedDate = null;

            selectedTime = null;


            $("confirmationSection")
                .classList.add("hidden");

            $("scheduleSection")
                .classList.add("hidden");

            $("specialtySection")
                .classList.add("hidden");

            $("infoSection")
                .classList.add("hidden");


            $("ubsSection")
                .classList.remove("hidden");


            renderUBS();

            updateSteps(2);


            $("ubsSection")
                .scrollIntoView({
                    behavior: "smooth"
                });
        }
    );


$("startBtn")
    .addEventListener(
        "click",
        () => {

            $("patientCard")
                .scrollIntoView({
                    behavior: "smooth"
                });
        }
    );


/* ============================================================
   LOGIN
============================================================ */

$("staffLoginBtn")
    .addEventListener(
        "click",
        () => {

            openModal(
                "loginModal"
            );

            $("loginUser").focus();
        }
    );


$("loginForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const username =
                $("loginUser")
                    .value
                    .trim();

            const password =
                $("loginPass")
                    .value;


            /*
                LOGIN DO DESENVOLVEDOR
            */

            if (
                username ===
                "desenvolvedor" &&

                password ===
                "2026"
            ) {

                loggedUser = {
                    type: "developer"
                };

                sessionStorage.setItem(
                    STORAGE.SESSION,
                    JSON.stringify(
                        loggedUser
                    )
                );


                closeModal(
                    "loginModal"
                );

                openAdminPanel();

                return;
            }


            /*
                LOGIN DAS UBS
            */

            const ubs =
                ubsList.find(
                    item =>
                        item.admin.user ===
                        username &&

                        item.admin.password ===
                        password
                );


            if (!ubs) {

                showToast(
                    "Usuário ou senha incorretos."
                );

                return;
            }


            loggedUser = {

                type: "ubs",

                ubsId: ubs.id

            };


            sessionStorage.setItem(
                STORAGE.SESSION,
                JSON.stringify(
                    loggedUser
                )
            );


            closeModal(
                "loginModal"
            );

            openAdminPanel();

        }
    );


/* ============================================================
   PAINEL ADMINISTRATIVO
============================================================ */

function openAdminPanel() {

    if (!loggedUser) return;


    if (
        loggedUser.type ===
        "developer"
    ) {

        $("panelRole")
            .textContent =
            "Administrador geral / Desenvolvedor";

        $("developerSelector")
            .classList.remove(
                "hidden"
            );


        $("developerUBS").innerHTML =
            ubsList
                .map(
                    ubs => `
                        <option value="${ubs.id}">
                            ${escapeHTML(
                                ubs.name
                            )}
                        </option>
                    `
                )
                .join("");


        adminUBS =
            ubsList[0];

    } else {

        $("developerSelector")
            .classList.add(
                "hidden"
            );


        adminUBS =
            ubsList.find(
                ubs =>
                    ubs.id ===
                    loggedUser.ubsId
            );


        $("panelRole")
            .textContent =
            "Administrador da unidade";

    }


    if (!adminUBS) {

        showToast(
            "Não foi possível carregar a UBS."
        );

        return;
    }


    $("panelTitle")
        .textContent =
        adminUBS.name;


    populateAdminPanel();

    openModal(
        "panelModal"
    );
}


$("developerUBS")
    .addEventListener(
        "change",
        function() {

            adminUBS =
                ubsList.find(
                    ubs =>
                        ubs.id ===
                        this.value
                );


            populateAdminPanel();
        }
    );


function populateAdminPanel() {

    if (!adminUBS) return;


    $("panelTitle")
        .textContent =
        adminUBS.name;


    populateDashboard();

    populateUBSForm();

    renderEmployeeAdmin();

    renderSpecialtyAdmin();

    renderCampaignAdmin();

    populatePanelSpecialtyFilter();

}


/* ============================================================
   DASHBOARD
============================================================ */

function populateDashboard() {

    const today =
        todayString();


    const confirmed =
        appointments.filter(
            appointment =>

                appointment.ubsId ===
                adminUBS.id &&

                appointment.status ===
                "confirmed"
        );


    const todayAppointments =
        confirmed.filter(
            appointment =>
                appointment.date ===
                today
        );


    const cancelled =
        appointments.filter(
            appointment =>

                appointment.ubsId ===
                adminUBS.id &&

                appointment.status ===
                "cancelled"
        );


    $("dashboardStats")
        .innerHTML = `

            <div class="stat-card">

                <span>
                    Consultas hoje
                </span>

                <strong>
                    ${todayAppointments.length}
                </strong>

            </div>


            <div class="stat-card">

                <span>
                    Confirmadas
                </span>

                <strong>
                    ${confirmed.length}
                </strong>

            </div>


            <div class="stat-card">

                <span>
                    Canceladas
                </span>

                <strong>
                    ${cancelled.length}
                </strong>

            </div>


            <div class="stat-card">

                <span>
                    Funcionários
                </span>

                <strong>
                    ${adminUBS.employees.length}
                </strong>

            </div>

        `;


    renderPanelAppointments();
}


$("panelDate")
    .addEventListener(
        "change",
        renderPanelAppointments
    );


$("panelSpecialty")
    .addEventListener(
        "change",
        renderPanelAppointments
    );


$("panelPeriod")
    .addEventListener(
        "change",
        renderPanelAppointments
    );


function populatePanelSpecialtyFilter() {

    const select =
        $("panelSpecialty");

    select.innerHTML = `
        <option value="">
            Todas
        </option>
    `;


    adminUBS.specialties
        .forEach(
            specialty => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    specialty.id;

                option.textContent =
                    specialty.name;

                select.appendChild(
                    option
                );
            }
        );
}


function renderPanelAppointments() {

    if (!adminUBS) return;


    let filtered =
        appointments.filter(
            appointment =>
                appointment.ubsId ===
                adminUBS.id
        );


    const date =
        $("panelDate").value;

    const specialty =
        $("panelSpecialty").value;

    const period =
        $("panelPeriod").value;


    if (date) {

        filtered =
            filtered.filter(
                appointment =>
                    appointment.date ===
                    date
            );
    }


    if (specialty) {

        filtered =
            filtered.filter(
                appointment =>
                    appointment.specialtyId ===
                    specialty
            );
    }


    if (period) {

        filtered =
            filtered.filter(
                appointment =>
                    appointment.period ===
                    period
            );
    }


    filtered.sort(
        (a, b) =>
            `${a.date} ${a.time}`
                .localeCompare(
                    `${b.date} ${b.time}`
                )
    );


    const container =
        $("panelAppointments");


    if (!filtered.length) {

        container.innerHTML = `

            <div class="admin-row">

                <div class="admin-row-info">

                    <strong>
                        Nenhuma consulta encontrada.
                    </strong>

                    <span>
                        Altere os filtros para consultar outros agendamentos.
                    </span>

                </div>

            </div>

        `;

        return;
    }


    container.innerHTML = "";


    filtered.forEach(
        appointment => {

            const specialty =
                adminUBS.specialties
                    .find(
                        item =>
                            item.id ===
                            appointment.specialtyId
                    );


            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "panel-appointment";


            item.innerHTML = `

                <div class="panel-appointment-info">

                    <strong>
                        ${escapeHTML(
                            appointment.patientName
                        )}
                    </strong>

                    <span>

                        ${formatDate(
                            appointment.date
                        )}
                        •
                        ${appointment.time}
                        •
                        ${escapeHTML(
                            specialty?.name ||
                            appointment.specialtyName
                        )}

                        <br>

                        Cartão SUS:
                        ${escapeHTML(
                            appointment.sus
                        )}

                        <br>

                        Celular:
                        ${escapeHTML(
                            appointment.phone
                        )}

                    </span>

                </div>


                <div class="admin-actions">

                    <button
                        class="edit-btn"
                        data-panel-action="print"
                        data-id="${appointment.id}"
                    >
                        🖨️ Imprimir
                    </button>

                    ${
                        appointment.status ===
                        "confirmed"

                        ? `
                            <button
                                class="delete-btn"
                                data-panel-action="cancel"
                                data-id="${appointment.id}"
                            >
                                Cancelar
                            </button>
                        `
                        : `
                            <span class="appointment-status status-cancelled">
                                Cancelada
                            </span>
                        `
                    }

                </div>

            `;


            container.appendChild(item);
        }
    );


    container
        .querySelectorAll(
            "[data-panel-action]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const action =
                            button.dataset
                                .panelAction;

                        const id =
                            button.dataset.id;


                        if (
                            action ===
                            "cancel"
                        ) {

                            adminCancelAppointment(
                                id
                            );

                        }


                        if (
                            action ===
                            "print"
                        ) {

                            printAppointment(
                                id
                            );

                        }

                    }
                );

            }
        );
}


function adminCancelAppointment(
    id
) {

    const appointment =
        appointments.find(
            item =>
                item.id === id
        );


    if (!appointment) return;


    if (
        !confirm(
            "Deseja cancelar esta consulta?"
        )
    ) {

        return;
    }


    appointment.status =
        "cancelled";


    saveAppointments();

    populateDashboard();

    showToast(
        "Consulta cancelada."
    );
}


/* ============================================================
   IMPRESSÃO
============================================================ */

function printAppointment(id) {

    const appointment =
        appointments.find(
            item =>
                item.id === id
        );


    if (!appointment) return;


    const ubs =
        ubsList.find(
            item =>
                item.id ===
                appointment.ubsId
        );


    const html = `

        <!DOCTYPE html>

        <html lang="pt-BR">

        <head>

            <meta charset="UTF-8">

            <title>
                Comprovante - Conecta Saúde
            </title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    padding: 30px;
                    color: #173b3a;
                }

                .box {
                    max-width: 650px;
                    margin: auto;
                    border: 1px solid #ddd;
                    border-radius: 15px;
                    padding: 30px;
                }

                h1 {
                    color: #0b8f8a;
                }

                .item {
                    padding: 12px 0;
                    border-bottom: 1px solid #eee;
                }

                strong {
                    display: block;
                    margin-bottom: 5px;
                }

            </style>

        </head>

        <body>

            <div class="box">

                <h1>
                    Conecta Saúde
                </h1>

                <h2>
                    Comprovante de agendamento
                </h2>

                <div class="item">

                    <strong>
                        Paciente
                    </strong>

                    ${escapeHTML(
                        appointment.patientName
                    )}

                </div>


                <div class="item">

                    <strong>
                        UBS
                    </strong>

                    ${escapeHTML(
                        ubs?.name || ""
                    )}

                </div>


                <div class="item">

                    <strong>
                        Especialidade
                    </strong>

                    ${escapeHTML(
                        appointment.specialtyName
                    )}

                </div>


                <div class="item">

                    <strong>
                        Data
                    </strong>

                    ${formatDate(
                        appointment.date
                    )}

                </div>


                <div class="item">

                    <strong>
                        Horário
                    </strong>

                    ${appointment.time}

                </div>


                <div class="item">

                    <strong>
                        Posição na fila
                    </strong>

                    ${appointment.queue}º

                </div>


                <br>

                <p>
                    Apresente o Cartão SUS
                    e documento de identificação
                    no atendimento.
                </p>

            </div>

            <script>
                window.onload = function() {
                    window.print();
                };
            <\/script>

        </body>

        </html>

    `;


    const printWindow =
        window.open(
            "",
            "_blank"
        );


    if (!printWindow) {

        showToast(
            "Permita janelas pop-up para imprimir."
        );

        return;
    }


    printWindow.document.write(
        html
    );

    printWindow.document.close();
}


/* ============================================================
   DADOS DA UBS
============================================================ */

function populateUBSForm() {

    $("editUBSName").value =
        adminUBS.name;

    $("editUBSPhone").value =
        adminUBS.phone;

    $("editUBSAddress").value =
        adminUBS.address;

    $("editUBSHours").value =
        adminUBS.hours;

    $("editUBSDocs").value =
        adminUBS.docs.join("\n");

    $("editAdminUser").value =
        adminUBS.admin.user;

    $("editAdminPassword").value =
        "";
}


$("ubsEditForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            adminUBS.name =
                $("editUBSName").value.trim();

            adminUBS.phone =
                $("editUBSPhone").value.trim();

            adminUBS.address =
                $("editUBSAddress").value.trim();

            adminUBS.hours =
                $("editUBSHours").value.trim();


            adminUBS.docs =
                $("editUBSDocs")
                    .value
                    .split("\n")
                    .map(item => item.trim())
                    .filter(Boolean);


            saveUBS();

            refreshReferences();

            showToast(
                "Informações da UBS atualizadas."
            );

        }
    );


$("credentialsForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const username =
                $("editAdminUser")
                    .value
                    .trim();


            const password =
                $("editAdminPassword")
                    .value;


            if (!username) {

                showToast(
                    "Informe um usuário."
                );

                return;
            }


            adminUBS.admin.user =
                username;


            if (password) {

                adminUBS.admin.password =
                    password;
            }


            saveUBS();

            $("editAdminPassword")
                .value = "";


            showToast(
                "Acesso da UBS atualizado."
            );

        }
    );


function refreshReferences() {

    ubsList =
        JSON.parse(
            localStorage.getItem(
                STORAGE.UBS
            )
        );


    if (selectedUBS) {

        selectedUBS =
            ubsList.find(
                item =>
                    item.id ===
                    selectedUBS.id
            ) || null;
    }


    if (adminUBS) {

        adminUBS =
            ubsList.find(
                item =>
                    item.id ===
                    adminUBS.id
            ) || null;
    }


    renderUBS();

    if (selectedUBS) {

        renderSpecialties();

        renderInfo();
    }


    if (adminUBS) {

        populateAdminPanel();
    }
}


/* ============================================================
   FUNCIONÁRIOS
============================================================ */

$("employeeForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const id =
                $("employeeEditId")
                    .value;


            const name =
                $("employeeName")
                    .value
                    .trim();


            const role =
                $("employeeRole")
                    .value
                    .trim();


            if (!name || !role) {

                showToast(
                    "Preencha nome e função."
                );

                return;
            }


            if (id) {

                const employee =
                    adminUBS.employees
                        .find(
                            item =>
                                item.id ===
                                id
                        );


                if (employee) {

                    employee.name =
                        name;

                    employee.role =
                        role;
                }

            } else {

                adminUBS.employees.push({

                    id:
                        generateId(
                            adminUBS.id
                        ),

                    name,

                    role

                });

            }


            saveUBS();

            resetEmployeeForm();

            renderEmployeeAdmin();

            populateDashboard();

            refreshReferences();

            showToast(
                "Funcionário salvo."
            );
        }
    );


function renderEmployeeAdmin() {

    const list =
        $("employeeList");

    list.innerHTML = "";


    adminUBS.employees
        .forEach(employee => {

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "admin-row";


            row.innerHTML = `

                <div class="admin-row-info">

                    <strong>
                        ${escapeHTML(
                            employee.name
                        )}
                    </strong>

                    <span>
                        ${escapeHTML(
                            employee.role
                        )}
                    </span>

                </div>


                <div class="admin-actions">

                    <button
                        class="edit-btn"
                        data-employee-edit="${employee.id}"
                    >
                        Editar
                    </button>

                    <button
                        class="delete-btn"
                        data-employee-delete="${employee.id}"
                    >
                        Excluir
                    </button>

                </div>

            `;


            list.appendChild(row);

        });


    list
        .querySelectorAll(
            "[data-employee-edit]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    editEmployee(
                        button.dataset
                            .employeeEdit
                    );

                }
            );

        });


    list
        .querySelectorAll(
            "[data-employee-delete]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteEmployee(
                        button.dataset
                            .employeeDelete
                    );

                }
            );

        });
}


function editEmployee(id) {

    const employee =
        adminUBS.employees
            .find(
                item =>
                    item.id === id
            );


    if (!employee) return;


    $("employeeEditId").value =
        employee.id;

    $("employeeName").value =
        employee.name;

    $("employeeRole").value =
        employee.role;


    $("cancelEmployeeEdit")
        .classList.remove(
            "hidden"
        );


    $("employeeName").focus();
}


function deleteEmployee(id) {

    if (
        !confirm(
            "Excluir este funcionário?"
        )
    ) {

        return;
    }


    adminUBS.employees =
        adminUBS.employees.filter(
            item =>
                item.id !== id
        );


    saveUBS();

    renderEmployeeAdmin();

    populateDashboard();

    showToast(
        "Funcionário excluído."
    );
}


function resetEmployeeForm() {

    $("employeeEditId")
        .value = "";

    $("employeeName")
        .value = "";

    $("employeeRole")
        .value = "";

    $("cancelEmployeeEdit")
        .classList.add(
            "hidden"
        );
}


$("cancelEmployeeEdit")
    .addEventListener(
        "click",
        resetEmployeeForm
    );


/* ============================================================
   ESPECIALIDADES ADMIN
============================================================ */

$("specialtyForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const id =
                $("specialtyEditId")
                    .value;


            const name =
                $("specialtyName")
                    .value
                    .trim();


            const description =
                $("specialtyDescription")
                    .value
                    .trim();


            if (!name) {

                showToast(
                    "Informe o nome da especialidade."
                );

                return;
            }


            if (id) {

                const specialty =
                    adminUBS.specialties
                        .find(
                            item =>
                                item.id ===
                                id
                        );


                if (specialty) {

                    specialty.name =
                        name;

                    specialty.description =
                        description;
                }

            } else {

                adminUBS.specialties.push({

                    id:
                        generateId(
                            "ESP"
                        ),

                    name,

                    icon: "🩺",

                    description

                });

            }


            saveUBS();

            resetSpecialtyForm();

            renderSpecialtyAdmin();

            populatePanelSpecialtyFilter();

            refreshReferences();

            showToast(
                "Especialidade salva."
            );
        }
    );


function renderSpecialtyAdmin() {

    const list =
        $("specialtyList");

    list.innerHTML = "";


    adminUBS.specialties
        .forEach(
            specialty => {

                const row =
                    document.createElement(
                        "div"
                    );

                row.className =
                    "admin-row";


                row.innerHTML = `

                    <div class="admin-row-info">

                        <strong>
                            ${escapeHTML(
                                specialty.icon ||
                                "🩺"
                            )}
                            ${escapeHTML(
                                specialty.name
                            )}
                        </strong>

                        <span>
                            ${escapeHTML(
                                specialty.description ||
                                ""
                            )}
                        </span>

                    </div>


                    <div class="admin-actions">

                        <button
                            class="edit-btn"
                            data-specialty-edit="${specialty.id}"
                        >
                            Editar
                        </button>

                        <button
                            class="delete-btn"
                            data-specialty-delete="${specialty.id}"
                        >
                            Excluir
                        </button>

                    </div>

                `;


                list.appendChild(row);

            }
        );


    list
        .querySelectorAll(
            "[data-specialty-edit]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        editSpecialty(
                            button.dataset
                                .specialtyEdit
                        );

                    }
                );

            }
        );


    list
        .querySelectorAll(
            "[data-specialty-delete]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        deleteSpecialty(
                            button.dataset
                                .specialtyDelete
                        );

                    }
                );

            }
        );
}


function editSpecialty(id) {

    const specialty =
        adminUBS.specialties
            .find(
                item =>
                    item.id === id
            );


    if (!specialty) return;


    $("specialtyEditId").value =
        specialty.id;

    $("specialtyName").value =
        specialty.name;

    $("specialtyDescription")
        .value =
        specialty.description || "";


    $("cancelSpecialtyEdit")
        .classList.remove(
            "hidden"
        );
}


function deleteSpecialty(id) {

    if (
        adminUBS.specialties.length <=
        1
    ) {

        showToast(
            "A UBS precisa ter pelo menos uma especialidade."
        );

        return;
    }


    if (
        !confirm(
            "Excluir esta especialidade?"
        )
    ) {

        return;
    }


    adminUBS.specialties =
        adminUBS.specialties.filter(
            item =>
                item.id !== id
        );


    saveUBS();

    renderSpecialtyAdmin();

    populatePanelSpecialtyFilter();

    refreshReferences();

    showToast(
        "Especialidade excluída."
    );
}


function resetSpecialtyForm() {

    $("specialtyEditId")
        .value = "";

    $("specialtyName")
        .value = "";

    $("specialtyDescription")
        .value = "";


    $("cancelSpecialtyEdit")
        .classList.add(
            "hidden"
        );
}


$("cancelSpecialtyEdit")
    .addEventListener(
        "click",
        resetSpecialtyForm
    );


/* ============================================================
   CAMPANHAS
============================================================ */

$("campaignForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const index =
                $("campaignEditIndex")
                    .value;


            const name =
                $("campaignName")
                    .value
                    .trim();


            if (!name) {

                showToast(
                    "Informe o nome da campanha."
                );

                return;
            }


            if (index !== "") {

                adminUBS.campaigns[
                    Number(index)
                ] = name;

            } else {

                adminUBS.campaigns.push(
                    name
                );
            }


            saveUBS();

            resetCampaignForm();

            renderCampaignAdmin();

            refreshReferences();

            showToast(
                "Campanha salva."
            );
        }
    );


function renderCampaignAdmin() {

    const list =
        $("campaignList");

    list.innerHTML = "";


    adminUBS.campaigns
        .forEach(
            (campaign, index) => {

                const row =
                    document.createElement(
                        "div"
                    );

                row.className =
                    "admin-row";


                row.innerHTML = `

                    <div class="admin-row-info">

                        <strong>
                            📢 ${escapeHTML(
                                campaign
                            )}
                        </strong>

                    </div>


                    <div class="admin-actions">

                        <button
                            class="edit-btn"
                            data-campaign-edit="${index}"
                        >
                            Editar
                        </button>

                        <button
                            class="delete-btn"
                            data-campaign-delete="${index}"
                        >
                            Excluir
                        </button>

                    </div>

                `;


                list.appendChild(row);

            }
        );


    list
        .querySelectorAll(
            "[data-campaign-edit]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        editCampaign(
                            Number(
                                button.dataset
                                    .campaignEdit
                            )
                        );

                    }
                );

            }
        );


    list
        .querySelectorAll(
            "[data-campaign-delete]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        deleteCampaign(
                            Number(
                                button.dataset
                                    .campaignDelete
                            )
                        );

                    }
                );

            }
        );
}


function editCampaign(index) {

    $("campaignEditIndex")
        .value = index;

    $("campaignName")
        .value =
        adminUBS.campaigns[index];


    $("cancelCampaignEdit")
        .classList.remove(
            "hidden"
        );


    $("campaignName").focus();
}


function deleteCampaign(index) {

    if (
        !confirm(
            "Excluir esta campanha?"
        )
    ) {

        return;
    }


    adminUBS.campaigns.splice(
        index,
        1
    );


    saveUBS();

    renderCampaignAdmin();

    refreshReferences();

    showToast(
        "Campanha excluída."
    );
}


function resetCampaignForm() {

    $("campaignEditIndex")
        .value = "";

    $("campaignName")
        .value = "";


    $("cancelCampaignEdit")
        .classList.add(
            "hidden"
        );
}


$("cancelCampaignEdit")
    .addEventListener(
        "click",
        resetCampaignForm
    );


/* ============================================================
   ABAS DO PAINEL
============================================================ */

document
    .querySelectorAll(
        ".panel-tab"
    )
    .forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".panel-tab"
                    )
                    .forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );


                document
                    .querySelectorAll(
                        ".panel-page"
                    )
                    .forEach(
                        page =>
                            page.classList.remove(
                                "active"
                            )
                    );


                tab.classList.add(
                    "active"
                );


                const page =
                    $("panel-" +
                        tab.dataset.panel);


                if (page) {

                    page.classList.add(
                        "active"
                    );
                }


                if (
                    tab.dataset.panel ===
                    "dashboard"
                ) {

                    populateDashboard();

                }

            }
        );

    });


/* ============================================================
   FECHAR MODAIS
============================================================ */

document
    .querySelectorAll(
        "[data-close]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                closeModal(
                    button.dataset.close
                );

            }
        );

    });


document
    .querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    modal
                ) {

                    modal.classList.add(
                        "hidden"
                    );

                }

            }
        );

    });


/* ============================================================
   LOGOUT
============================================================ */

$("logoutBtn")
    .addEventListener(
        "click",
        () => {

            loggedUser = null;

            adminUBS = null;

            sessionStorage.removeItem(
                STORAGE.SESSION
            );

            closeModal(
                "panelModal"
            );

            $("loginForm").reset();

            showToast(
                "Sessão encerrada."
            );
        }
    );


/* ============================================================
   RESTAURAR SESSÃO
============================================================ */

function restoreSession() {

    const saved =
        sessionStorage.getItem(
            STORAGE.SESSION
        );


    if (!saved) return;


    try {

        loggedUser =
            JSON.parse(saved);


        if (
            loggedUser.type ===
            "developer"
        ) {

            adminUBS =
                ubsList[0];

        } else {

            adminUBS =
                ubsList.find(
                    item =>
                        item.id ===
                        loggedUser.ubsId
                );
        }

    } catch {

        sessionStorage.removeItem(
            STORAGE.SESSION
        );

    }
}


/* ============================================================
   INICIALIZAÇÃO
============================================================ */

function init() {

    renderUBS();

    updateSteps(1);

    restoreSession();

    /*
        Verifica lembretes enquanto
        a página estiver aberta.
    */

    setTimeout(
        checkReminders,
        1000
    );
}


init();
