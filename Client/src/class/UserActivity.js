class UserActivity {

  // Retrieve the data of the sessions

  constructor(data) {
    this._activities = data.sessions.map((session) => {
      return {
        name: this.initDate(session.day),
        ...session,
      };
    });
  }

  initDate = (date) => {
    const day = new Date(date);
    return day.getDate().toString();
  };

  get initActivity() {
    return this._activities;
  }
}

export default UserActivity;
