class ProfileForm {
  get editBtn() {
    return $('[data-testid="profile-buttons-container"] button:nth-child(1)');
  }
  get nameLabel() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(2) label');
  }
  get nameInput() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(2) input');
  }
  get lastNameLabel() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(3) label');
  }
  get lastNameInput() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(3) input');
  }
  get idLabel() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(4) label');
  }
  get idInput() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(4) input');
  }
  get phoneLabel() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(5) label');
  }
  get phoneInput() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(5) input');
  }
  get emailLabel() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(6) label');
  }
  get emailInput() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(6) input');
  }
  get cityLabel() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(7) label');
  }
  get cityInput() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(7) input');
  }
  get dateLabel() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(8) label');
  }
  get dateInput() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(8) input');
  }
  get zipLabel() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(9) label');
  }
  get zipInput() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(9) input');
  }
  get passwordLabel() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(10) label');
  }
  get passwordInput() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(10) input');
  }
  get membershipLabel() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(11) label')
  }
  get membershipSelect() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(11) select')
  }
  get membershipOnlyClasses() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(11) option:nth-child(1)')
  }
  get membershipClassic() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(11) option:nth-child(2)')
  }
  get membershipBlack() {
    return $('[data-testid="member-profile-edit-form"]  fieldset:nth-child(11) option:nth-child(3)')
  }
  get successModalText() {
    return $('[data-testid="member-profile-modal-alert"] p')
  }
  get successModalBtn() {
    return $('[data-testid="member-profile-modal-alert"] button')
  }
  get changePassBtn() {
    return $('[data-testid="profile-buttons-container"] button:nth-child(3)')
  }
  async changePassClick() {
    await this.changePassBtn.click();
  }
  async editClick() {
    await this.editBtn.click();
  }
  async successBtnClick() {
    await this.successModalBtn.click();
  }
  async cancelBtnClick() {
    await this.cancelBtn.click();
  }
  async resetBtnClick() {
    await this.resetBtn.click();
  }
  async membershipSelectClick() {
    await this.membershipSelect.click();
  }
  async membershipOnlyClassesClick() {
    await this.membershipOnlyClasses.click();
  }
  async membershipClassicClick() {
    await this.membershipClassic.click();
  }
  async membershipBlackClick() {
    await this.membershipBlack.click();
  }
  async fillProfileForm(name) {
    await this.nameInput.setValue(name);
  }
}

module.exports = new ProfileForm();