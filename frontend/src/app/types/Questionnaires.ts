// IMPORT QUESTIONNAIRES
import * as imi from "../../../public/questionnaires/imi.json";
import * as sus from'../../../public/questionnaires/sus.json';
import * as demographics from '../../../public/questionnaires/demographics.json';
import * as prolificID from "../../../public/questionnaires/prolificID.json";
import * as affs from "../../../public/questionnaires/afss.json";
import * as sam from "../../../public/questionnaires/sam.json";


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