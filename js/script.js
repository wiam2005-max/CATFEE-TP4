/* ==================================================
   CATFEE - JAVASCRIPT
   ================================================== */


/* ==================================================
   CATFEE ASSISTANT
   ================================================== */

const askButton = document.getElementById("askButton");
const userQuestion = document.getElementById("userQuestion");
const chatBox = document.getElementById("chatBox");


if (askButton && userQuestion && chatBox) {

    askButton.addEventListener("click", askAssistant);

    userQuestion.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            askAssistant();
        }

    });

}


function askAssistant() {

    const question = userQuestion.value.trim().toLowerCase();

    if (question === "") {
        return;
    }


    /* User message */

    const userMessage = document.createElement("div");

    userMessage.className = "mb-3 text-end";

    userMessage.innerHTML = `
        <div class="p-3 rounded bg-secondary text-white d-inline-block">
            <strong>You</strong>
            <p class="mb-0 mt-1">${question}</p>
        </div>
    `;

    chatBox.appendChild(userMessage);


    /* Assistant response */

    let answer = "";


    if (question.includes("menu") ||
        question.includes("coffee") ||
        question.includes("drink") ||
        question.includes("dessert")) {

        answer = "We offer coffee, drinks and delicious desserts! You can check our full menu on the Menu page.";

    }

    else if (question.includes("cat") ||
             question.includes("cats")) {

        answer = "Of course! CATFEE is a cozy café where you can enjoy your coffee while spending time with our lovely cats.";

    }

    else if (question.includes("reservation") ||
             question.includes("reserve") ||
             question.includes("book")) {

        answer = "You can reserve a table by visiting our Reservation page.";

    }

    else if (question.includes("location") ||
             question.includes("where")) {

        answer = "CATFEE is located in Marrakech, Morocco.";

    }

    else if (question.includes("hour") ||
             question.includes("open") ||
             question.includes("time")) {

        answer = "We are open every day from 10:00 AM to 10:00 PM.";

    }

    else if (question.includes("hello") ||
             question.includes("hi") ||
             question.includes("hey")) {

        answer = "Hello! Welcome to CATFEE! How can I help you?";

    }

    else if (question.includes("thank")) {

        answer = "You're very welcome! Have a cozy day at CATFEE!";

    }

    else {

        answer = "I'm still learning! Try asking me about our menu, cats, reservations, location or opening hours.";

    }


    /* Assistant message */

    setTimeout(function() {

        const assistantMessage = document.createElement("div");

        assistantMessage.className = "mb-3";

        assistantMessage.innerHTML = `
            <div class="p-3 rounded bg-light">
                <strong>CATFEE Assistant </strong>
                <p class="mb-0 mt-1">${answer}</p>
            </div>
        `;

        chatBox.appendChild(assistantMessage);

        chatBox.scrollTop = chatBox.scrollHeight;

    }, 400);


    /* Clear input */

    userQuestion.value = "";

}


/* ==================================================
   RESERVATION FORM
   ================================================== */

const reservationForm = document.querySelector("form");

if (reservationForm && window.location.pathname.includes("reservation")) {

    reservationForm.addEventListener("submit", function(event) {

        event.preventDefault();

        alert("Your reservation has been received! We look forward to seeing you at CATFEE.");

        reservationForm.reset();

    });

}


/* CONTACT FORM */

if (reservationForm && window.location.pathname.includes("contact")) {

    reservationForm.addEventListener("submit", function(event) {

        event.preventDefault();

        alert("Thank you for contacting CATFEE! We will get back to you soon.");

        reservationForm.reset();

    });

}