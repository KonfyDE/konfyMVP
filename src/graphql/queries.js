/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTeaser = /* GraphQL */ `
  query GetTeaser($id: ID!) {
    getTeaser(id: $id) {
      id
      title
      description
      filePath
      likes
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listTeasers = /* GraphQL */ `
  query ListTeasers(
    $filter: ModelTeaserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeasers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        filePath
        likes
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      type
      id
      content
      owner
      timestamp
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        id
        content
        owner
        timestamp
      }
      nextToken
    }
  }
`;
export const listPostsSortedByTimestamp = /* GraphQL */ `
  query ListPostsSortedByTimestamp(
    $type: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsSortedByTimestamp(
      type: $type
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        content
        owner
        timestamp
      }
      nextToken
    }
  }
`;
export const listPostsBySpecificOwner = /* GraphQL */ `
  query ListPostsBySpecificOwner(
    $owner: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsBySpecificOwner(
      owner: $owner
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        content
        owner
        timestamp
      }
      nextToken
    }
  }
`;
