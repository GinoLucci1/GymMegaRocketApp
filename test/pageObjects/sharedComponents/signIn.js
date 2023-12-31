class SignIn {
  get signInBtn() {
    return $(`[data-testid="navbar"] li:nth-child(2) a`);
  }

  get emailInput() {
    return $(`[data-testid="signin-form"] fieldset:first-child input`);
  }

  get passwordInput() {
    return $(`[data-testid="signin-form"] fieldset:nth-child(2) input`);
  }

  get showHidePasswordBtn() {
    return $(`[data-testid="signin-form"] svg`);
  }

  get submitBtn() {
    return $(`[data-testid="signin-form"] button:first-child`)
  }

  get logInCancelBtn() {
    return $(`[data-testid="signin-form"] button:second-child`)
  }

  async showHidePasswordBtnClick() {
    await this.showHidePasswordBtn.click();
  }

  async fillFormLogInMember() {
    await this.emailInput.setValue('juan@gmail.com');
    await this.passwordInput.setValue('testing123');
  }

  async fillFormLogInAdmin() {
    await this.emailInput.setValue('juanignaciocanton1@gmail.com');
    await this.passwordInput.setValue('Testing123');
  }

  async fillFormLogInTrainer() {
    await this.emailInput.setValue('fede.cavallo@gmail.com');
    await this.passwordInput.setValue('Fede12457812');
  }

  async fillFormLogInSuperAdmin() {
    await this.emailInput.setValue('octavito@gmail.com');
    await this.passwordInput.setValue('Marianobondar123456');
  }

  async submitBtnClick() {
    await this.submitBtn.click();
  }

  async logInCancelBtnClick() {
    await this.logInCancelBtn.click();
  }

  async signInBtnClick() {
    await this.signInBtn.click();
  }
}

module.exports = new SignIn();
