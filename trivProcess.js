document.addEventListener("DOMContentLoaded", () => {

    // Toggle hint display
    document.querySelectorAll(".hint-btn").forEach(button => {
        button.addEventListener("click", function () {
            let questionBlock = this.closest(".questionBlock"); // Find parent block
            let hintDiv = questionBlock.querySelector(".hint"); // Get hint div

            if (hintDiv) {
                hintDiv.style.display = (hintDiv.style.display === "none" || hintDiv.style.display === "") ? "block" : "none";
            }
        });
    });

    // Store correct answers
    const correctAnswers = {
        q1: "Abuja",
        q2: "Shakespeare",
        q3: "Jupiter",
        q4: "1945",
        q5: "Oxygen",
        q6: "Cheetah",
        q7: ["Python", "JavaScript", "HTML"]
    };

    // Function to check answers and calculate score
    function checkAnswers() {
        let correctScore = 0;

        // Check text input answers
        if (document.getElementById("q1")?.value.trim().toLowerCase() === correctAnswers.q1.toLowerCase()) {
            correctScore++;
        }
        if (document.getElementById("q2")?.value.trim().toLowerCase() === correctAnswers.q2.toLowerCase()) {
            correctScore++;
        }

        // Check dropdown answers
        if (document.getElementById("q3")?.value === correctAnswers.q3) {
            correctScore++;
        }
        if (document.getElementById("q4")?.value === correctAnswers.q4) {
            correctScore++;
        }

        // Check radio button answers
        if (document.querySelector('input[name="q5"]:checked')?.value === correctAnswers.q5) {
            correctScore++;
        }
        if (document.querySelector('input[name="q6"]:checked')?.value === correctAnswers.q6) {
            correctScore++;
        }

        // Check checkbox answers (all correct answers must be checked, and no extra ones)
        let selectedAnswers = Array.from(document.querySelectorAll('input[name="q7"]:checked'))
            .map(input => input.value);

        if (selectedAnswers.length === correctAnswers.q7.length && correctAnswers.q7.every(ans => selectedAnswers.includes(ans))) {
            correctScore++;
        }

        return correctScore;
    }

    // Form validation
    function validateForm() {
        let isValid = true;

        // Hide all previous error messages
        document.querySelectorAll(".error").forEach(error => error.style.display = "none");

        // Validate text inputs
        document.querySelectorAll("input[type='text']").forEach(input => {
            if (!input.value.trim()) {
                showError(input, "Field cannot be empty");
                isValid = false;
            }
        });

        // Validate dropdowns
        document.querySelectorAll("select").forEach(select => {
            if (!select.value || select.value === "") {
                showError(select, "Field cannot be empty");
                isValid = false;
            }
        });

        // Validate radio buttons
        ["q5", "q6"].forEach(group => {
            if (!document.querySelector(`input[name='${group}']:checked`)) {
                let parent = document.querySelector(`input[name='${group}']`)?.closest("fieldset");
                if (parent) {
                    showError(parent, "Please select an option");
                }
                isValid = false;
            }
        });

        // Validate checkboxes
        let checkboxes = document.querySelectorAll("input[name='q7']");
        let checkedBoxes = document.querySelectorAll("input[name='q7']:checked");
        if (checkboxes.length > 0 && checkedBoxes.length === 0) {
            let checkboxGroup = checkboxes[0].closest("fieldset");
            if (checkboxGroup) {
                showError(checkboxGroup, "Please select at least one option");
            }
            isValid = false;
        }

        if (isValid) {
            document.getElementById("result").innerHTML = "<p class='alert alert-info col-12 '>Form submitted successfully! Please wait for the result.</p>";
        }

        return isValid;
    }

    // Function to show error message
    function showError(element, message) {
        let errorDiv = element.closest(".questionBlock, fieldset")?.querySelector(".error");
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = "block";
        }
    }

    // Submit button logic
    document.getElementById("submitBtn")?.addEventListener("click", () => {
        if (validateForm()) {
            const score = checkAnswers();
            const percentage = ((score / 7) * 100).toFixed(2);

            setTimeout(() => {
                // Show score and color it
                const resultDiv = document.getElementById("result");
                resultDiv.innerHTML = `Your score is: ${score} / 7 (${percentage}%)`;

                if (percentage < 51) {
                    resultDiv.style.color = "red";
                } else if (percentage >= 51 && percentage < 80) {
                    resultDiv.style.color = "orange";
                } else if (percentage >= 80) {
                    resultDiv.style.color = "green";
                } else {
                    return false;
                }
            }, 3000);
        }
    });

});
