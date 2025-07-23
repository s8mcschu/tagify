# Using Surveys in the platform

Surveys are treated as assets in the frontend, hence all existing questionnaires are JSON files inside the [assets/questionnaires](../frontend/src/assets/questionnaires/) directory and linked in the [QuestionnaireMapper](../frontend/src/app/types/Questionnaires.ts). Their name in the mapper is also the keyword used in your condition definition.

Prompting e.g. the demographics questionnaire in one of your conditions hence works with the following definition:

```ts
{
  page: 'survey',
  content: ['demographics']
}
```

Multiple questionnaires will be treated as individual question groups. The following will for example show each of both surveys on an individual page.

```ts
{
  page: 'survey',
  content: ['demographics', 'sus']
}
```

# Creating new Surveys

To create a new custom survey you need to do the following steps:

1. Add a JSON file to the [assets/questionnaires](../frontend/src/assets/questionnaires/) directory
2. Fill the file to your needs according to the [SurveyJS 'Survey Object'](https://surveyjs.io/Documentation/Library#objects) specification. Looking at the existing questionnaires might help you getting started.
3. Import the JSON file in the [Questionnaire.ts](../frontend/src/app/types/Questionnaires.ts) file
4. Add the imported file to the [QuestionnaireMapper](../frontend/src/app/types/Questionnaires.ts)
