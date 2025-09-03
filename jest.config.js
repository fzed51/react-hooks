/* eslint-disable @typescript-eslint/no-require-imports */
const { createDefaultPreset } = require("ts-jest");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node", // Utilise l'environnement Node, ou 'jsdom' pour les tests côté navigateur
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"], // Extensions de fichiers à gérer
  transform: {
    ...createDefaultPreset().transform,
    "^.+\\.tsx?$": "ts-jest", // Utilisation de ts-jest pour transformer les fichiers TypeScript
  },
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.(ts|tsx)", // Recherche des tests dans les dossiers __tests__
    "**/?(*.)+(spec|test).(ts|tsx)", // Recherche des fichiers de tests qui finissent par .test.ts ou .spec.ts
  ],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./",
        outputName: "test-report.xml",
      },
    ],
  ],
};
