const btnText = 'OK';
const header = 'Alert';
const usernameUsedMessage = 'Gebruikersnaam wordt al gebruikt';
const animalCaughtMessage = (str: string) => 'Je hebt een ' + str + ' gevangen';
const daysPlayedDescription = (daysplayed: number) => 'Badge voor het spelen van' + daysplayed + 'dagen';
const daysPlayedBadgeMessageName = 'Dagen gespeeld badge';
const getCauthOrganismMessage =  (badge:string) => 'Je hebt ' + badge + ' badge behaald';


const catchzoneMessage = (catchZone: string) =>
    'Je loopt nu de vangzone ' + catchZone + ' binnen';

export {btnText, header, usernameUsedMessage, animalCaughtMessage, daysPlayedDescription, daysPlayedBadgeMessageName, catchzoneMessage, getCauthOrganismMessage};


