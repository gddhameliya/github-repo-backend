import { message } from '../common/constants';
import { helper } from '../common/utils';
import env from '../config/env.config';
import { Request } from 'express';

// Define interface for GitHub repository
interface GitHubRepository {
    html_url: string;
    full_name: string;
    name: string;
    description: string;
    watchers: number;
}

//* Function based github service modules
export const githubService = {
    //* Get user repositories
    getRepo: async (req: Request) => {

        try {
            //* Get user details and avatar
            const userData = await helper.axiosRequest({ url: `${env.github.apiUrl + req.params.username}` })
            if (!userData) return message.NOT_FOUND;

            const avatarUrl = userData.avatar_url;

            //* Get user repositories
            const repoData = await helper.axiosRequest({ url: `${env.github.apiUrl + req.params.username}/repos` })
            if (!repoData) return message.NOT_FOUND;

            //* Sort repositories by watchers
            const sortedRepositories = repoData.sort((a: GitHubRepository, b: GitHubRepository) => b.watchers - a.watchers);

            //* Extract repository names, descriptions, and watchers
            const repositories = sortedRepositories.map((repo: GitHubRepository) => ({
                name: repo.name,
                fullName: repo.full_name,
                repoUrl: repo.html_url,
                description: repo.description,
                watchers: repo.watchers
            }));

            return { avatarUrl, repositories };

        } catch (error) {
            console.log("🚀 ~ getRepo: ~ error", error)
            return message.FAILED;
        }
    },
};
