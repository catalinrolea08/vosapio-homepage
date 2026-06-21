document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contactSubmit").addEventListener("click", function () {
        const url = "https://app.memesisai.com/ROCEX_BE/contact";
        //const url1 = "http://localhost:8081/ROCEX_BE/contact"
        const token = uuidv4();
        let headers = new Headers();
        headers.set("Content-Type", "application/json");
        headers.set("X-XSRF-TOKEN", token);
        document.cookie = "XSRF-TOKEN=" + token + "; path=/ROCEX_BE; Secure; SameSite=Lax";
        fetch(url, {
            method: "POST",
            body: JSON.stringify(
                {
                    firstName: document.getElementById("firstName").value,
                    lastName: document.getElementById("lastName").value,
                    message: document.getElementById("message").value,
                    email: document.getElementById("email").value,
                    subject: document.getElementById("subject").value,
                    phoneNumber: document.getElementById("phoneNumber").value
                }
            ),
            headers: headers,
            credentials: "include"
        }).then((response) => {
            if (response.status === 200) {
                document.getElementById("success_message").classList.remove("d-none");
                document.getElementById("error_message").classList.add("d-none");
                window.dataLayer = window.dataLayer || [];
                dataLayer.push({
                    event: 'contact_form_submit',
                    formName: 'Contact Page'
                });
            } else {
                document.getElementById("success_message").classList.add("d-none");
                document.getElementById("error_message").classList.remove("d-none");
            }
        })
            .catch(err => {
                document.getElementById("success_message").classList.add("d-none");
                document.getElementById("error_message").classList.remove("d-none");
                console.error(err);
            });
    });
});

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}
