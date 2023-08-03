describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});

describe("login / logout flow specification", () => {
  it("cannot navigate to /tasks without being logged in", () => {
    cy.visit("/tasks").url().should("include", "/login");
  });

  it("cannot login with invalid credentials", () => {
    cy.visit("/login");
    cy.get("#userName").type("TestUser");
    cy.get("#password").type("password1234");
    cy.get("#login-button").click();
    cy.url().should("include", "/login");
  });

  it("can login", () => {
    cy.visit("/login");
    cy.get("#userName").type("TestUser");
    cy.get("#password").type("password123");
    cy.get("#login-button").click();
    cy.url().should("include", "/tasks");
  });

  it("can logout", () => {
    cy.visit("/login");
    cy.get("#userName").type("TestUser");
    cy.get("#password").type("password123");
    cy.get("#login-button").click();
    cy.url().should("include", "/tasks");
    cy.get("#logout-button").click();
    cy.url().should("include", "/");
  });
});

describe("task flow specification", () => {
  it("can add a task", () => {
    cy.visit("/login");
    cy.get("#userName").type("TestUser");
    cy.get("#password").type("password123");
    cy.get("#login-button").click();
    cy.url().should("include", "/tasks");
    cy.get("#patientName").type("John Doe");
    cy.get("#destination").type("Emergency Acute Care Unit - Room O");
    cy.get("#location").type("4w-437-04");
    cy.get("#isolation").click();
    cy.get("#notes").type("This is a test note");
    cy.get("#requestor").type("Jane Doe");
    cy.get("#type").type("Patient Transport");
    cy.get("#add-task-button").click();
    cy.url().should("include", "/tasks");
    cy.get("#task-table").find("tr").should("contain", "John Doe");
  });
});

describe("task start / delay / complete flow specification", () => {
  it("can start a task", () => {
    cy.visit("/login");
    cy.get("#userName").type("TestUser");
    cy.get("#password").type("password123");
    cy.get("#login-button").click();
    cy.url().should("include", "/tasks");
    cy.get("#task-table")
      .find("tr")
      .contains("John Doe")
      .get("#start-task-button")
      .click();
    cy.url().should("include", "/task");
  });

  // it("can delay a task", () => {
  //   cy.visit("/login");
  //   cy.get("#userName").type("TestUser");
  //   cy.get("#password").type("password123");
  //   cy.get("#login-button").click();
  //   cy.url().should("include", "/tasks");
  //   cy.get("#task-table")
  //     .find("tr")
  //     .contains("John Doe")
  //     .get("#delay-task-button")
  //     .click();
  //   cy.url().should("include", "/task");
  //   cy.get("#task-table")
  //     .find("tr")
  //     .should("contain", "John Doe")
  //     .and("contain", "Delayed");
  // });

  // it("can remove a delay from a task", () => {
  //   cy.visit("/login");
  //   cy.get("#userName").type("TestUser");
  //   cy.get("#password").type("password123");
  //   cy.get("#login-button").click();
  //   cy.url().should("include", "/tasks");
  //   cy.get("#task-table")
  //     .find("tr")
  //     .contains("John Doe")
  //     .get("#remove-delay-task-button")
  //     .click();
  //   cy.url().should("include", "/task");
  //   cy.get("#task-table")
  //     .find("tr")
  //     .should("contain", "John Doe")
  //     .and("contain", "In Progress");
  // });

  // it("can complete a task", () => {
  //   cy.visit("/login");
  //   cy.get("#userName").type("TestUser");
  //   cy.get("#password").type("password123");
  //   cy.get("#login-button").click();
  //   cy.url().should("include", "/tasks");
  //   cy.get("#task-table")
  //     .find("tr")
  //     .contains("John Doe")
  //     .get("#complete-task-button")
  //     .click();
  //   cy.url().should("include", "/task");
  //   cy.get("#task-table").find("tr").should("notContain", "John Doe");
  // });
});
