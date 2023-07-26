const student = "student";

const SessionService = {
  setStudentSession(data) {
    window.sessionStorage.setItem(student, JSON.stringify(data));
  },
  removeStudentSession() {
    window.sessionStorage.removeItem(student);
    return;
  },
  getStudentData() {
    const studentData = window.sessionStorage.getItem(student);
    return JSON.parse(studentData);
  },
};

export default SessionService;
