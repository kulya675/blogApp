/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { ProfileFormType, SignInFormType, SignUpFormType, ArticleFormType } from '../@types/index';

class Api {
  articlesInstance = axios.create({
    baseURL: 'https://conduit.productionready.io/api/articles',
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

  authenticationInstance = axios.create({
    method: 'POST',
    baseURL: 'https://conduit.productionready.io/api/users',
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

  async getArticles(offset = 0, token: string | undefined, user: string) {
    const response =
      token !== undefined
        ? await this.articlesInstance.get(`?offset=${offset - 20}&author=${user}`, {
            headers: { Authorization: `Token ${token}` },
          })
        : await this.articlesInstance.get(`?offset=${offset - 20}`);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }

  async getSlug(slug: string, token: string | undefined) {
    const response =
      token !== undefined
        ? await this.articlesInstance.get(`/${slug}`, {
            headers: { Authorization: `Token ${token}` },
          })
        : await this.articlesInstance.get(`/${slug}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }

  async signUp({ username, email, password }: SignUpFormType) {
    const requestBody = {
      user: {
        username,
        email,
        password,
      },
    };
    const response = await this.authenticationInstance.post('/', requestBody);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }

  async signIn({ email, password }: SignInFormType) {
    const requestBody = {
      user: {
        email,
        password,
      },
    };
    const response = await this.authenticationInstance.post('/login', requestBody);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }

  async getCurrentUser(token: string) {
    const response = await axios.get('https://conduit.productionready.io/api/user', {
      headers: { Authorization: `Token ${token}` },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }

  async updateProfile(body: ProfileFormType, token: string) {
    const requestBody = {
      user: body,
    };
    const response = await axios.put('https://conduit.productionready.io/api/user', requestBody, {
      headers: { Authorization: `Token ${token}` },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }

  async createArticle({ title, body, description, tagList }: ArticleFormType, token: string) {
    const requestBody = {
      article: {
        title,
        body,
        description,
        tagList,
      },
    };
    const response = await axios.post('https://conduit.productionready.io/api/articles', requestBody, {
      headers: { Authorization: `Token ${token}` },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }

  async updateArticle({ title, body, description, tagList }: ArticleFormType, slug: string, token: string) {
    const requestBody = {
      article: {
        title,
        body,
        description,
        tagList,
      },
    };
    const response = await axios.put(`https://conduit.productionready.io/api/articles/${slug}`, requestBody, {
      headers: { Authorization: `Token ${token}` },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }

  async deleteArticle(slug: string, token: string) {
    const response = await axios.delete(`https://conduit.productionready.io/api/articles/${slug}`, {
      headers: { Authorization: `Token ${token}` },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }

  async favouriteArticle(action: 'fav' | 'unfav', slug: string, token: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response =
      action === 'fav'
        ? await axios.post(`https://conduit.productionready.io/api/articles/${slug}/favorite`, null, {
            headers: { Authorization: `Token ${token}` },
          })
        : await axios.delete(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
            headers: { Authorization: `Token ${token}` },
          });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }
}

export default new Api();
