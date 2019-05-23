import Cookies from 'universal-cookie';

const defaultState = (data): any => {
  const cookies = new Cookies(data.cookies);

  return {
    app: {
      isLoggedIn: !!cookies.get('jwt'),
      __typename: 'CacheApp',
    },
  };
};

export default defaultState;
