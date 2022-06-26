"use strict";
var fs = require("fs");
const path = require("path");
const dirPath = path.resolve(__dirname, "../../uploads/cover/");

var files = fs.readdirSync(dirPath);
/* now files is an Array of the name of the files in the folder and you can pick a random name inside of that array */
const chosenFile = () => files[Math.floor(Math.random() * files.length)];

module.exports = {
  async up(queryInterface, Sequelize) {
    const secret = process.env.TOKEN_SECRET;
    const bcrypt = require("bcryptjs");

    const salt = bcrypt.genSaltSync(10, secret);
    const encrypt_pass = (password) => bcrypt.hashSync(password, salt);
    await queryInterface.bulkInsert(
      "Travelers",
      [
        {
          firstname: "John",
          lastname: "Doe",
          email: "john@doe.com",
          password: encrypt_pass("12345"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstname: "Dora",
          lastname: "L'exploratrice",
          email: "dora@mapadora.fr",
          password: encrypt_pass("dora"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstname: "Jean",
          lastname: "Dupont",
          email: "jean@dupont.fr",
          password: encrypt_pass("jean"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Travels",
      [
        {
          name: "Voyage au bout du monde",
          is_public: false,
          predicted_date: new Date("2015-10-21T03:24:00"),
          start_date: new Date("1985-10-25T03:24:00"),
          commentary: "Un long voyage ",
          path: "uploads/cover/" + chosenFile(),
          path_uid: "edc8eddd-f84d-4c93-ae6f-5af98cf0c037",
          id_traveltag: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tour de France",
          is_public: false,
          predicted_date: new Date("2022-10-21T03:24:00"),
          start_date: new Date("2022-06-10T03:24:00"),
          end_date: new Date("2022-06-20T03:24:00"),
          commentary: "Tour des régions",
          path: "uploads/cover/" + chosenFile(),
          path_uid: "1cef058f-6362-40ad-bef5-4193aac8490e",
          id_traveltag: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "France Nord-Sud",
          is_public: false,
          commentary: "A vélo",
          path: "uploads/cover/" + chosenFile(),
          path_uid: "b268f4f3-2a02-4cdc-98b2-691dc1ba7214",
          id_traveltag: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Photos",
      [
        {
          point: Sequelize.fn("ST_GeomFromText", "POINT(6.971331 46.060056)"),
          path: "uploads/cover/" + chosenFile(),
          is_in_album: false,
          is_public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          id_travel: 1,
        },
        {
          point: Sequelize.fn("ST_GeomFromText", "POINT(6.971331 46.060056)"),
          path: "uploads/cover/" + chosenFile(),
          is_in_album: false,
          is_public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          id_travel: 1,
        },
        {
          point: Sequelize.fn("ST_GeomFromText", "POINT(6.971331 46.060056)"),
          path: "uploads/cover/" + chosenFile(),
          is_in_album: true,
          is_public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          id_travel: 1,
        },
        {
          point: Sequelize.fn("ST_GeomFromText", "POINT(6.971331 46.060056)"),
          path: "uploads/cover/" + chosenFile(),
          is_in_album: true,
          is_public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          id_travel: 1,
        },
        {
          point: Sequelize.fn("ST_GeomFromText", "POINT(6.971331 46.060056)"),
          path: "uploads/cover/" + chosenFile(),
          is_in_album: true,
          is_public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          id_travel: 1,
        },
        {
          point: Sequelize.fn("ST_GeomFromText", "POINT(6.971331 46.060056)"),
          path: "uploads/cover/" + chosenFile(),
          is_in_album: true,
          is_public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          id_travel: 1,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Diaries",
      [
        {
          content:
            "Je n'aurais jamais pensé entamer un si long voyage. La brise si douce m'a dit dans le creux de l'oreille...",
          is_in_album: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          id_travel: 1,
          id_traveler: 1,
        },
        {
          content: "Jour 2: j'ai oublié mes corn-flakes :(",
          is_in_album: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          id_travel: 1,
          id_traveler: 1,
        },
        {
          content: "Aujoud'hui nous avons exploré la forêt de Blabenblur",
          is_in_album: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          id_travel: 1,
          id_traveler: 2,
        },
        {
          content: "Une entrée hors de l'album.",
          is_in_album: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          id_travel: 1,
          id_traveler: 1,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Elements",
      [
        {
          name: "itinerary",
          description: "description",
          createdAt: new Date(),
          updatedAt: new Date(),
          id_travel: 1,
          id_traveler: 1,
        },
        {
          name: "itinerary",
          description: "description",
          createdAt: new Date(),
          updatedAt: new Date(),
          id_travel: 2,
          id_traveler: 2,
        },
        {
          name: "itinerary",
          description: "description",
          createdAt: new Date(),
          updatedAt: new Date(),
          id_travel: 3,
          id_traveler: 3,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Itineraries",
      [
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          id_element: 1,
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          id_element: 2,
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          id_element: 3,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "TaskLists",
      [
        {
          name: "tasklist",
          createdAt: new Date(),
          updatedAt: new Date(),
          id_itinerary: 1,
        },
        {
          name: "tasklist",
          createdAt: new Date(),
          updatedAt: new Date(),
          id_itinerary: 2,
        },
        {
          name: "tasklist",
          createdAt: new Date(),
          updatedAt: new Date(),
          id_itinerary: 3,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Travel_Travelers",
      [
        {
          id_permission: 2,
          id_travel: 1,
          id_traveler: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_permission: 1,
          id_travel: 1,
          id_traveler: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Participants",
      [
        {
          name: "John Doe",
          email: "john@doe.com",
          has_refused: false,
          id_travel: 1,
          id_traveler: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dora L'exploratrice",
          email: "dora@mapadora.fr",
          has_refused: false,
          id_travel: 1,
          id_traveler: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jean Dupont",
          email: "jean@dupont.fr",
          has_refused: false,
          id_travel: 1,
          id_traveler: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Photos",
      [
        {
          point: null,
          path: "uploads/photo/abbaye.jpg",
          is_in_album: true,
          is_public: false,
          createdAt: new Date("2022-05-06 22:45"),
          updatedAt: new Date("2022-05-06 22:45"),
          id_travel: 1,
        },
        {
          point: null,
          path: "uploads/photo/europe.jpg",
          is_in_album: true,
          is_public: false,
          createdAt: new Date("2022-05-05 22:45"),
          updatedAt: new Date("2022-05-05 22:45"),
          id_travel: 1,
        },
        {
          point: null,
          path: "uploads/photo/img1.jpg",
          is_in_album: true,
          is_public: false,
          createdAt: new Date("2022-05-05 22:45"),
          updatedAt: new Date("2022-05-05 22:45"),
          id_travel: 1,
        },
        {
          point: null,
          path: "uploads/photo/img2.jpg",
          is_in_album: true,
          is_public: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          id_travel: 1,
        },
        {
          point: null,
          path: "uploads/photo/montBlanc.jpg",
          is_in_album: true,
          is_public: false,
          createdAt: new Date("2022-05-05 22:45"),
          updatedAt: new Date("2022-05-05 22:45"),
          id_travel: 1,
        },
        {
          point: null,
          path: "uploads/photo/img3.JPG",
          is_in_album: true,
          is_public: false,
          createdAt: new Date("2022-05-05 22:45"),
          updatedAt: new Date("2022-05-05 22:45"),
          id_travel: 1,
        },
        {
          point: null,
          path: "uploads/photo/img5.jpg",
          is_in_album: true,
          is_public: false,
          createdAt: new Date("2022-05-04 22:45"),
          updatedAt: new Date("2022-05-04 22:45"),
          id_travel: 1,
        },
        {
          point: null,
          path: "uploads/photo/img6.jpg",
          is_in_album: true,
          is_public: false,
          createdAt: new Date("2022-05-04 22:45"),
          updatedAt: new Date("2022-05-04 22:45"),
          id_travel: 1,
        },
        {
          point: null,
          path: "uploads/photo/japon.jpg",
          is_in_album: true,
          is_public: false,
          createdAt: new Date("2022-05-04 22:45"),
          updatedAt: new Date("2022-05-04 22:45"),
          id_travel: 1,
        },
        {
          point: null,
          path: "uploads/tests/dora.jpg",
          is_in_album: true,
          is_public: false,
          createdAt: new Date("2022-05-05 22:45"),
          updatedAt: new Date("2022-05-05 22:45"),
          id_travel: 1,
        },
        {
          point: null,
          path: "uploads/tests/voyage1.png",
          is_in_album: true,
          is_public: false,
          createdAt: new Date("2022-05-04 22:45"),
          updatedAt: new Date("2022-05-04 22:45"),
          id_travel: 1,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Diaries",
      [
        {
          content: "Superbe vue sur la plaine d'Alsace.",
          is_in_album: true,
          createdAt: new Date("2022-05-06 23:09"),
          updatedAt: new Date("2022-05-06 23:09"),
          id_travel: 1,
          id_traveler: 2,
        },
        {
          content: "Grande monté, mais la vue vaut l'effort.",
          is_in_album: true,
          createdAt: new Date("2022-05-07 23:09"),
          updatedAt: new Date("2022-05-07 23:09"),
          id_travel: 1,
          id_traveler: 3, // invalid value (to test)
        },
        {
          content: "C'est quand qu'on mange ?",
          is_in_album: true,
          updatedAt: new Date("2022-05-04 23:10"),
          createdAt: new Date("2022-05-04 23:10"),
          id_travel: 1,
          id_traveler: 1,
        },
        {
          content: "Un peu petit lac.",
          is_in_album: true,
          createdAt: new Date("2022-05-04 07:09"),
          updatedAt: new Date("2022-05-04 07:09"),
          id_travel: 1,
          id_traveler: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
