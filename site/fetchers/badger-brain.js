import fetch from 'node-fetch';

const badgerBrainEndpoint = process.env.BADGER_BRAIN_HOST;

const getRequestOptions = (body, token) => ({
  method: 'POST',
  headers: Object.assign({}, {
    'Content-Type': 'application/graphql',
  }, token && {
    'X-Preview': token,
  }),
  timeout: 10000,
  body,
});

const sortEvents = list =>
  list.sort((a, b) =>
    new Date(b.startDateTime.iso) - new Date(a.startDateTime.iso));

export const selectValidEvents = list =>
  list.filter(listItem => !!listItem.startDateTime &&
    !!listItem.startDateTime.iso);

const getCategories = badgers => (
  Object.keys(badgers
    .reduce((uniqueCategories, badger) => (
      badger.categories
        .reduce((categories, category) => (
          categories[category] ? categories : { ...categories, [category]: 1 }
        ), uniqueCategories)
    ), {}))
);

const basicFields = `
  id
  slug
  tags
  title
  strapline
  internalLinks {
    title
    url
  }
  externalLinks {
    title
    url
  }
  body {
    type
    text
  }
  featureImageFilename
`;

const dateTimeFields = `
  iso
  date
  month
  monthSym
  year
`;

const dateTimeFieldsEvents = `
  startDateTime {
    ${dateTimeFields}
  }
  endDateTime {
    ${dateTimeFields}
  }
`;

const fullEventsQuery = `
  ${basicFields}
  ${dateTimeFieldsEvents}
`;

export function getData() {
  const body = `
    query {
      allEvents {
        ${fullEventsQuery}
      }
      allBadgers {
        firstName
        lastName
        jobTitle
        startDate
        imageUrl
        categories {
          name
          slug
        }
      }
    }
  `;

  return fetch(badgerBrainEndpoint, getRequestOptions(body))
          .then(response => response.json())
          .then(({ data: { allEvents, allBadgers } }) => ({
            events: sortEvents(selectValidEvents(allEvents)),
            badgers: allBadgers,
            categories: getCategories(allBadgers),
          }));
}
