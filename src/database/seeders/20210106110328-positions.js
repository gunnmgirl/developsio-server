"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("positions", [
      {
        name: "Front-End Developer",
        details:
          "A front-end web developer is responsible for implementing visual and interactive elements that users engage with through their web browser when using a web application. They are usually supported by back-end web developers, who are responsible for server-side application logic and integration of the work front-end developers do.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Back-End Developer",
        details:
          "Back end developers are responsible for creating and maintaining technology at the back end of a website (the server, database and application). The attractive visuals created by designers, UX professionals and front end developers couldn’t exist without the technology provided by a back end developer.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Full-Stack Developer",
        details:
          "The full stack developer definition is “someone who can work on both the back-end and front-end of systems.” This means that they can develop fully fledged platforms (with databases, servers and clients) which don’t need other applications to function.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "UX Designer",
        details:
          "UX (user experience) designers measure and optimise applications (usually web based) to improve ease of use (usability), and create the best user experience by exploring many different approaches to solve end-users’ problems. One way that a UX designer might do this is by conducting in-person user tests to observe behaviour. They then refine and tweak apps, software and websites to create products that people like and find easy to use.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "UI Designer",
        details:
          "User interface (UI) designers work closely with user experience (UX) designers and other design specialists. Their job is to make sure that every page and every step a user will experience in their interaction with the finished product will conform to the overall vision created by UX designers.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mobile Developer",
        details:
          "Mobile developers are a type of software developer. They specialise in mobile technology such as building apps for Google’s Android, Apple’s iOS and Microsoft’s Windows Phone platforms. For this reason job titles for this type of role also include Android developer and iOS developer. Mobile developers learn the programming languages and software development environment for their chosen platform.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("positions", null, {});
  },
};
