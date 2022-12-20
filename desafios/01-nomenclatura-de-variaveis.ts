// Nomenclatura de variáveis

const listOfCategories = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getUserCategoryByGithubFollowers(req, res) {
  const githubUsername = String(req.query.username)

  if (!githubUsername) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const response = await fetch(`https://api.github.com/users/${githubUsername}}`);

  if (response.status === 404) {
    return res.status(400).json({
      message: `User with username "${githubUsername}" not found`
    })
  }

  const githubUserData = await response.json()

  const listOfCategoriesDescendingByFollowers = listOfCategories.sort((a, b) =>  b.followers - a.followers); 

  const userCategory = listOfCategoriesDescendingByFollowers.find(i => githubUserData.followers > i.followers)

  const result = {
    githubUsername,
    category: userCategory.title
  }

  return result
}

getUserCategoryByGithubFollowers({ query: {
  username: 'pemonter'
}}, {})