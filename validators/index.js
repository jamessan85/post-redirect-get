const validate = {
  fieldName: '',
  fieldValue: '',
  errors: [],
  isValid: true,
  message: 'Invalid field',
  bail: false,
  /**
     * Sets the fieldname and fieldValue into the validate object
     * @param {String} fieldName the name of the field you want to validate.
     * @param {String|Number|Boolean} fieldValue the value of the field you want to validate against
     * @returns
     */
  body(fieldName, fieldValue) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    return this;
  },
  /**
     * Validator to check the max length of a string
     * @param {v} Number allowed max length of string
     * @returns this
     */
  maxlength(v) {
    if (this.bail) {
      return this;
    }
    const stringLength = this.fieldValue.toString().length;
    this.isValid = stringLength <= v;
    this.message = `${this.fieldName} is invalid, max length allowed ${v} recieved ${stringLength}`;
    this.checkIsValid();
    return this;
  },
  /**
     * Validator to check the min length of a string
     * @param {v} Number allowed min length of string
     * @returns this
     */
  minlength(v) {
    if (this.bail) {
      return this;
    }
    const stringLength = this.fieldValue.toString().length;
    this.isValid = stringLength >= v;
    this.message = `${this.fieldName} is invalid, min length allowed ${v} recieved ${stringLength}`;
    this.checkIsValid();
    return this;
  },
  /**
     * Checks if isValid is false, adds to errors array.
     */
  checkIsValid() {
    if (!this.isValid) {
      this.errors.push({
        field: this.fieldName,
        message: this.message,
        valueRecieved: this.fieldValue,
      });
    }
  },
  /**
     * Resets errors array
     */
  reset() {
    this.errors = [];
    this.bail = false;
    this.isValid = true;
  },
  required() {
    if (!this.fieldValue) {
      this.isValid = false;
      this.bail = true;
      this.message = `${this.fieldName} not found in request body`;
      this.checkIsValid();
    }
    return this;
  },

};

module.exports = validate;
