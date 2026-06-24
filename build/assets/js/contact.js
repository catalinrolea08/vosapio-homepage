document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".needs-validation");
    const submitBtn = document.getElementById("contactSubmit");
    const successMsg = document.getElementById("success_message");
    const errorMsg = document.getElementById("error_message");
    const gdprCheckbox = document.getElementById("gdprConsent");

    if (!form || !submitBtn) return;

    let lastSubmittedData = null;

    submitBtn.addEventListener("click", function () {

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }

        if (gdprCheckbox && !gdprCheckbox.checked) {
            gdprCheckbox.closest(".gdpr-checkbox").classList.add("gdpr-error");
            return;
        }

        if (gdprCheckbox) {
            gdprCheckbox.closest(".gdpr-checkbox").classList.remove("gdpr-error");
        }

        const formData = getFormData();
        const url = "https://app.memesisai.com/ROCEX_BE/contact";
        const token = uuidv4();

        let headers = new Headers();
        headers.set("Content-Type", "application/json");
        headers.set("X-XSRF-TOKEN", token);

        document.cookie = "XSRF-TOKEN=" + token + "; path=/ROCEX_BE; Secure; SameSite=Lax";

        fetch(url, {
            method: "POST",
            body: JSON.stringify(formData),
            headers,
            credentials: "include"
        })
            .then(response => {
                if (response.status === 200) {

                    lastSubmittedData = JSON.stringify(formData);
                    submitBtn.disabled = true;

                    successMsg.classList.remove("d-none");
                    errorMsg.classList.add("d-none");

                    window.dataLayer = window.dataLayer || [];
                    dataLayer.push({
                        event: 'contact_form_submit',
                        formName: 'Agency Partner Waitlist'
                    });

                } else {
                    throw new Error("Server error");
                }
            })
            .catch(() => {
                successMsg.classList.add("d-none");
                errorMsg.classList.remove("d-none");
            });
    });

    form.addEventListener("input", () => {
        if (!lastSubmittedData) return;

        if (JSON.stringify(getFormData()) !== lastSubmittedData) {
            submitBtn.disabled = false;
        }
    });

    function getFormData() {
        return {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            phoneNumber: phoneNumber.value.trim(),
            subject: subject.value.trim(),
            message: message.value.trim()
        };
    }
});

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}
