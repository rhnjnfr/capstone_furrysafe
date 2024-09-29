import { addShelterAddress, retrieveShelterDetails, saveShelter_and_Link, 
         retrieveProfile
} from "../model/shelterFunctionsModel.js";

export const insertShelterAddress = (req, res) => {
    addShelterAddress(req, res);
};
export const getShelterDetails = (req, res) => {
    retrieveShelterDetails(req, res)
}
export const insertShelterLink = (req, res) => {
    saveShelter_and_Link(req, res)
}
export const getProfile = (req, res) => {
    retrieveProfile(req, res)
}