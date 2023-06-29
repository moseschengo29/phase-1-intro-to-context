// Your code here
function createEmployeeRecord(employeeData) {
  const [firstName, familyName, title, payPerHour] = employeeData;

  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(data) {
  return data.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");

  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    date,
    hour: parseInt(hour, 10),
  });

  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");

  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    date,
    hour: parseInt(hour, 10),
  });

  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEvent = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );

  if (timeInEvent && timeOutEvent) {
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }

  return 0;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  const payRate = employeeRecord.payPerHour;
  const wagesEarned = hoursWorked * payRate;
  return wagesEarned;
}

function allWagesFor(employeeRecord) {
  const datesWorked = employeeRecord.timeInEvents.map((event) => event.date);
  const totalWages = datesWorked.reduce(
    (total, date) => total + wagesEarnedOnDate(employeeRecord, date),
    0
  );
  return totalWages;
}

function calculatePayroll(employees) {
  const grandTotalOwed = employees.reduce(
    (total, employee) => total + allWagesFor(employee),
    0
  );
  return grandTotalOwed;
}
