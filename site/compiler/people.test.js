import createStateNavigator from '../routes';
import { expandRoutes } from '.';

describe('site/compiler', () => {
  const baseState = {
    jobs: [],
    job: {},
    contactUsURL: '',
    featuredBlogPosts: [],
    events: [],
    event: {},
    instagramPosts: [],
    tweets: [],
    badger: {},
  };

  const baseBadger = {
    firstName: '',
    skills: [],
    influence: '',
    achievements: '',
    categories: [],
  };

  describe('compileSite', () => {
    it('renders the dynamic badger pages of the site', () => {
      const categories = [
        { name: 'Engineering', slug: 'engineering' },
        { name: 'Leadership', slug: 'leadership' },
      ];

      const a = {
        ...baseBadger,
        firstName: 'Alex',
        slug: 'alex',
        categories,
      };

      const routes = expandRoutes({
        ...baseState,
        badgers: [a],
        categories,
        badger: { [a.slug]: a },
      }, createStateNavigator());

      expect(routes.length).to.equal(12);
      expect(routes[8].filePath).to.equal('about-us/people/index.html');
      expect(routes[9].filePath).to.equal('about-us/people/category/engineering/index.html');
      expect(routes[10].filePath).to.equal('about-us/people/category/leadership/index.html');
    });

    describe('with engineer, leadership and pm', () => {
      it('should render one page of each and everyone', () => {
        const categories = [
          { name: 'Engineering', slug: 'engineering' },
          { name: 'Leadership', slug: 'leadership' },
          { name: 'PM', slug: 'pm' },
        ];

        const a = {
          ...baseBadger,
          firstName: 'Alex',
          slug: 'alex',
          categories: [categories[0], categories[1]],
        };

        const s = {
          ...baseBadger,
          firstName: 'Sari',
          slug: 'sari',
          categories: [categories[2], categories[1]],
        };

        const routes = expandRoutes({
          ...baseState,
          badgers: [a, s],
          badger: {
            [a.slug]: a,
            [s.slug]: s,
          },
          categories,
        }, createStateNavigator());

        expect(routes.length).to.equal(14);
        expect(routes[8].filePath).to.equal('about-us/people/index.html');
        expect(routes[9].filePath).to.equal('about-us/people/category/engineering/index.html');
        expect(routes[10].filePath).to.equal('about-us/people/category/leadership/index.html');
        expect(routes[11].filePath).to.equal('about-us/people/category/pm/index.html');
      });
    });

    describe('with one UX & Designer', () => {
      it('should render one everyone and one ux-design', () => {
        const categories = [{ name: 'UX & Design', slug: 'ux-design' }];
        const s = {
          ...baseBadger,
          firstName: 'Sari',
          slug: 'sari',
          categories,
        };
        const routes = expandRoutes({
          ...baseState,
          badgers: [s],
          badger: { [s.slug]: s },
          categories,
        }, createStateNavigator());

        expect(routes.length).to.equal(11);
        expect(routes[8].filePath).to.equal('about-us/people/index.html');
        expect(routes[9].filePath).to.equal('about-us/people/category/ux-design/index.html');
      });
    });

    describe('with 21 Engineers and 1 Leadership', () => {
      it('should render two everyone pages, two engineering and one leadership', () => {
        const categories = [
          { name: 'Engineering', slug: 'engineering' },
          { name: 'Leadership', slug: 'leadership' },
        ];

        const badgers = [];
        const badger = {};

        for (let i = 0; i < 20; i += 1) {
          const a = {
            ...baseBadger,
            firstName: 'Alex ' + i,
            slug: 'alex-' + i,
            categories,
          };
          badgers.push(a);
          badger[a.slug] = a;
        }
        const e = {
          ...baseBadger,
          firstName: 'Etiene',
          slug: 'etiene',
          categories: [categories[0]],
        };
        const routes = expandRoutes({
          ...baseState,
          badgers: badgers.push(e) && badgers,
          badger: { ...badger, [e.slug]: e },
          categories,
        }, createStateNavigator());

        expect(routes.length).to.equal(34);
        expect(routes[8].filePath).to.equal('about-us/people/index.html');
        expect(routes[9].filePath).to.equal('about-us/people/category/everyone/page-2/index.html');
        expect(routes[10].filePath).to.equal('about-us/people/category/engineering/index.html');
        expect(routes[11].filePath).to.equal('about-us/people/category/engineering/page-2/index.html');
        expect(routes[12].filePath).to.equal('about-us/people/category/leadership/index.html');
      });
    });

    describe('with 20 Engineers', () => {
      it('should render two everyone pages, including advert, and one for engineering', () => {
        const badgers = [];
        const badger = {};
        const categories = [{ name: 'Engineering', slug: 'engineering' }];
        for (let i = 0; i < 20; i += 1) {
          const a = {
            ...baseBadger,
            firstName: 'Alex ' + i,
            slug: 'alex-' + i,
            categories,
          };
          badgers.push(a);
          badger[a.slug] = a;
        }
        const routes = expandRoutes({
          ...baseState,
          badgers,
          badger,
          categories,
        }, createStateNavigator());

        expect(routes.length).to.equal(31);
        expect(routes[8].filePath).to.equal('about-us/people/index.html');
        expect(routes[9].filePath).to.equal('about-us/people/category/everyone/page-2/index.html');
        expect(routes[10].filePath).to.equal('about-us/people/category/engineering/index.html');
      });
    });
  });

  describe('with 19 Engineers', () => {
    it('should render one everyone pages, even including advert, and one for engineering', () => {
      const badgers = [];
      const badger = {};
      const categories = [{ name: 'Engineering', slug: 'engineering' }];
      for (let i = 0; i < 19; i += 1) {
        const a = {
          ...baseBadger,
          firstName: 'Alex ' + i,
          slug: 'alex-' + i,
          categories,
        };
        badgers.push(a);
        badger[a.slug] = a;
      }
      const routes = expandRoutes({
        ...baseState,
        badgers,
        badger,
        categories,
      }, createStateNavigator());

      expect(routes.length).to.equal(29);
      expect(routes[8].filePath).to.equal('about-us/people/index.html');
      expect(routes[9].filePath).to.equal('about-us/people/category/engineering/index.html');
    });
  });

  describe('with 41 Engineers and Leaderships', () => {
    it('should render three everyone pages and three for engineering and three for leadership', () => {
      const badgers = [];
      const badger = {};
      const categories = [
        { name: 'Engineering', slug: 'engineering' },
        { name: 'Leadership', slug: 'leadership' },
      ];
      for (let i = 0; i < 41; i += 1) {
        const a = {
          ...baseBadger,
          firstName: 'Alex ' + i,
          slug: 'alex-' + i,
          categories,
        };
        badgers.push(a);
        badger[a.slug] = a;
      }
      const routes = expandRoutes({
        ...baseState,
        badgers,
        badger,
        categories,
      }, createStateNavigator());

      expect(routes.length).to.equal(58);
      expect(routes[8].filePath).to.equal('about-us/people/index.html');
      expect(routes[9].filePath).to.equal('about-us/people/category/everyone/page-2/index.html');
      expect(routes[10].filePath).to.equal('about-us/people/category/everyone/page-3/index.html');
      expect(routes[11].filePath).to.equal('about-us/people/category/engineering/index.html');
      expect(routes[12].filePath).to.equal('about-us/people/category/engineering/page-2/index.html');
      expect(routes[13].filePath).to.equal('about-us/people/category/engineering/page-3/index.html');
      expect(routes[14].filePath).to.equal('about-us/people/category/leadership/index.html');
      expect(routes[15].filePath).to.equal('about-us/people/category/leadership/page-2/index.html');
      expect(routes[16].filePath).to.equal('about-us/people/category/leadership/page-3/index.html');
    });
  });

  describe('with 41 Engineers and 21 Leaderships', () => {
    it('should render three everyone pages and three for engineering and two for leadership', () => {
      const badgers = [];
      const badger = {};
      const categories = [
        { name: 'Engineering', slug: 'engineering' },
        { name: 'Leadership', slug: 'leadership' },
      ];
      for (let i = 0; i < 21; i += 1) {
        const a = {
          ...baseBadger,
          firstName: 'Alex ' + i,
          slug: 'alex-' + i,
          categories,
        };
        badgers.push(a);
        badger[a.slug] = a;
      }
      for (let i = 21; i < 41; i += 1) {
        const a = {
          ...baseBadger,
          firstName: 'Alex ' + i,
          slug: 'alex-' + i,
          categories: [categories[0]],
        };
        badgers.push(a);
        badger[a.slug] = a;
      }
      const routes = expandRoutes({
        ...baseState,
        badgers,
        badger,
        categories,
      }, createStateNavigator());

      expect(routes.length).to.equal(57);
      expect(routes[8].filePath).to.equal('about-us/people/index.html');
      expect(routes[9].filePath).to.equal('about-us/people/category/everyone/page-2/index.html');
      expect(routes[10].filePath).to.equal('about-us/people/category/everyone/page-3/index.html');
      expect(routes[11].filePath).to.equal('about-us/people/category/engineering/index.html');
      expect(routes[12].filePath).to.equal('about-us/people/category/engineering/page-2/index.html');
      expect(routes[13].filePath).to.equal('about-us/people/category/engineering/page-3/index.html');
      expect(routes[14].filePath).to.equal('about-us/people/category/leadership/index.html');
      expect(routes[15].filePath).to.equal('about-us/people/category/leadership/page-2/index.html');
    });
  });

  describe('with one badger', () => {
    it('should render this badger\'s profile page', () => {
      const categories = [{ name: 'Engineering', slug: 'engineering' }];

      const a = {
        ...baseBadger,
        firstName: 'Alex',
        skills: ['JavaScript', 'Photography'],
        slug: 'alex',
        categories,
      };

      const routes = expandRoutes({
        ...baseState,
        badgers: [a],
        categories,
        badger: { [a.slug]: a },
      }, createStateNavigator());

      expect(routes.length).to.equal(11);
      expect(routes[10].filePath).to.equal('about-us/people/alex/index.html');
    });
  });
});
