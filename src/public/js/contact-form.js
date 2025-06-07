/**
 * Contact Form Class
 * Handles the contact form submission, validation, and UI updates.
 * @class ContactForm
 * @constructor
 * @param {HTMLElement} form - The contact form element.
 * @param {HTMLElement} submitButton - The submit button element.
 * @param {HTMLElement} formStatus - The element to display form submission status.
 * @param {HTMLElement} formSuccess - The element to display success message after form submission.
 * @property {boolean} isSubmitted - Indicates if the form has been submitted.
 * @param {boolean} isSubmitting - Indicates if the form is currently being submitted.
 */
class ContactForm {
  constructor() {
    this.form = document.querySelector(".contact-form");
    this.submitButton = this.form.querySelector("#submit");
    this.formStatus = this.form.querySelector("#form-status");
    this.formSuccess = this.form.querySelector("#form-success");

    this.isSubmitted = false;
    this.isSubmitting = false;

    this.init();
  }

  /**
   * Retrieves form elements by their names.
   * @returns {Array} An array of form elements.
   */
  getElems = () => {
    return ["name", "message"].map((name) =>
      this.form.querySelector(`#${name}`)
    );
  };

  /**
   * Retrieves the values of the form elements.
   * @returns {Array} An array of objects containing the name and value of each form element.
   */
  getValues = () => {
    return ["name", "message"].map((name) => {
      const elem = this.form.querySelector(`#${name}`);
      return {
        name: elem.name,
        value: elem.value.trim(),
      };
    });
  };

  /**
   * Validates the form by checking if required fields are filled.
   * If a field is empty, it adds an error class and displays an error message.
   * @param {Array} values - An array of objects containing the name and value of each form element.
   * @returns {boolean} Returns true if the form is valid, false otherwise.
   */
  validateForm = (values) => {
    let isValid = true;

    const setError = (elem) => {
      elem.closest(".form-group").classList.add("error");
      const errorElem = this.form.querySelector(`#${elem.name}-error`);
      errorElem.textContent = `${
        elem.name.charAt(0).toUpperCase() + elem.name.slice(1)
      } is required.`;
      isValid = false;
    };

    const clearError = (elem) => {
      elem.closest(".form-group").classList.remove("error");
      const errorElem = this.form.querySelector(`#${elem.name}-error`);
      errorElem.textContent = "";
    };

    values.forEach(({ name, value }) => {
      const elem = this.form.querySelector(`#${name}`);
      value ? clearError(elem) : setError(elem);
    });
    return isValid;
  };

  /**
   * Handles the form submission.
   * Prevents the default form submission behavior, validates the form,
   * and sends the form data to the server via a POST request.
   * Displays success or error messages based on the response.
   * @param {Event} e - The submit event object.
   * @returns {Promise<void>} A promise that resolves when the form submission is complete.
   */
  handleSubmit = async (e) => {
    e.preventDefault();
    this.isSubmitted = true;
    this.isSubmitting = true;

    this.submitButton.textContent = "Sending Message...";
    this.submitButton.disabled = true;

    this.formStatus.textContent = "";

    this.formSuccess.style.display = "none";

    /**
     * Validate the form before submitting
     * If there are errors, do not submit
     */
    const values = this.getValues();
    const isValid = this.validateForm(values);

    if (!isValid) {
      this.isSubmitting = false;
      this.submitButton.textContent = "Send Message";
      this.submitButton.disabled = false;

      const elems = this.getElems();
      elems.forEach((elem) => {
        elem.addEventListener("input", () =>
          this.validateForm(this.getValues())
        );
      });

      return;
    }

    await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values[0].value,
        message: values[1].value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.submitButton.textContent = "Send Message";
        this.submitButton.disabled = false;

        if (!data.error) {
          this.formSuccess.style.display = "block";
          this.form.reset();
        }
      })
      .catch(() => {
        this.submitButton.textContent = "Send Message";
        this.submitButton.disabled = false;
        this.formStatus.textContent =
          "An error occurred while sending your message.";
      })
      .finally(() => {
        this.isSubmitting = false;
        this.isSubmitted = false;
      });
  };

  /**
   * Initializes the contact form by adding an event listener for the submit event.
   * When the form is submitted, it calls the handleSubmit method.
   */
  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }
}

new ContactForm();
