// IMPORT QUESTIONNAIRES
import * as imi from '../../assets/questionnaires/imi.json';
import * as sus from'../../assets/questionnaires/sus.json';
import * as demographics from '../../assets/questionnaires/demographics.json';
import * as prolificID from "../../assets/questionnaires/prolificID.json";
import * as affs from "../../assets/questionnaires/afss.json";
import * as sam from "../../assets/questionnaires/sam.json";


// Make the Questionnaire known and accessible for the Platform. 
// The "key" string should be used for reference in the user script.
export const QuestionnaireMapper: {[key: string]: any} = {
  imi,
  sus,
  demographics,
  prolificID,
  affs,
  sam
}

export interface QuestionnaireCollection {
  [key: string]: any
}